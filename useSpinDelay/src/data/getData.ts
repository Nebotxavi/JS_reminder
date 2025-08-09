export const getData = (
  delay: number,
  shouldFail: boolean = false
): Promise<{ data: string }> => {
  return new Promise<{ data: string }>((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Failed to fetch data"));
      }

      resolve({ data: `Data fetched after ${delay}ms` });
    }, delay);
  });
};
