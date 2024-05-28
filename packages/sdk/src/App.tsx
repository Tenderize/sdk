import { Tenderize } from "@lib/components";
import { FAQ } from "@lib/components/FAQ";
import { Footer } from "@lib/components/Footer";
import { Header } from "@lib/components/Header";
import { useTenderizeConfigStore } from "@lib/config/store";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

function App() {
  const { activeTabs: activeTabsStore } = useTenderizeConfigStore();

  const activeRoutes = activeTabsStore.map((tab) => (
    <Route key={tab} path={tab} element={<Tenderize />} />
  ));

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Tenderize />}>
        {activeRoutes}
      </Route>
    )
  );
  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center h-full pb-[250px]">
        <Header />
        <RouterProvider router={router} />
        <FAQ />
        <Footer />
      </div>
    </>
  );
}

export default App;
