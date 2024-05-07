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
    <div className="flex flex-col gap-2">
      <span
        className="cursor-pointer text-right max-w-max-content text-sm text-secondary-foreground font-semibold"
        onClick={handleMaxButtonClick}
      >
        Max: {max}
      </span>
    </div>
  );
};

export default MaxBalanceButton;
