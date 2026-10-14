/** A size is an explicit, allowed choice. No inferred default can authorize a sized order. */
export function sizeIsReady(sizes: readonly string[] | undefined, selected: string): boolean {
  return !sizes?.length || sizes.includes(selected);
}
export function explicitSize(sizes: readonly string[] | undefined, value: string | null): string {
  return value && sizes?.includes(value) ? value : "";
}
