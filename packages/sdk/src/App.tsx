import { Tenderize } from "@lib/components";
import { ConnectKitButton } from "connectkit";

function App() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
      <ConnectKitButton />
      <Tenderize />
    </div>
  );
}

export default App;
