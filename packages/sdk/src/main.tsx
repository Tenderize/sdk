import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { http } from "wagmi"
import { TokenSlugEnums } from "@lib/constants";
import { TenderizeProvider, Web3Provider } from "@lib/contexts";

import { ThemeProvider } from "@lib/contexts";
import {
  createTenderizeConfig,
  type TenderizeChains,
  type TenderizersConfig,
} from "@lib/main.ts";
import { arbitrum, mainnet } from "wagmi/chains";

const TENDERIZERS: TenderizersConfig = {
  [TokenSlugEnums.MATIC]: "0x43ef285f5e27d8ca978a7e577f4ddf52147eb77b",
  [TokenSlugEnums.LIVEPEER]: "0x4b0e5e54df6d5eccc7b2f838982411dc93253daf",
  [TokenSlugEnums.GRAPH]: "0x4003e23be46f3bf2b50c3c7f8b13aaecdc71ea72",
};
console.log(import.meta.env.PROD);
console.log(import.meta.env.DEV);

const mainnetChain = {
  ...mainnet,
  id: import.meta.env.PROD ? mainnet.id : 13371,
};
const arbitrumChain = {
  ...arbitrum,
  id: import.meta.env.PROD ? arbitrum.id : 1337142161,
};

const CHAINS: TenderizeChains = {
  [TokenSlugEnums.MATIC]: mainnetChain,
  [TokenSlugEnums.LIVEPEER]: arbitrumChain,
  [TokenSlugEnums.GRAPH]: arbitrumChain,
};

const config = createTenderizeConfig({
  tenderizers: TENDERIZERS,
  chains: CHAINS,
  // transports: {
  //   [mainnetChain.id]: http("http://localhost:8546"),
  //   [arbitrumChain.id]: http("http://localhost:8545"),
  // },
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY as string,
});

console.log(CHAINS);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <TenderizeProvider config={config}>
        <Web3Provider config={config.web3}>
          <App />
        </Web3Provider>
      </TenderizeProvider>
    </ThemeProvider>
  </React.StrictMode>
);
