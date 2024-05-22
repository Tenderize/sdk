import { useChainId, useTenderizer } from "@lib/config/store";
import { useSelectedToken } from "@lib/contexts";
import { useERC20Balance } from "@lib/hooks";
import { useCoinPrice } from "@lib/hooks/prices";
import { COINGECKO_KEYS, type Token } from "@lib/types";
import { formatAmount, formatFloatstring } from "@lib/utils/floats";
import { Avatar, Card, Flex, Heading, Text } from "@radix-ui/themes";
import type { FC } from "react";
import { formatEther } from "viem";
import { useAccount } from "wagmi";

export const BalanceCard = () => {
  const token = useSelectedToken();
  const { price } = useCoinPrice(COINGECKO_KEYS[token.slug]);

  const tenderizer = useTenderizer(token.slug);
  const chainId = useChainId(token.slug);
  const { address: userAddress } = useAccount();
  const { balance } = useERC20Balance(tenderizer, userAddress, chainId);
  const usdBalance = (parseFloat(formatEther(balance)) * (price || 0)).toFixed(
    18
  );
  return (
    <BalanceCardView token={token} balance={balance} usdBalance={usdBalance} />
  );
};

type BalanceCardViewProps = {
  token: Token;
  balance: bigint;
  usdBalance: string;
};

export const BalanceCardView: FC<BalanceCardViewProps> = (props) => {
  const { token, balance, usdBalance } = props;

  return (
    <Card variant="classic" className="w-full">
      <Flex justify="between" width="100%" align="start">
        <Flex justify="start" gap="2">
          <Avatar size="4" fallback src={token.img.tToken} alt={token.name} />
          <Flex direction="column" pt={"1"}>
            <Heading size="3">{token.name}</Heading>
            <Heading
              className="text-gray-500 dark:text-gray-400"
              size="1"
            >{`t${token.currency}`}</Heading>
          </Flex>
        </Flex>
        <Flex align="end" gap="1" direction="column">
          <Heading size="6">{formatAmount(balance)}</Heading>
          <Text
            className="text-md font-medium text-gray-400 dark:text-gray-400"
            size="3"
          >{`$ ${formatFloatstring(usdBalance, 2)}`}</Text>
        </Flex>
      </Flex>
    </Card>
  );
};
