import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { TenderizeProvider, TokenSlugEnums, createTenderizeConfig, type TenderizersConfig, type TenderizeChains } from "@tenderize/sdk";

import { ThemeProvider } from "@tenderize/sdk";
import { mainnet, arbitrum } from "wagmi/chains";
import { http } from "wagmi";


const TENDERIZERS: TenderizersConfig = {
  [TokenSlugEnums.MATIC]: "0x43ef285f5e27d8ca978a7e577f4ddf52147eb77b",
  [TokenSlugEnums.LIVEPEER]: "0x43ef285f5e27d8ca978a7e577f4ddf52147eb77b",
  [TokenSlugEnums.GRAPH]: "0x43ef285f5e27d8ca978a7e577f4ddf52147eb77b",
};

const mainnetChain = { ...mainnet, id: process.env.LOCALHOST ? 13371 : mainnet.id }
const arbitrumChain = { ...arbitrum, id: process.env.LOCALHOST ? 133742161 : arbitrum.id }

const CHAINS: TenderizeChains = {
  [TokenSlugEnums.MATIC]: mainnetChain,
  [TokenSlugEnums.LIVEPEER]: arbitrumChain,
  [TokenSlugEnums.GRAPH]: arbitrumChain,
};

const config = createTenderizeConfig({
  tenderizers: TENDERIZERS,
  chains: CHAINS,
  transports: {
    [mainnetChain.id]: http("http://localhost:8546"),
    [arbitrumChain.id]: http("http://localhost:8545"),
  }
  // apiKey: import.meta.env.VITE_ALCHEMY_API_KEY as string,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <TenderizeProvider config={config}>
        <App />
      </TenderizeProvider>
    </ThemeProvider>
  </React.StrictMode>
);
