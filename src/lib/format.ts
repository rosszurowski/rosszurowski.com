/**
 * formatDateYear formats a date string to a long date. For example, 2001-06-05
 * becomes Jun 5, 2001.
 */
export function formatDateFull(date: string | Date) {
  const d = parseDate(date)
  return Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d)
}

/**
 * formatDateYear formats a date string to YYYY format. For example, 2001-06-05
 * becomes 2001.
 */
export function formatDateYear(date: string | Date) {
  const d = parseDate(date)
  return Intl.DateTimeFormat("en-US", { year: "numeric" }).format(d)
}

function parseDate(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date
  if (isNaN(d.getTime())) {
    throw new Error(`Invalid date: ${date}`)
  }
  return d
}
