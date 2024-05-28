import { Tenderize } from "@lib/components";
import { FAQ } from "@lib/components/FAQ";
import { Footer } from "@lib/components/Footer";
import { Header } from "@lib/components/Header";

function App() {
  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center h-full pb-[250px]">
        <Header />
        <Tenderize />
        <FAQ />
        <Footer />
      </div>
    </>
  );
}

export default App;
