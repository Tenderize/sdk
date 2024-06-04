import { Cross2Icon } from "@radix-ui/react-icons";
import { useState, type FC } from "react";
import { ConnectButton } from "../ConnectButton";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className=" w-full  bg-midnight h-[64px]  ">
      <div className="flex h-[64px]  container items-center justify-end   bg-midnight text-white px-4 max-w-[1200px] ">
        <DesktopNavView />
        {isMenuOpen && <MobileNavView setIsMenuOpen={setIsMenuOpen} />}
        <button
          className="flex-col flex items-center justify-center items-center whitespace-nowrap gap-1
        rounded-full text-sm font-medium ring-offset-background transition-colors
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent
        text-primary h-10 w-10 md:hidden"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {!isMenuOpen ? (
            <>
              <div className="w-[14px] h-[2px] bg-midnight rounded-md  transition-transform duration-150 ease-linear"></div>
              <div className="w-[14px] h-[2px] bg-midnight rounded-md  transition-transform duration-150 ease-linear"></div>
              <div className="w-[14px] h-[2px] bg-midnight rounded-md  transition-transform duration-150 ease-linear"></div>
            </>
          ) : (
            <Cross2Icon className="w-[25px] h-[22px] transition duration-150 ease-out text-midnight font-bold" />
          )}
        </button>
      </div>
    </header>
  );
};

const DesktopNavView = () => {
  return (
    <nav className="hidden items-center md:flex gap-3 ">
      <ConnectButton />
    </nav>
  );
};

const MobileNavView: FC<{ setIsMenuOpen: (a: boolean) => void }> = () => {
  return (
    <nav
      className="p-2 pt-8 flex flex-col items-center gap-6 md:hidden absolute w-full  z-10
    rounded-b-lg left-0 top-[63px] transition-all pb-2 border-b shadow border-border bg-midnight h-[90vh]"
    >
      <ConnectButton />
    </nav>
  );
};
