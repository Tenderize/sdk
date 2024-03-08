import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { Web3Provider, createTenderizeConfig } from "@tenderize/sdk";

import { ThemeProvider } from "@tenderize/sdk";

const config = createTenderizeConfig({
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY as string,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Web3Provider config={config}>
        <App />
      </Web3Provider>
    </ThemeProvider>
  </React.StrictMode>
);
