import {
  Button,
  CalloutLayout,
  InputField,
  MaxBalanceButton,
  OutputField,
  SwitchChainButton,
  TokenSelector,
} from "@lib/components";
import { useChainId, useTenderizer } from "@lib/config/store";
import { useSelectedToken } from "@lib/contexts";
import {
  useDeposit,
  useERC20Allowance,
  useERC20Approve,
  useERC20Balance,
  usePreviewDeposit,
  useSimulateDeposit,
} from "@lib/hooks";
import { useCoinPrice } from "@lib/hooks/prices";
import { COINGECKO_KEYS } from "@lib/types";
import { formatFloatstring } from "@lib/utils/floats";
import { isMutationPending } from "@lib/utils/global";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import { debounce } from "lodash";
import { useEffect, useMemo, useState, type FC } from "react";
import { formatEther, parseEther, type Address } from "viem";
import { useAccount, useChainId as useCurrentChainId } from "wagmi";

export const Stake: FC = () => {
  const [amount, setAmount] = useState<string>("");
  const token = useSelectedToken();
  const tenderizer = useTenderizer(token.slug);
  const chainId = useChainId(token.slug);
  const { address: user } = useAccount();
  const currentChainId = useCurrentChainId();

  const { previewDeposit } = usePreviewDeposit(
    tenderizer,
    parseEther(amount),
    chainId
  );

  const { address: userAddress } = useAccount();

  const { balance } = useERC20Balance(token.address, userAddress, chainId);

  const { allowance } = useERC20Allowance(
    token.address,
    user ?? ("" as Address),
    tenderizer,
    chainId
  );

  const {
    mutate: approve,
    data: approval,
    status: approveStatus,
  } = useERC20Approve(token.address, tenderizer, parseEther(amount), chainId);

  const {
    mutate: simulateDeposit,
    data: simulatedDepositData,
    status: simulateStatus,
  } = useSimulateDeposit(tenderizer, parseEther(amount), chainId);

  const debouncedSimulateDeposit = useMemo(() => {
    return debounce(simulateDeposit, 1000);
  }, [simulateDeposit]);

  const {
    request: simulatedRequest,
    estimatedGas = 0n,
    estimatedGasPrice = 0n,
  } = simulatedDepositData || {};

  const { price } = useCoinPrice(COINGECKO_KEYS[token.slug]);
  const usdEstimatedGasPrice = (
    parseFloat(formatEther(estimatedGas * estimatedGasPrice)) * (price || 0)
  ).toFixed(18);

  const { mutate: deposit, status: depositStatus } = useDeposit(
    simulatedRequest,
    chainId
  );

  // used to rest the amount after a successful deposit
  useEffect(() => {
    if (depositStatus === "success") {
      setAmount("");
    }
  }, [depositStatus]);

  return (
    <Flex gap="2" content="between" direction="column" p="2">
      <CalloutLayout
        callOutFirstChildren={
          <Flex gap="2" content="between" direction="column" p="2" width="100%">
            <Text size="2">You Stake</Text>
            <InputField
              variant="soft"
              className=""
              size="3"
              max={formatEther(balance)}
              style={{ width: "100%", fontSize: 30 }}
              handleChange={(value: string) => {
                setAmount(value || "0");
                if (currentChainId === chainId && allowance > 0n) {
                  debouncedSimulateDeposit();
                }
              }}
              value={amount}
              icon={<TokenSelector />}
            />

            <MaxBalanceButton
              max={formatEther(balance)}
              handleInputChange={(value: string) => {
                setAmount(value);
              }}
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
              value={formatEther(previewDeposit ?? 0n)}
              icon={
                <Flex align="center" gap="2">
                  <img
                    width={30}
                    height={30}
                    src={token.img?.tToken}
                    alt={token.name}
                  />
                  <Text size="3">{`t${token.currency}`}</Text>
                </Flex>
              }
            />

            {allowance > 0n && (
              <Text size="1">
                Estimated gas fees:{" "}
                {isMutationPending(simulateStatus)
                  ? "loading..."
                  : simulateStatus === "success"
                  ? `$ ${formatFloatstring(usdEstimatedGasPrice, 8)}`
                  : 0}
              </Text>
            )}
          </Flex>
        }
        callOutActionChildren={
          <Flex gap="2" width="100%">
            {(() => {
              if (currentChainId !== chainId) {
                return <SwitchChainButton requiredChainId={chainId} />;
              }

              if (depositStatus === "success") {
                return (
                  <Button
                    style={{ width: "100%", pointerEvents: "none" }}
                    size="4"
                    variant="soft"
                    color="green"
                  >
                    <Flex gap="2" align="center">
                      <CheckCircledIcon />
                      <Text>Staked {token.currency}</Text>
                    </Flex>
                  </Button>
                );
              }
              if (!approval && allowance < parseEther(amount)) {
                return (
                  <Button
                    className={
                      isMutationPending(approveStatus) ? "animate-pulse" : ""
                    }
                    disabled={
                      !previewDeposit || isMutationPending(approveStatus)
                    }
                    style={{ width: "100%" }}
                    size="4"
                    onClick={() => approve()}
                    variant="solid"
                  >
                    {isMutationPending(approveStatus) ? (
                      <>Approving {token.currency}...</>
                    ) : (
                      <>Approve {token.currency}</>
                    )}
                  </Button>
                );
              }
              return (
                <Button
                  className={
                    isMutationPending(depositStatus) ? "animate-pulse" : ""
                  }
                  disabled={!previewDeposit || isMutationPending(depositStatus)}
                  style={{ width: "100%" }}
                  size="4"
                  onClick={() => {
                    if (simulatedRequest) {
                      deposit?.();
                    }
                  }}
                  variant="solid"
                >
                  {isMutationPending(depositStatus) ? (
                    <>Staking {token.currency}...</>
                  ) : (
                    <>Stake {token.currency}</>
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
