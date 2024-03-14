import { useChainId, useTenderizer } from "@lib/config/store";
import { useSelectedToken } from "@lib/contexts";
import { useERC20Balance } from "@lib/hooks";
import { useCurrency } from "@lib/hooks/currency";
import { formatAmount } from "@lib/utils/floats";
import { Avatar, Badge, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { useAccount } from "wagmi";

export const BalanceCard = () => {
  const token = useSelectedToken();
  const { currencies } = useCurrency();
  console.log("currencies", currencies);
  const tenderizer = useTenderizer(token.slug);
  const chainId = useChainId(token.slug);
  const { address: userAddress } = useAccount();
  const { balance } = useERC20Balance(tenderizer, userAddress, chainId);
  return (
    <Card variant="classic" style={{ width: "100%" }}>
      <Flex justify="between" width="100%" align="start">
        <Flex justify="start">
          <Avatar size="4" fallback src={token.img.tToken} alt={token.name} />
          <Flex direction="column">
            <Heading size="2">{token.name}</Heading>
            <Heading size="1">{`t${token.currency}`}</Heading>
          </Flex>
        </Flex>
        <Badge
          radius="full"
          variant="soft"
          size="1"
          style={{ padding: "0px 20px 0px 20px" }}
        >
          <Heading size="5">{formatAmount(balance)}</Heading>
          <Text size="1">{`t${token.currency}`}</Text>
        </Badge>
      </Flex>
      <Flex
        justify="between"
        width="100%"
        align="start"
        style={{ color: "gray" }}
      >
        <Text size="1">{`Total Balance in USD`}</Text>
      </Flex>
    </Card>
  );
};
