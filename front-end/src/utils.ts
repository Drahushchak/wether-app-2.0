export const shortenTime = (time: string) => {
  // Split the input time string to extract hours, minutes, and seconds
  const [hours, minutes] = time.split(':');

  // Create a new Date object; the specific date doesn't matter since we're only interested in time
  const date = new Date();
  date.setHours(+hours, +minutes);

  // Use Intl.DateTimeFormat to format the time in HH:MM format
  const formatter = new Intl.DateTimeFormat('default', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // Use 24-hour format
  });

  // Format the date object to extract the time part in HH:MM format
  return formatter.format(date);
}

export const getDateRepresentation = (date: string) => {
  const inputDate = new Date(date);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  if (inputDate.getDate() === today.getDate() && inputDate.getMonth() === today.getMonth() && inputDate.getFullYear() === today.getFullYear()) {
    return 'Today';
  }
  if (inputDate.getDate() === tomorrow.getDate() && inputDate.getMonth() === tomorrow.getMonth() && inputDate.getFullYear() === tomorrow.getFullYear()) {
    return 'Tomorrow';
  }
  return inputDate.toLocaleDateString('en-EN', { weekday: 'long' });
}
