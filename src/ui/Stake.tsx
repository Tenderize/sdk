import { Flex } from "@radix-ui/themes";
import { ConnectKitButton } from "connectkit";
import MaxButton from "../components/MaxButton";
import { Button } from "../components/button";
import { InputNumber } from "../components/inputNumber";

export const Stake = () => {
  return (
    <Flex direction="column" gap="2">
      <MaxButton
        maxValue="100"
        handleInputChange={(value: string) => {
          console.log(value);
        }}
      />
      <InputNumber value={"100"} disabled />
      <ConnectKitButton /> {/* Todo: use wagmi config to change buttons */}
      <Button variant="solid">Stake</Button>
    </Flex>
  );
};
