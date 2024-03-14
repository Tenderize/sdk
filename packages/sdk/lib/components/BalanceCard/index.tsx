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
          <Flex direction="column">
            <Heading size="2">{token.name}</Heading>
            <Heading size="1">{`t${token.currency}`}</Heading>
          </Flex>
        </Flex>
        <Flex align="center" gap="2">
          <Heading size="6">{formatAmount(balance)}</Heading>
          <Text size="1">{`t${token.currency}`}</Text>
        </Flex>
      </Flex>
      <Flex
        justify="between"
        width="100%"
        align="center"
        style={{ color: "gray" }}
      >
        <Text size="2">{`Total Balance in USD`}</Text>

        <Text size="3">{`$ ${formatAmount(calculatePriceInCurrency)}`}</Text>
      </Flex>
    </Card>
  );
};
