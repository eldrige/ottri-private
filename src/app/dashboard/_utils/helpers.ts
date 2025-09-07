export function formatName(name: string) {
  const result = name
    .split(" ")
    .map(
      (part) => part.charAt(0).toUpperCase() + part.slice(1).toLocaleLowerCase()
    )
    .join(" ");
  return result;
}

export function formatHour24To12(hour24: number) {
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:00${period}`;
}

export function nextCleaningDate(isoString: string) {
  const now = new Date();
  const target = new Date(isoString);

  // Round both to midnight for clean day difference
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const date = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate()
  );

  const diffMs = date.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "done"; // past cleanings
  if (diffDays === 0) return "today";
  if (diffDays === 1) return "tomorrow";
  return `In ${diffDays} days`;
}
