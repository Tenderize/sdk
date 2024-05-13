import { Tenderize } from "@lib/components";
import { Header } from "@lib/components/Header";

function App() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
      <Header />

      <Tenderize />
    </div>
  );
}

export default App;
