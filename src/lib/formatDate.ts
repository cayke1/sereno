interface FormatDateProps {
  date: string | Date;
  showHours?: boolean;
}


// Alternative simpler approach using toLocaleDateString
export function formatDate({ date, showHours = true }: FormatDateProps) {
  const dateObj = new Date(date);
  
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  
  const formattedDate = dateObj.toLocaleDateString("pt-BR", dateOptions);
  
  if (showHours) {
    const formattedTime = dateObj.toLocaleTimeString("pt-BR", timeOptions);
    return `${formattedDate} • ${formattedTime}`;
  }
  
  return formattedDate;
}