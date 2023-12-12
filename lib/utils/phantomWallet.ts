import Phantom from "./Phantom";
export class PhantomWallet {
  static id = "phantom" as const;
  static meta = {
    name: "Phantom",
    iconURL: Phantom,
    links: {
      native: "phantom:",
      universal: "https://rnbwapp.com",
    },
  };

  getMeta() {
    return PhantomWallet.meta;
  }
}

export const rainbowWallet = (config?: { projectId: string }) => {
  return {
    id: PhantomWallet.id,
    meta: PhantomWallet.meta,
    create: (options: WalletOptionsRC) =>
      new PhantomWallet({
        ...options,
        walletId: PhantomWallet.id,
        projectId: config?.projectId,
      }),
    recommended: config?.recommended,
  };
};
