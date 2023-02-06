export function hasDuplicates<T>(arr: T[]): boolean {
  const set = new Set<T>();
  for (const element of arr) {
    if (set.has(element)) return true;
    set.add(element);
  }
  return false;
}
