export function CalculateDuration(
  startDate: string | Date,
  endDate: string | Date
): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
    return "";
  }

  const durationMs = end.getTime() - start.getTime();
  const totalMinutes = Math.floor(durationMs / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return days > 0 ? `${days}d ${hours}h ${minutes}m` : `${hours}h ${minutes}m`;
}
