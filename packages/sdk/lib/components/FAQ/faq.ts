import { TokenSlugEnums } from "@lib/constants/enums";

type FAQ = {
  [key in TokenSlugEnums]?: { question: string; answer: string }[];
};

export const faq: FAQ = {
  [TokenSlugEnums.MATIC]: [
    {
      question: "What is Matic?",
      answer: "Matic is a layer 2 scaling solution for Ethereum.",
    },
    {
      question: "What is the Matic token?",
      answer: "The Matic token is the native token of the Matic network.",
    },
  ],
  [TokenSlugEnums.LIVEPEER]: [
    {
      question: "What is Livepeer?",
      answer: "Livepeer is a decentralized video streaming network.",
    },
    {
      question: "What is the Livepeer token?",
      answer: "The Livepeer token is the native token of the Livepeer network.",
    },
  ],
};
