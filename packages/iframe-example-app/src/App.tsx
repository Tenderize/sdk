import { generateIframeQueryString, TabEnum } from "@tenderize/sdk";
import "./App.css";

function App() {
  const queryString = generateIframeQueryString({
    matic: "0x43ef285f5e27d8ca978a7e577f4ddf52147eb77b",
    livepeer: "0x4a3c14d7450c30f712e89659af21f90df56bc9ba",
    graph: "0x4003e23be46f3bf2b50c3c7f8b13aaecdc71ea72",
    disabledTabs: [TabEnum.SWAP],
  });
  return (
    <iframe
      src={`https://sdk-sdk.vercel.app?${queryString}`}
      height="660px"
      width="100%"
      style={{
        border: 0,
        margin: "0 auto",
        marginBottom: ".5rem",
        display: "block",
        borderRadius: "10px",
        maxWidth: "960px",
        minWidth: "600px",
      }}
    />
  );
}

export default App;
