import { handleShopifyRedirects, handleShopifyRoutes } from "@shopify/hydrogen";
import { ShopifyScripts } from "@shopify/hydrogen/react";
import type { ReactNode } from "react";
import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
  useRouteLoaderData,
} from "react-router";

import { CartAnalyticsTracker, PageViewedTracker } from "~/components/AnalyticsTrackers";
import { CartDrawer } from "~/components/CartDrawer";
import { SavedDrawer } from "~/components/saved/SavedDrawer";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { SavedProvider } from "~/components/saved/SavedProvider";
import { PageTitle, Section } from "~/components/Section";
import { CartProvider } from "~/lib/cart";
import { cartHandlers } from "~/lib/cart-handlers";
import { createRequestCustomerAccount, customerAccountContext } from "~/lib/customer-account";
import { envContext } from "~/lib/env";
import { predictiveSearchHandlers } from "~/lib/predictive-search-handlers";
import { loadRootLayout } from "~/lib/root-layout";
import { routeTemplates } from "~/lib/route-templates";
import { siteJsonLd } from "~/lib/seo";
import { createEphemeralSessionManager } from "~/lib/session";
import { analyticsConsent, resolveShopIdentity, storefrontConfig } from "~/lib/shop";
import { isLive } from "~/lib/site";
import { createRequestStorefrontClient, storefrontClientContext, storefrontRequestContext } from "~/lib/storefront";

import type { Route } from "./+types/root";

import appStylesHref from "./app.css?url";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
];

export const meta: Route.MetaFunction = ({ data }) => [
  { name: "robots", content: data?.live ? "index, follow, max-image-preview:large" : "noindex, nofollow" },
  { "script:ld+json": siteJsonLd() },
];

export const middleware: Route.MiddlewareFunction[] = [
  async ({ context, request }, next) => {
    const env = context.get(envContext);
    const storefrontClient = createRequestStorefrontClient(request, env, context.cache, context.waitUntil);
    const requestContext = storefrontClient.requestContext;
    const customerAccount = await createRequestCustomerAccount(request, env, requestContext);
    const sessionManager = customerAccount?.customerAccount.sessionManager ?? createEphemeralSessionManager(request);

    const shopifyRoute = handleShopifyRoutes({
      request,
      requestContext,
      sessionManager,
      storefrontClient,
      routeTemplates,
      handlers: customerAccount ? [cartHandlers, predictiveSearchHandlers, customerAccount.handlers] : [cartHandlers, predictiveSearchHandlers],
    });

    if (shopifyRoute) return shopifyRoute;

    context.set(storefrontClientContext, storefrontClient);
    context.set(storefrontRequestContext, requestContext);
    context.set(customerAccountContext, customerAccount?.customerAccount ?? null);

    const response = await next();
    const sessionHeaders = new Headers((await sessionManager.commit?.()) ?? undefined);
    for (const [name, value] of sessionHeaders) response.headers.append(name, value);
    if (response.status === 404) {
      const redirect = await handleShopifyRedirects({ request, storefrontClient, routeTemplates });
      if (redirect) return redirect;
    }

    requestContext.applyResponseHeaders(response.headers);
    return response;
  },
];

export async function loader({ context, request }: Route.LoaderArgs) {
  const env = context.get(envContext);
  const storefrontClient = context.get(storefrontClientContext);
  const [cartResult, layout] = await Promise.all([cartHandlers.get({ storefrontClient, request }), loadRootLayout(storefrontClient)]);

  return {
    cartData: cartResult.data,
    shopInfo: layout.shopInfo,
    shopIdentity: resolveShopIdentity(env, layout.shopId),
    currency: layout.currency,
    live: isLive(env),
    // Oxygen freezes the clock per request; the year is read once here, never in render.
    year: new Date().getUTCFullYear(),
  };
}

export function Layout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const rootData = useRouteLoaderData<typeof loader>("root");

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {rootData ? (
          <ShopifyScripts
            i18n={{ ...storefrontConfig.i18n, currency: rootData.currency }}
            shop={rootData.shopIdentity.scriptShop}
            analytics={{ channel: rootData.shopIdentity.analyticsShop.channel }}
            shopifyAnalytics={rootData.shopIdentity.shopifyAnalytics}
            consent={analyticsConsent}
            navigate={navigate}
            routes={routeTemplates}
          />
        ) : null}
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-svh flex-col">
        <a href="#main" className="skip">
          Skip to content
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  return (
    <CartProvider initialData={loaderData.cartData}>
      <SavedProvider>
        <PageViewedTracker />
        <CartAnalyticsTracker />
        <Header />
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <Footer year={loaderData.year} />
        <CartDrawer />
        <SavedDrawer />
      </SavedProvider>
    </CartProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  const details = import.meta.env.DEV && error instanceof Error ? error.message : null;

  return (
    <main id="main" className="flex-1">
      <Section className="pt-24 pb-16 md:pt-32">
        <PageTitle
          title={notFound ? "This page is not in the registry." : "Something went wrong."}
          lede={notFound ? "It may have moved when the house did." : "Call either store and we will help directly."}
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/americana" className="btn">
            The designs
          </Link>
          <Link to="/appointments" className="btn btn-outline">
            Book an appointment
          </Link>
        </div>
        {details ? <pre className="mx-auto mt-10 max-w-3xl overflow-x-auto text-xs text-muted">{details}</pre> : null}
      </Section>
    </main>
  );
}
