import { ArrowDownIcon } from "@radix-ui/react-icons";
import type { FC } from "react";

interface CalloutlayoutProps {
  callOutFirstChildren: React.ReactNode;
  callOutSecondChildren: React.ReactNode;
  callOutActionChildren: React.ReactNode;
}

export const CalloutLayout: FC<CalloutlayoutProps> = (props) => {
  const { callOutFirstChildren, callOutSecondChildren, callOutActionChildren } =
    props;
  return (
    <div className="relative h-max-content">
      <div
        className="absolute bg-callout-soft rounded-lg"
        style={{
          left: "50%",
          right: "50%",
          top: "43%",
          transform: "translate(-50%, -50%)",
          width: "max-content",
          borderRadius: "10px",
          border: "8px solid #fff",
        }}
      >
        <ArrowDownIcon
          width="25"
          height="25"
          className="text-callout-foreground"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex p-3 bg-callout-soft rounded-lg text-callout-foreground">
          {callOutFirstChildren}
        </div>
        <div className="flex p-3 bg-callout-soft rounded-lg text-callout-foreground">
          {callOutSecondChildren}
        </div>
        <div className="w-full justify-center">{callOutActionChildren}</div>
      </div>
    </div>
  );
};
