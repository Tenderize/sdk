import { cn } from "@lib/utils";
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
  return (
    <div
      className="flex gap-2 items-center justify-between"
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
      {icon && <span>{icon}</span>}
    </div>
  );
};
