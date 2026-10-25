export const getChipStyles = (
  name: string,
  selectedName: string,
  colorMap: Record<string, string>
) => {
  const selected = selectedName === name;
  const color = colorMap[name] || "#9e9e9e";
  return {
    backgroundColor: selected ? color : "#ffffff",
    border: `2px solid ${color}`,
    color: selected ? "#fff" : color,
  };
};
export const getUniqueValues = <T, K extends keyof T>(
  rows: T[],
  key: K
): string[] => {
  return Array.from(
    new Set(rows.map((r) => r[key]).filter(Boolean))
  ) as string[];
};
