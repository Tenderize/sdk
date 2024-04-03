import { Avatar, AvatarFallback, AvatarImage } from "@lib/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@lib/components/ui/card";
import { Separator } from "@lib/components/ui/separator";
import { useChainId, useTenderizer } from "@lib/config/store";
import { useSelectedToken } from "@lib/contexts";
import { useTenderizerData, useTenderizerStats } from "@lib/hooks";
import { useCoinPrice } from "@lib/hooks/prices";
import { COINGECKO_KEYS } from "@lib/types";
import { formatFloatstring } from "@lib/utils/floats";
import { formatAddress } from "@lib/utils/global";
import type { FC } from "react";
import type { Address } from "viem";

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
}> = ({ tokenSymbol, stats, validator, isLoading, error }) => {
  isLoading;
  error;
  return (
    <Card className="w-full max-w-full px-3 bg-white dark:bg-gray-900 rounded-lg mb-3">
      <CardHeader className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <Avatar className="mb-2 sm:mb-0">
            <AvatarImage alt="User" src="/placeholder-avatar.jpg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-primary">
            {formatAddress(validator)}
          </span>
        </div>
      </CardHeader>
      <Separator className="my-4" orientation="horizontal" />

      <CardContent className="grid grid-cols-9 gap-6 text-center">
        <div className="flex flex-col col-span-4 items-center sm:col-span-3 md:col-span-4">
          <div className="text-xs sm:text-sm font-medium tracking-wider text-secondary dark:text-secondary">
            Value Locked
          </div>
          <div className="text-lg sm:text-2xl font-semibold text-primary whitespace-nowrap">
            {formatFloatstring(stats.tvl, 2)} {tokenSymbol}
          </div>
          <div className="text-sm sm:text-md font-medium text-destructive dark:text-destructive">
            $ {formatFloatstring(stats.dollarTvl, 2)}
          </div>
        </div>
        <div className="flex flex-col col-span-1 items-center ">
          <Separator className="" orientation="vertical" />
        </div>
        <div className="flex flex-col col-span-4 items-center sm:col-span-3 md:col-span-4">
          <div className="text-xs sm:text-sm font-medium tracking-wider text-secondary dark:text-secondary">
            Current Yield
          </div>
          <div className="text-lg sm:text-2xl font-semibold text-primary  tracking-tighter">
            {formatFloatstring((parseFloat(stats.apy) * 100).toString(), 1)} %
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
