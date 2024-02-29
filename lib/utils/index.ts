export function shortenAddress(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export const isAddress = (s: string) => /^(0x)?[0-9a-fA-F]{40}$/.test(s);

export function createResource<T>(promiseFn: () => Promise<T>) {
  let status: "pending" | "success" | "error" = "pending";
  let result: T | Error;
  let suspender: Promise<void> | null = null;

  const read = () => {
    if (status === "pending") {
      if (suspender === null) {
        suspender = promiseFn().then(
          (data: T) => {
            status = "success";
            result = data;
          },
          (error: Error) => {
            status = "error";
            result = error;
          }
        );
      }
      throw suspender;
    } else if (status === "error") {
      throw result;
    } else if (status === "success") {
      return result as T;
    }
    throw new Error("This should never happen.");
  };

  return { read };
}
