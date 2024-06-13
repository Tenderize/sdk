import {
  generateIframeQueryString,
  TabEnum,
  TokenSlugEnums,
} from "@tenderize/sdk";
import "./App.css";

function App() {
  const queryString = generateIframeQueryString({
    [TokenSlugEnums.MATIC]: "0x43ef285f5e27d8ca978a7e577f4ddf52147eb77b",
    [TokenSlugEnums.LIVEPEER]: "0x4a3c14d7450c30f712e89659af21f90df56bc9ba",
    [TokenSlugEnums.GRAPH]: "0x4003e23be46f3bf2b50c3c7f8b13aaecdc71ea72",
    disabledTabs: [TabEnum.SWAP],
    tokens: [
      TokenSlugEnums.MATIC,
      TokenSlugEnums.LIVEPEER,
      TokenSlugEnums.GRAPH,
    ],
  });
  return (
    <iframe
      src={`https://sdk-sdk.vercel.app?${queryString}`}
      height="660px"
      width="100vw"
      style={{
        border: 0,
        width: "100%",
        minWidth: "300px",
      }}
    />
  );
}

export default App;
