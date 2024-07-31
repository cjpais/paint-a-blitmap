import ExampleNFTGoerli from "@web3-scaffold/contracts/deploys/goerli/ExampleNFT.json";
import { Paintmap__factory } from "@web3-scaffold/contracts/types";
import { useContractRead } from "wagmi";

import { provider, targetChainId } from "./EthereumProviders";

// I would have used `ExampleNFT__factory.connect` to create this, but we may
// not have a provider ready to go. Any interactions with this contract should
// use `exampleNFTContract.connect(providerOrSigner)` first.

// export const exampleNFTContract = new Contract(
//   ExampleNFTGoerli.deployedTo,
//   ExampleNFT__factory.abi
// ) as ExampleNFT;

export const PAINTMAP_ADDR = "0x5bb697da0068b909ca3b8b649b3efc5207c2c012";

export const paintmapContract = Paintmap__factory.connect(
  PAINTMAP_ADDR,
  provider({ chainId: targetChainId })
);

export const usePaintmapContractRead = (
  readConfig: Omit<
    Parameters<typeof useContractRead>[0],
    "addressOrName" | "contractInterface"
  >
) =>
  useContractRead({
    ...readConfig,
    addressOrName: ExampleNFTGoerli.deployedTo,
    contractInterface: Paintmap__factory.abi,
  });
