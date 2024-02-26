export const getDateStringForQuery = (date: Date, timezone: string) => {
  return date.toLocaleDateString(
    'en-CA', {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: timezone,
    }
  )
}
