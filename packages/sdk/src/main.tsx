import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
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
  [TokenSlugEnums.MATIC]: "0x4af4c94e1c45678f34ef6cbc00c4edc62e03d248",
  [TokenSlugEnums.LIVEPEER]: "0x4b0e5e54df6d5eccc7b2f838982411dc93253daf",
  [TokenSlugEnums.GRAPH]: "0xff14e5d8ce40666ee9394cf036f3024d92e181d3",
};

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
