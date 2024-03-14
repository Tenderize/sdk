import { COINGECKO_KEYS } from "@lib/constants";

import { Currency } from "@lib/constants/enums";
import type { CurrencyRates } from "@lib/types/global";
import { useQuery } from "@tanstack/react-query";

export const useCurrency = () => {
  const {
    data: currencies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["currency"],
    queryFn: async () => {
      const ids = Object.values(COINGECKO_KEYS);
      const currencies = Object.values(Currency);
      try {
        const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(
          ","
        )}&vs_currencies=${currencies.join(",")}`;
        const fetchResponse = await fetch(apiUrl);
        const data = await fetchResponse.json();
        return transformApiResponse(data as { [key: string]: CurrencyRates });
      } catch (err) {
        console.log(err);
      }
    },
  });
  return { currencies, isLoading, error };
};

function transformApiResponse(apiResponse: { [key: string]: CurrencyRates }) {
  const transformedResponse: { [key: string]: CurrencyRates } = {};

  // Map each key in the API response to its corresponding StakedSlugEnums key
  Object.entries(apiResponse).forEach(([key, value]) => {
    // Find the StakedSlugEnums key that matches the current API response key
    const enumKey = Object.keys(COINGECKO_KEYS).find(
      (enumKey) =>
        COINGECKO_KEYS[enumKey as keyof typeof COINGECKO_KEYS] === key
    );

    if (enumKey) {
      // If a matching enum key is found, use the enum value as the new key
      transformedResponse[enumKey] = value;
    }
  });

  return transformedResponse;
}
