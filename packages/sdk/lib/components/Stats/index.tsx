import { useSelectedToken } from "@lib/hooks";
import { useTenderizerStats } from "@lib/hooks/stats";
import { formatAmount, formatFloatstring } from "@lib/utils/floats";
import type { FC } from "react";
import { Flex, Box } from '@radix-ui/themes'

type TenderizerStats = {
    tvl: string,
    apy: string
}

export const TenderizerStats: FC = () => {
    const { token, tenderizer } = useSelectedToken()

    const { stats, isLoading, error } = useTenderizerStats(tenderizer, token.chainId ?? 1)

    return <TenderizerStatsView tokenSymbol={token.currency} stats={stats} isLoading={isLoading} error={error} />
}

export const TenderizerStatsView: FC<{ tokenSymbol: string, stats: TenderizerStats, isLoading?: boolean, error?: Error | null }> = ({ tokenSymbol, stats, isLoading, error }) => {


    return (
        <Flex>
            <Box>
                <div className="text-center flex-1">
                    <div className="text-18-23 font-semibold text-primary-normal dark:text-light-white-80 ">
                        APY
                    </div>
                    <div className="grid grid-cols-2  font-semibold text-sm text-primary-normal dark:text-light-white-80 px-4">
                        <div className="text-right">
                            {formatFloatstring(
                                (Number(stats.apy) * 100).toString(),
                                2
                            )}
                            %
                        </div>
                    </div>
                </div>
            </Box>
            <Box>
                <div className="flex-1  text-center w-1/2">
                    <div className="text-18-23 font-semibold text-primary-normal dark:text-light-white-80 ">
                        TVL
                    </div>

                    <div className="grid grid-cols-4 text-sm font-semibold font-mono text-primary-normal dark:text-light-white-80 px-4">
                        <div className="col-span-1 text-left">
                            {tokenSymbol}
                        </div>
                        <div className="col-span-3 text-right">
                            {formatAmount(stats.tvl)}{' '}
                        </div>
                        <div className="col-span-1 text-left text-primary-normal dark:text-light-white-80">
                            {'$ '}
                        </div>
                        <div className="col-span-3 text-right">
                            {formatAmount(stats.tvl /*TODO: add conversion rate*/)}
                        </div>
                    </div>
                </div>
            </Box>
        </Flex>
    );
};
