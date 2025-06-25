export function formatSessionTime(
  dateString: string,
  duration: number,
): string {
  const start = new Date(dateString);
  const end = new Date(start.getTime() + duration * 60000);

  const padTime = (n: number) => n.toString().padStart(2, "0");
  const startTime = `${padTime(start.getHours())}:${padTime(start.getMinutes())}`;
  const endTime = `${padTime(end.getHours())}:${padTime(end.getMinutes())}`;
  return `${startTime}-${endTime}`;
}
