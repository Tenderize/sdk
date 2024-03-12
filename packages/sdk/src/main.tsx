import React from "react";
import ReactDOM from "react-dom/client";

import {
  ThemeProvider,
  Web3Provider,
  createTenderizeConfig,
} from "../lib/contexts";

import "@radix-ui/themes/styles.css";

import App from "./App";

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
