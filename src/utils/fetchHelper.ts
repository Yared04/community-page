export const simulateApiDelay = <T>(data: T, delay = 100): Promise<T> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(data);
    }, delay)
  );
};
