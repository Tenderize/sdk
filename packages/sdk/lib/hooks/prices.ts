import { useQuery } from '@tanstack/react-query';

// Define TypeScript interface for the pair
type CoinID = "ethereum" | "the-graph" | "matic-network" | "livepeer";

// Utility function to fetch price with native fetch API
const fetchCoinPrice = async (coin: CoinID): Promise<number> => {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return (await response.json())[coin].usd;
};

// Custom hook to use the useQuery hook for fetching a specific coin's price
export const useCoinPrice = (coin: CoinID) => {
    const { data: price, isLoading, error } = useQuery({
        queryKey: ['coinPrice', coin],
        queryFn: () => fetchCoinPrice(coin),
        staleTime: 1000 * 60 * 5, // 5 minutes
    }
    );

    return { price, isLoading, error };
};


