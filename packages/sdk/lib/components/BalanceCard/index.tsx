import { useChainId, useTenderizer } from "@lib/config/store";
import { useSelectedToken } from "@lib/contexts";
import { useERC20Balance } from "@lib/hooks";
import { useCoinPrice } from "@lib/hooks/prices";
import { COINGECKO_KEYS, type Token } from "@lib/types";
import { formatAmount } from "@lib/utils/floats";
import { Avatar, Card, Flex, Heading, Text } from "@radix-ui/themes";
import type { FC } from "react";
import { parseEther } from "viem";
import { useAccount } from "wagmi";

export const BalanceCard = () => {
  const token = useSelectedToken();
  const { price } = useCoinPrice(COINGECKO_KEYS[token.slug]);

  const tenderizer = useTenderizer(token.slug);
  const chainId = useChainId(token.slug);
  const { address: userAddress } = useAccount();
  const { balance } = useERC20Balance(tenderizer, userAddress, chainId);
  const parsedPrice = parseEther(price?.toString() || "0");
  const calculatePriceInCurrency = (balance * parsedPrice) / 10n ** 18n;
  return (
    <BalanceCardView
      token={token}
      balance={balance}
      calculatePriceInCurrency={calculatePriceInCurrency}
    />
  );
};

type BalanceCardViewProps = {
  token: Token;
  balance: bigint;
  calculatePriceInCurrency: bigint;
};

export const BalanceCardView: FC<BalanceCardViewProps> = (props) => {
  const { token, balance, calculatePriceInCurrency } = props;
  return (
    <Card className="p-3 pr-6" variant="classic" style={{ width: "100%" }}>
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
            className="font-medium tracking-wider text-gray-500 dark:text-gray-400 "
            size="3"
          >{`$ ${formatAmount(calculatePriceInCurrency)}`}</Text>
        </Flex>
      </Flex>
    </Card>
  );
};
