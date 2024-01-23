export function shortenAddress(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export const isAddress = (s: string) => /^(0x)?[0-9a-fA-F]{40}$/.test(s);
