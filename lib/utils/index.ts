import { Attestation } from "@utils/types";
import { format } from "date-fns";

export function shortenAddress(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export const isAddress = (s: string) => /^(0x)?[0-9a-fA-F]{40}$/.test(s);

export function isValidLocationFormat(locationCoords: string) {
  return /^-?\d+\.\d+,-?\d+\.\d+$/.test(locationCoords);
}

// Helper function to validate the IPFS URL
export function isValidIPFS(imageUrl: string) {
  // For the sake of example, here's a simple regex for checking if the URL starts with 'ipfs://'
  return (
    /^ipfs:\/\/.+/i.test(imageUrl) ||
    imageUrl.startsWith("https://ipfs.io/ipfs/")
  );
}

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

export const sortAndGroupByDateReviews = (attestations: Attestation[]) => {
  const groups =
    attestations?.reduce((acc, item) => {
      const date = format(new Date(item.timeCreated * 1000), "yyyy-MM-dd");
      if (!acc[date]) {
        acc[date] = [];
      }
      // @ts-ignore
      acc[date].push({ ...item, timeCreated: date });
      return acc;
    }, {} as Record<string, Attestation[]>) ?? {};

  return Object.entries(groups).sort(
    ([date1], [date2]) => -date1.localeCompare(date2)
  );
};
