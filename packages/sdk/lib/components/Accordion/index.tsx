import * as AccordionRadix from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import type { FC } from "react";

interface Props {
  data: { question: string; answer: string }[];
}

export const Accordion: FC<Props> = ({ data }) => (
  <AccordionRadix.Root
    className="bg-background w-full rounded-lg"
    type="single"
    collapsible
  >
    {data.map((item, index) => (
      <AccordionRadix.Item
        key={index}
        className="rounded-lg border border-border mb-2 hover:border-primary transition duration-700 ease-in-out px-4"
        value={`item-${index}`}
      >
        <AccordionRadix.Header
          className="flex cursor-pointer"
          style={{ cursor: "pointer" }}
        >
          <AccordionRadix.Trigger
            style={{ cursor: "pointer" }}
            className="text-primary w-full group flex h-[45px] flex-1 cursor-default items-center justify-between cursor-pointer "
            aria-hidden
          >
            {item.question}
            <ChevronDownIcon
              className="text-primary ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
              aria-hidden
            />
          </AccordionRadix.Trigger>
        </AccordionRadix.Header>
        <AccordionRadix.Content className="data-[state=open]:text-primary-foreground text-secondary-foreground data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up pb-4 transition-transform duration-300">
          {item.answer}
        </AccordionRadix.Content>
      </AccordionRadix.Item>
    ))}
  </AccordionRadix.Root>
);
