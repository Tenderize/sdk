import { useSelectedToken } from "@lib/contexts";
import { useCoinPrice } from "@lib/hooks/prices";
import { COINGECKO_KEYS } from "@lib/types";
import { cn } from "@lib/utils";
import { formatFloatstring } from "@lib/utils/floats";
import { type CSSProperties, type FC, type ReactNode } from "react";

interface Props {
  placeholder?: string;
  icon?: ReactNode;
  value?: string;
  handleChange?: (event: string) => void;
  max?: string;
  style?: CSSProperties;
  className?: string;
}

export const OutputField: FC<Props> = ({
  placeholder = "Enter amount",
  icon,
  value,
  style,
  className,
  ...rest
}) => {
  const token = useSelectedToken();
  const { price } = useCoinPrice(COINGECKO_KEYS[token.slug]);
  const dollarPrice = ((price || 0) * Number(value)).toString();
  return (
    <div className="flex flex-col">
      <div
        className="flex gap-2 items-center justify-between text-primary-foreground relative"
        {...rest}
        style={{
          ...style,
          pointerEvents: "none",
          padding: "10px 10px 10px 0px",
        }}
      >
        <input
          className={cn(className)}
          value={value}
          placeholder={placeholder}
          defaultValue={value}
          style={{ ...style }}
          {...rest}
        />
        {icon && (
          <span className="absolute top-[20px] right-[26px]">{icon}</span>
        )}
      </div>
      {value && Number(value) > 0 && (
        <span className="text-sm pl-[14px] text-secondary-foreground font-semibold">
          ${formatFloatstring(dollarPrice, 2)}
        </span>
      )}
    </div>
  );
};
