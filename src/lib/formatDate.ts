export function formatDate(date: string | Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  const dateTimeFormat = new Intl.DateTimeFormat("pt-BR", options);
  const parts = dateTimeFormat.formatToParts(new Date(date));

  const formattedDate = parts
    .map((part) => part.value)
    .join("")
    .replace(",", "")
    .replace(/\s+/g, " • ")
    .trim();

  return formattedDate;
}
