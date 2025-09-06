export function formatName(name: string) {
  const result = name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  return result;
}
