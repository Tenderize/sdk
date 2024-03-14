import { useSelectedToken } from "@lib/contexts";
import { useTenderizerStats, useTenderizerData } from "@lib/hooks";
import { formatFloatstring } from "@lib/utils/floats";
import type { FC } from "react";
import { useTenderizer, useChainId } from "@lib/config/store";
import { AvatarImage, AvatarFallback, Avatar } from "@lib/components/ui/avatar"
import { CardHeader, CardContent, Card } from "@lib/components/ui/card"
import { Separator } from "@lib/components/ui/separator"
import { useCoinPrice } from "@lib/hooks/prices";
import { COINGECKO_KEYS } from "@lib/types";
import type { Address } from "viem";

type TenderizerStats = {
    tvl: string,
    apy: string
    dollarTvl: string;
}

export const TenderizerStats: FC = () => {
    const token = useSelectedToken()
    const tenderizer = useTenderizer(token.slug)
    const chainId = useChainId(token.slug)

    const { stats, isLoading, error } = useTenderizerStats(tenderizer, chainId)
    const { price } = useCoinPrice(COINGECKO_KEYS[token.slug])
    const dollarTvl = ((price || 0) * stats.tvl).toString()

    const { data: tenderizerData } = useTenderizerData(tenderizer, chainId)

    return <TenderizerStatsView tokenSymbol={token.currency} stats={{ ...stats, dollarTvl }} validator={tenderizerData.validator} isLoading={isLoading} error={error} />
}

export const TenderizerStatsView: FC<{ tokenSymbol: string, stats: TenderizerStats, validator: Address, isLoading?: boolean, error?: Error | null }> = ({ tokenSymbol, stats, validator, isLoading, error }) => {
    isLoading; error;
    return (
        <Card className="w-full max-w-[full px-4 bg-white dark:bg-gray-900 rounded-lg">
            <CardHeader className="flex flex-col items-center">
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage alt="User" src="/placeholder-avatar.jpg" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{validator}</span>
                </div>
            </CardHeader>
            <Separator className="my-4" orientation="horizontal" />

            <CardContent className="grid grid-cols-9 gap-6 text-center">
                <div className="flex flex-col col-span-4 items-center">
                    <div className="text-sm font-medium tracking-wider text-gray-500 dark:text-gray-400">Value Locked</div>
                    <div className="text-2xl font-semibold text-primary whitespace-nowrap">{formatFloatstring(stats.tvl, 2)} {tokenSymbol}</div>
                    <div className="text-md font-medium text-gray-400 dark:text-gray-400">$ {formatFloatstring(stats.dollarTvl, 2)}</div>
                </div>
                <div className="flex flex-col col-span-1 items-center">
                    <Separator className="" orientation="vertical" />
                </div>
                <div className="flex flex-col col-span-4 items-center">
                    <div className="text-sm font-medium tracking-wider text-gray-500 dark:text-gray-400">Current Yield</div>
                    <div className="text-2xl font-semibold tracking-tighter">{formatFloatstring((parseFloat(stats.apy) * 100).toString(), 1)} %</div>
                </div>
            </CardContent>
        </Card>
    )
};
