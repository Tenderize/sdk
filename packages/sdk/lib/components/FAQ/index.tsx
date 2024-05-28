import { useSelectedToken } from "@lib/contexts";
import { Accordion } from "../Accordion";
import { faq } from "./faq";

export const FAQ = () => {
  const token = useSelectedToken();
  const data = faq[token.slug];
  if (!data) {
    return null;
  }
  return (
    <div className="w-[95%] md:w-[650px] lg:w-[650px] ">
      <h2 className="text-primary-foreground text-2xl font-bold mb-4 text-center">
        Frequently Asked Questions
      </h2>
      <Accordion data={data} titleKey="question" contentKey="answer" />
    </div>
  );
};
