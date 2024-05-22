import { Tenderize } from "@lib/components";
import { useTenderizeConfigStore } from "@lib/config/store";
import { Flex } from "@radix-ui/themes";
import { ConnectKitButton } from "connectkit";

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
    <Flex
      gap="4"
      direction="column"
      style={{ height: "100%" }}
      align="center"
      justify="center"
      height={"auto"}
    >
      <ConnectKitButton />
      <RouterProvider router={router} />
    </Flex>
  );
}

export default App;
