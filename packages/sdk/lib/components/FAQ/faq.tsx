import { TokenSlugEnums } from "@lib/constants";

type FAQItem = {
  question: string;
  answer: string | JSX.Element;
};

type FAQ = {
  [key in TokenSlugEnums]?: FAQItem[];
};

const generateFaq = (
  symbol: string,
  validatorName: string,
  unstakingPeriod: string
): FAQItem[] => {
  return [
    {
      question: `What is t${symbol}?`,
      answer: `t${symbol} is a transferrable, tokenized representation of your staked ${symbol} to ${validatorName}. It is a rebasing token, which automatically accrues rewards.`,
    },
    {
      question: `How to get t${symbol}?`,
      answer: `You can get t${symbol} by staking ${symbol} to ${validatorName} using the "Stake" tab in this widget.`,
    },
    {
      question: `Can I unstake t${symbol}?`,
      answer: (
        <>
          <p>
            Yes, you can unstake t{symbol} to get back your original {symbol}{" "}
            using one of the following methods:
          </p>
          <ul>
            <li>Unstake your tokens 1:1, but wait for the unstaking period</li>
            <li>
              Instantly swap your t{symbol} for {symbol} for a small fee
            </li>
          </ul>
        </>
      ),
    },
    {
      question: `How long does it take to unstake t${symbol}?`,
      answer: `The unstaking period for t${symbol} is ${unstakingPeriod}. After which you will be able to withdraw.`,
    },
    {
      question: `Is t${symbol} secure?`,
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
          Tenderize protocol is fully open-source and audited. Audit reports can
          be found{" "}
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
};

export const faq: FAQ = {
  [TokenSlugEnums.MATIC]: generateFaq("MATIC", "Stake Capital", "2-3 days"),
  [TokenSlugEnums.LIVEPEER]: generateFaq("LPT", "Stake Capital", "2-3 days"),
};
