export function nullThrows<T>(
  thing: T | null | undefined,
  message: string
): asserts thing is T {
  if (thing == null) {
    throw new Error(message);
  }
}
