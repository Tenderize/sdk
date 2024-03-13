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
  useERC20Allowance,
  useERC20Approve,
  useERC20Balance,
  usePreviewDeposit,
} from "@lib/hooks";
import { Flex, Text } from "@radix-ui/themes";
import { useState, type FC } from "react";
import { formatEther, type Address } from "viem";
import { useAccount, useChainId as useCurrentChainId } from "wagmi";
import { SwitchChainButton } from "@lib/components";

export const Stake: FC = () => {
  const [amount, setAmount] = useState<bigint>(0n);
  const token = useSelectedToken();
  const tenderizer = useTenderizer(token.slug);
  const chainId = useChainId(token.slug);
  const { address: user } = useAccount()
  const currentChainId = useCurrentChainId();

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
  const { mutate: deposit } = useDeposit(
    tenderizer,
    amount,
    chainId
  );
  const { address: userAddress } = useAccount();
  const { balance } = useERC20Balance(
    token.address,
    userAddress,
    chainId
  );
  const { allowance } = useERC20Allowance(token.address, user ?? "" as Address, tenderizer, chainId)

  return (
    <CalloutLayout
      callOutFirstChildren={
        <Flex gap="2" content="between" direction="column" p="2">
          <Text size="2">You Stake</Text>
          <InputField
            variant="soft"
            className=""
            max={balance}
            style={{ width: "100%", fontSize: 30 }}
            handleChange={setAmount}
            value={amount}
            icon={<TokenSelector />}
          />
          <MaxBalanceButton
            max={balance}
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
          {currentChainId !== chainId ? <SwitchChainButton requiredChainId={chainId} /> : (!approval && allowance < amount) ? (
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
          { }
        </Flex>
      }
    ></CalloutLayout>
  );
};
