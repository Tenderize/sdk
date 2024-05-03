import { useChainId, useTenderizer } from "@lib/config/store";
import { useSelectedToken } from "@lib/contexts";
import { useERC20Balance } from "@lib/hooks";
import { useCoinPrice } from "@lib/hooks/prices";
import { COINGECKO_KEYS, type Token } from "@lib/types";
import { formatAmount, formatFloatstring } from "@lib/utils/floats";
import { Avatar, Card } from "@radix-ui/themes";
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
    <Card
      variant="classic"
      className="w-full bg-background border-border border border-b-none"
    >
      <div className="flex items-start w-full">
        <div className="flex justify-between w-full items-center">
          <div className="flex justify-start gap-2">
            <Avatar size="4" fallback src={token.img.tToken} alt={token.name} />
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-primary-foreground">
                {token.name}
              </span>
              <span className="text-secondary-foreground text-sm font-semibold">{`t${token.currency}`}</span>
            </div>
          </div>
          <div className="flex items-end gap-1 flex-col">
            <span className="text-2xl font-semibold text-primary-foreground">
              {formatAmount(balance)}
            </span>
            <span className="text-secondary-foreground text-sm font-semibold">{`$ ${formatFloatstring(
              usdBalance,
              2
            )}`}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
