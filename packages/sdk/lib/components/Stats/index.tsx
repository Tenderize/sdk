import { CardContent } from "@lib/components/ui/card";
import { Separator } from "@lib/components/ui/separator";
import { useChainId, useTenderizer } from "@lib/config/store";
import { useSelectedToken } from "@lib/contexts";
import { useTenderizerData, useTenderizerStats } from "@lib/hooks";
import { useCoinPrice } from "@lib/hooks/prices";
import { COINGECKO_KEYS } from "@lib/types";
import { formatFloatstring } from "@lib/utils/floats";
import type { FC } from "react";
import type { Address } from "viem";
import { Card } from "../Card";

type TenderizerStats = {
  tvl: string;
  apy: string;
  dollarTvl: string;
};

export const TenderizerStats: FC = () => {
  const token = useSelectedToken();
  const tenderizer = useTenderizer(token.slug);
  const chainId = useChainId(token.slug);

  const { stats, isLoading, error } = useTenderizerStats(tenderizer, chainId);
  const { price } = useCoinPrice(COINGECKO_KEYS[token.slug]);
  const dollarTvl = ((price || 0) * stats.tvl).toString();

  const { data: tenderizerData } = useTenderizerData(tenderizer, chainId);

  return (
    <TenderizerStatsView
      tokenSymbol={token.currency}
      stats={{ ...stats, dollarTvl }}
      validator={tenderizerData.validator}
      isLoading={isLoading}
      error={error}
    />
  );
};

export const TenderizerStatsView: FC<{
  tokenSymbol: string;
  stats: TenderizerStats;
  validator: Address;
  isLoading?: boolean;
  error?: Error | null;
}> = ({ tokenSymbol, stats }) => {
  return (
    <Card
      variant="classic"
      className="w-full bg-background  border border-b-none border-border"
    >
      <CardContent className="grid grid-cols-9 gap-6 text-center p-0">
        <div className="flex flex-col col-span-4 items-center sm:col-span-3 md:col-span-4">
          <div className="text-xs sm:text-sm font-medium tracking-wider text-secondary-foreground dark:text-secondary-foreground">
            Value Locked
          </div>
          <div className="text-lg sm:text-2xl font-semibold text-primary-foreground whitespace-nowrap">
            {formatFloatstring(stats.tvl, 2)} {tokenSymbol}
          </div>
          <div className="text-sm sm:text-md font-medium text-primary-foreground dark:text-primary-foreground">
            $ {formatFloatstring(stats.dollarTvl, 2)}
          </div>
        </div>
        <div className="flex flex-col col-span-1 items-center ">
          <Separator className="" orientation="vertical" />
        </div>
        <div className="flex flex-col col-span-4 items-center sm:col-span-3 md:col-span-4">
          <div className="text-xs sm:text-sm font-medium tracking-wider text-secondary-foreground dark:text-secondary-foreground">
            Current Yield
          </div>
          <div className="text-lg sm:text-2xl font-semibold text-primary-foreground  tracking-tighter">
            {formatFloatstring((parseFloat(stats.apy) * 100).toString(), 1)} %
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
