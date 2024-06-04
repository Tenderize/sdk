import * as AccordionRadix from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface Props<T> {
  data: T[];
  titleKey: keyof T;
  contentKey: keyof T;
}

export const Accordion = <T,>({ data, titleKey, contentKey }: Props<T>) => (
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
            className="text-primary w-full group flex h-[45px] flex-1 cursor-default items-center justify-between cursor-pointer text-left "
            aria-hidden
          >
            {item[titleKey] as React.ReactNode}
            <ChevronDownIcon
              className="text-primary  transition-transform duration-300 group-data-[state=open]:rotate-180"
              aria-hidden
            />
          </AccordionRadix.Trigger>
        </AccordionRadix.Header>
        <AccordionRadix.Content className="text-left data-[state=open]:text-primary-foreground text-secondary-foreground data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up pb-4 transition-transform duration-300">
          {item[contentKey] as React.ReactNode}
        </AccordionRadix.Content>
      </AccordionRadix.Item>
    ))}
  </AccordionRadix.Root>
);
