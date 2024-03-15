import {
  Button,
  CalloutLayout,
  InputField,
  MaxBalanceButton,
  OutputField,
  SwitchChainButton,
  TokenSelector,
  Withdraw,
} from "@lib/components";
import { useChainId, useTenderizer } from "@lib/config/store";
import { ActionEnums } from "@lib/constants";
import { useSelectedToken } from "@lib/contexts";
import { useERC20Balance } from "@lib/hooks";
import { useCoinPrice } from "@lib/hooks/prices";
import { useUnstake, useUnstakeSimulate } from "@lib/hooks/unlocks";
import { COINGECKO_KEYS } from "@lib/types";
import { formatFloatstring } from "@lib/utils/floats";
import { isMutationPending } from "@lib/utils/global";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import { debounce } from "lodash";
import { useEffect, useState, type FC } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount, useChainId as useCurrentChainId } from "wagmi";
export const Unstake: FC = () => {
  const [amount, setAmount] = useState<string>("");
  const token = useSelectedToken();
  const tenderizer = useTenderizer(token.slug);
  const chainId = useChainId(token.slug);
  const { address: userAddress } = useAccount();
  const { balance } = useERC20Balance(tenderizer, userAddress, chainId);
  const currentChainId = useCurrentChainId();

  const {
    mutate: simulateUnstake,
    data: simulatedUnstakeData,
    status: simulateStatus,
  } = useUnstakeSimulate(tenderizer, parseEther(amount), chainId);

  const debouncedSimulateUnstake = debounce(() => {
    simulateUnstake();
  }, 2000);

  const {
    request: simulatedRequest,
    estimatedGas = 0n,
    estimatedGasPrice = 0n,
  } = simulatedUnstakeData || {};
  const { price } = useCoinPrice(COINGECKO_KEYS[token.slug]);

  const usdEstimatedGasPrice = (
    parseFloat(formatEther(estimatedGas * estimatedGasPrice)) * (price || 0)
  ).toFixed(18);

  const { mutate: unstake, status: unstakeStatus } = useUnstake(
    simulatedRequest,
    chainId
  );

  // used to rest the amount after a successful deposit
  useEffect(() => {
    if (unstakeStatus === "success") {
      setAmount("");
    }
  }, [unstakeStatus]);

  return (
    <Flex gap="2" content="between" direction="column" p="2">
      <Withdraw />
      <CalloutLayout
        callOutFirstChildren={
          <Flex gap="2" content="between" direction="column" p="2" width="100%">
            <Text size="2">You Unstake</Text>
            <InputField
              disabled={isMutationPending(unstakeStatus)}
              variant="soft"
              className=""
              max={formatEther(balance)}
              style={{ width: "100%", fontSize: 30 }}
              handleChange={(value: string) => {
                setAmount(value || "0");
                if (currentChainId === chainId) {
                  debouncedSimulateUnstake();
                }
              }}
              value={amount}
              icon={<TokenSelector action={ActionEnums.UNSTAKE} />}
            />
            <MaxBalanceButton
              max={formatEther(balance)}
              handleInputChange={setAmount}
            />
          </Flex>
        }
        callOutSecondChildren={
          <Flex direction="column" gap="2" p="2" width="100%">
            <Text size="2">You Receive</Text>
            <OutputField
              variant="soft"
              className=""
              style={{ width: "100%", fontSize: 30 }}
              value={amount}
              icon={
                <Flex align="center" gap="2">
                  <img
                    width={25}
                    height={25}
                    src={token.img?.token}
                    alt={token.name}
                  />
                  <Text size="3">{`${token.currency}`}</Text>
                </Flex>
              }
            />

            <Text size="1">
              Estimated gas fees:{" "}
              {isMutationPending(simulateStatus)
                ? "loading..."
                : simulateStatus === "success"
                ? `$ ${formatFloatstring(usdEstimatedGasPrice, 8)}`
                : 0}
            </Text>
          </Flex>
        }
        callOutActionChildren={
          <Flex gap="2" width="100%">
            {(() => {
              if (currentChainId !== chainId) {
                return <SwitchChainButton requiredChainId={chainId} />;
              }
              if (unstakeStatus === "success") {
                return (
                  <Button
                    style={{ width: "100%", pointerEvents: "none" }}
                    size="4"
                    variant="soft"
                    color="green"
                  >
                    <Flex gap="2" align="center">
                      <CheckCircledIcon />
                      <Text>Unstaked {token.currency}</Text>
                    </Flex>
                  </Button>
                );
              }
              return (
                <Button
                  className={
                    isMutationPending(unstakeStatus) ? "animate-pulse" : ""
                  }
                  disabled={!amount || isMutationPending(unstakeStatus)}
                  style={{ width: "100%" }}
                  size="4"
                  onClick={() => {
                    unstake?.();
                  }}
                  variant="solid"
                >
                  {isMutationPending(unstakeStatus) ? (
                    <>Unstaking {token.currency}...</>
                  ) : (
                    <>Unstake {token.currency}</>
                  )}
                </Button>
              );
            })()}
          </Flex>
        }
      ></CalloutLayout>
    </Flex>
  );
};
