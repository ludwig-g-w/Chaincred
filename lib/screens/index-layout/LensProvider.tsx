import {
  IBindings,
  LensConfig,
  LensProvider,
  development,
} from "@lens-protocol/react-native";
import { storage } from "@lens-protocol/react-native/storage/mmkv";
import { Wallet, providers } from "ethers";
const provider = new providers.InfuraProvider("maticmum");
const wallet = new Wallet(
  "3204c131fc0eee1a66b9fd103cbc927e0092bbe9a0407a0223d3a4c0f3794870",
  provider
);

export const bindings: IBindings = {
  getProvider: async () => provider,
  getSigner: async () => wallet,
};

const lensConfig: LensConfig = {
  bindings,
  environment: development,
  storage: storage(),
};

const MyLensProvider = ({ children }: any) => (
  <LensProvider config={lensConfig}>{children}</LensProvider>
);

export default MyLensProvider;
