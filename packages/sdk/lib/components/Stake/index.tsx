import { Button } from "@lib/components/Button";
import { MaxBalanceButton } from "@lib/components/MaxBalanceButton";
import { OutputField } from "@lib/components/OutputField";
import {
  useDeposit,
  useERC20Approve,
  usePreviewDeposit
} from "@lib/hooks";
import { useSelectedToken } from "@lib/contexts";
import { Flex, Text } from "@radix-ui/themes";
import { useState, type FC } from "react";
import { formatEther } from "viem";
import { CalloutLayout } from "@lib/components/CalloutLayout";
import { useTenderizer, useChainId } from "@lib/config/store";

export const Stake: FC = () => {
  const [amount, setAmount] = useState<bigint>(0n);
  const token = useSelectedToken();
  const tenderizer = useTenderizer(token.slug);
  const chainId = useChainId(token.slug)
  const { previewDeposit, isLoading, isError } = usePreviewDeposit(
    tenderizer,
    amount,
    chainId
  );
  isLoading;
  isError;

  const { mutate: approve, data: approval } = useERC20Approve(
    token.address,
    tenderizer,
    amount,
    chainId
  );
  const { mutate: deposit } = useDeposit(tenderizer, amount, token.chainId);
  return (
    <CalloutLayout
      callOutFirstChildren={
        <Flex gap="2" content="between" direction="column" p="2">
          <Text size="2">You pay</Text>
          <MaxBalanceButton
            tokenAddress={token.address}
            handleInputChange={(value: bigint) => {
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
              <Flex align="center" gap="1">
                <Text size="2">{`t${token.currency}`}</Text>
                <img
                  width={25}
                  height={25}
                  src={token.img?.tToken}
                  alt={token.name}
                />
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
