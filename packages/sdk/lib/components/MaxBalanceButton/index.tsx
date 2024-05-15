import { formatFloatstring } from "@lib/utils/floats";
import React from "react";

interface Props {
  max: string;
  handleInputChange: (value: string) => void;
}

export const MaxBalanceButton: React.FC<Props> = ({
  handleInputChange,
  max,
}) => {
  const handleMaxButtonClick = () => {
    handleInputChange(max);
  };

  return (
    <div className="flex gap-2">
      <span className="text-sm text-secondary-foreground font-semibold">
        Balance: {formatFloatstring(max, 3)}
      </span>
      <span
        onClick={handleMaxButtonClick}
        className="text-sm text-secondary-foreground hover:text-primary cursor-pointer  "
      >
        Max
      </span>
    </div>
  );
};

export default MaxBalanceButton;
