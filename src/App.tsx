import { Flex, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { ConnectKitButton } from "connectkit";
import { Button } from "./components/button";
import { Card } from "./components/card";
import { InputNumber } from "./components/inputNumber";
import "./index.css";

function App() {
  return (
    <Theme
      accentColor="blue"
      grayColor="olive"
      panelBackground="solid"
      scaling="100%"
      radius="large"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Card size={"1"}>
          <Flex direction="column" gap="2">
            <InputNumber
              variant="soft"
              handleChange={(value: string) => {
                console.log(value);
              }}
            />
            <ConnectKitButton />
            <Button variant="outline">Demo button</Button>
          </Flex>
        </Card>
      </div>
    </Theme>
  );
}

export default App;
