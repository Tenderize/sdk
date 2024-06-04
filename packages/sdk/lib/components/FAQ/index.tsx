import { useTokenMetadataByToken } from "@lib/config/store";
import { TokenSlugEnums } from "@lib/constants";
import { useSelectedToken } from "@lib/contexts";
import { Accordion } from "../Accordion";
import { useGenerateFaq } from "./faq";

const FaqConfig: Partial<
  Record<TokenSlugEnums, { validatorName: string; unstakingPeriod: string }>
> = {
  [TokenSlugEnums.MATIC]: {
    validatorName: "Stake Capital",
    unstakingPeriod: "2-3 days",
  },
  [TokenSlugEnums.LIVEPEER]: {
    validatorName: "Livepeer Capital",
    unstakingPeriod: "2-3 days",
  },
} as const;

export const FAQ = () => {
  const token = useSelectedToken();
  const { validatorName, unstakingPeriod } =
    FaqConfig[token?.slug as TokenSlugEnums] || {};
  const { name: symbol } = useTokenMetadataByToken(token);
  console.log("symbol", symbol);

  const data = useGenerateFaq(
    symbol,
    validatorName as string,
    unstakingPeriod as string
  );
  if (!data) {
    return null;
  }
  return (
    <div className="w-full md:w-[650px] lg:w-[650px] ">
      <h2 className="text-primary-foreground text-2xl font-bold mb-4 text-center">
        Frequently Asked Questions
      </h2>
      <Accordion data={data} titleKey="question" contentKey="answer" />
    </div>
  );
};
