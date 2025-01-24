export const simulateApiDelay = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
};
