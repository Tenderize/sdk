import {
  Button,
  CalloutLayout,
  InputField,
  MaxBalanceButton,
  OutputField,
  TokenSelector,
} from "@lib/components";
import { useChainId, useTenderizer } from "@lib/config/store";
import { useSelectedToken } from "@lib/contexts";
import {
  useDeposit,
  useERC20Approve,
  useERC20Balance,
  usePreviewDeposit,
} from "@lib/hooks";
import { Flex, Text } from "@radix-ui/themes";
import { useState, type FC } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";

export const Stake: FC = () => {
  const [amount, setAmount] = useState<string>("0");
  const token = useSelectedToken();
  const tenderizer = useTenderizer(token.slug);
  const chainId = useChainId(token.slug);
  const parseAmount = parseEther(amount);
  const { previewDeposit, isLoading, isError } = usePreviewDeposit(
    tenderizer,
    parseAmount,
    chainId
  );
  isLoading;
  isError;

  const { mutate: approve, data: approval } = useERC20Approve(
    token.address,
    tenderizer,
    parseAmount,
    chainId
  );
  const { mutate: deposit } = useDeposit(
    tenderizer,
    parseAmount,
    chainId
  );
  const { address: userAddress } = useAccount();
  const { balance } = useERC20Balance(
    token.address,
    userAddress,
    chainId
  );
  return (
    <CalloutLayout
      callOutFirstChildren={
        <Flex gap="2" content="between" direction="column" p="2">
          <Text size="2">You pay</Text>
          <InputField
            variant="soft"
            className=""
            max={formatEther(balance)}
            style={{ width: "100%", fontSize: 30 }}
            handleChange={(value: string) => {
              setAmount(value || "0");
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
          <Text size="2">You Stake</Text>
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
        </Flex>
      }
      callOutActionChildren={
        <Flex gap="2" width="100%">
          {!approval ? (
            <Button
              disabled={!previewDeposit}
              style={{ width: "100%" }}
              size="3"
              onClick={() => approve()}
              variant="solid"
            >
              Approve {token.currency}
            </Button>
          ) : (
            <Button
              disabled={!previewDeposit}
              style={{ width: "100%" }}
              size="3"
              onClick={() => deposit()}
              variant="solid"
            >
              Stake {token.currency}
            </Button>
          )}
        </Flex>
      }
    ></CalloutLayout>
  );
};
