export function apiCall<T>(second: number = 1, data: T) {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, second * 1000);
  });
}
