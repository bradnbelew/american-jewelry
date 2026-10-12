import { formatMoney, type MoneyV2 } from "@shopify/hydrogen";

export const DEFAULT_MONEY_LOCALE = "en-US";

export function formatPrice(money: MoneyV2, locale = DEFAULT_MONEY_LOCALE): string {
  return formatMoney(money, { locale }).toString();
}

/** The house price: round, no cents on a whole amount ("$3,200"). */
export function formatPriceRound(money: MoneyV2, locale = DEFAULT_MONEY_LOCALE): string {
  return formatMoney(money, { locale, withoutTrailingZeros: true }).toString();
}

export function compareMoney(a: MoneyV2 | null | undefined, b: MoneyV2 | null | undefined): number {
  if (!a || !b) return 0;
  return Number.parseFloat(a.amount) - Number.parseFloat(b.amount);
}
