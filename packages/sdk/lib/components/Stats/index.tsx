import { useSelectedToken } from "@lib/hooks";
import { useTenderizerStats } from "@lib/hooks/stats";
import { formatAmount, formatFloatstring } from "@lib/utils/floats";
import type { FC } from "react";
import { Grid, Flex, Box, Text } from '@radix-ui/themes'

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
        <Grid columns="2" gap="2" width="auto">
            <Box>

                <Text weight="medium">
                    APY
                </Text>

            </Box>
            <Box>
                <div className="text-right">
                    {formatFloatstring(
                        (Number(stats.apy) * 100).toString(),
                        2
                    )}
                    %
                </div>
            </Box>
            <Box>
                <Text weight="medium">
                    TVL
                </Text>
            </Box>
            <Box>
                <Flex gap="2">
                    <Text align="left">
                        {tokenSymbol}
                    </Text>
                    <Text align="right">
                        {formatAmount(stats.tvl)}{' '}
                    </Text>
                </Flex>
                <Flex gap="2">
                    <Text size="2" align="left">
                        {'$ '}
                    </Text>
                    <Text size="2" align="right">
                        {formatAmount(stats.tvl /*TODO: add conversion rate*/)}
                    </Text>
                </Flex>
            </Box>
        </Grid>
    );
};
