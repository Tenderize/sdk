import { useMemo } from "react";

type FAQItem = {
  question: string;
  answer: string | JSX.Element;
};

export const useGenerateFaq = (
  symbol: string,
  validatorName: string,
  unstakingPeriod: string
): FAQItem[] => {
  const generatedFaq = useMemo(() => {
    console.log("inside useGenerateFaq useMemo", symbol);
    return [
      {
        question: `What is ${symbol}?`,
        answer: `${symbol} is a transferrable, tokenized representation of your staked ${symbol} to ${validatorName}. It is a rebasing token, which automatically accrues rewards.`,
      },
      {
        question: `How to get ${symbol}?`,
        answer: `You can get ${symbol} by staking ${symbol} to ${validatorName} using the "Stake" tab in this widget.`,
      },
      {
        question: `Can I unstake ${symbol}?`,
        answer: (
          <>
            <p>
              Yes, you can unstake t{symbol} to get back your original {symbol}{" "}
              using one of the following methods:
            </p>
            <ul>
              <li>
                Unstake your tokens 1:1, but wait for the unstaking period
              </li>
              <li>
                Instantly swap your t{symbol} for {symbol} for a small fee
              </li>
            </ul>
          </>
        ),
      },
      {
        question: `How long does it take to unstake ${symbol}?`,
        answer: `The unstaking period for ${symbol} is ${unstakingPeriod}. After which you will be able to withdraw.`,
      },
      {
        question: `Is ${symbol} secure?`,
        answer: (
          <p>
            t{symbol} is powered by the{" "}
            <a
              href="https://tenderize.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tenderize
            </a>{" "}
            protocol. There always exists a risk that there is a bug or
            vulnerability in the smart contracts. To mitigate this risk, the
            Tenderize protocol is fully open-source and audited. Audit reports
            can be found{" "}
            <a
              href="https://github.com/Tenderize/staking/tree/main/audits"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .{" "}
          </p>
        ),
      },
    ];
  }, [symbol, validatorName, unstakingPeriod]);

  return generatedFaq;
};
