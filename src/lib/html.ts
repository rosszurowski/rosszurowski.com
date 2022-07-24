/**
 * widont replaces the final space in a string with a &nbsp; character,
 * to avoid widows.
 */
export function widont(str: string): string {
  return str.replace(/\s+(\S*)$/, "&nbsp;$1")
}
