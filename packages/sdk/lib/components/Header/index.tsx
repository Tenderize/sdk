import { Cross2Icon, RowsIcon } from "@radix-ui/react-icons";
import { useState, type FC } from "react";
import { ConnectButton } from "../ConnectButton";
import BrandingLogo from "./assets/stakeCapital.avif";

const NavData = [
  {
    id: 1,
    title: "Services",
    href: "#",
  },
  {
    id: 2,
    title: "Protocols",
    href: "#",
  },
  {
    id: 3,
    title: "Contact Us",
    href: "#",
  },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className=" w-full  bg-midnight h-[64px]  ">
      <div className="flex h-[64px]  container items-center justify-between   bg-midnight text-white px-4 max-w-[1200px] ">
        <a className="flex items-center gap-2 hover:opacity-70 " href="#">
          <img
            className=""
            alt="branding"
            height={20}
            width={250}
            src={BrandingLogo}
          ></img>
        </a>
        <DesktopNavView />
        {isMenuOpen && <MobileNavView setIsMenuOpen={setIsMenuOpen} />}
        <button
          className="inline-flex items-center justify-center whitespace-nowrap
        rounded-md text-sm font-medium ring-offset-background transition-colors
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent
        text-primary h-10 w-10 md:hidden"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {!isMenuOpen ? (
            <RowsIcon className="w-[25px] h-[22px]" />
          ) : (
            <Cross2Icon className="w-[25px] h-[22px]" />
          )}
        </button>
      </div>
    </header>
  );
};

const DesktopNavView = () => {
  return (
    <nav className="hidden items-center md:flex gap-3 ">
      {NavData.map((navItem) => (
        <a
          key={navItem.title}
          className={`${
            navItem.id === 3 &&
            "border-2 border-primary text-primary px-4 py-1 rounded-lg"
          } text-sm font-bold min-w-min text-white overflow-hidden inline-block whitespace-nowrap
            px-5 py-3  border border-transparent min-h-11 rounded-md shadow-button text-center
            select-none cursor-pointer transform hover:-translate-y-[2px] hover:bg-secondary-500 transition duration-150 ease-out hover:ease-in`}
          href={navItem.href}
        >
          {navItem.title}
        </a>
      ))}

      <ConnectButton />
    </nav>
  );
};

const MobileNavView: FC<{ setIsMenuOpen: (a: boolean) => void }> = () => {
  return (
    <nav className="p-2 flex flex-col items-center gap-2 md:hidden absolute w-full bg-card z-10 rounded-b-lg left-0 top-[63px] transition-all pb-2 border-b shadow border-border">
      {NavData.map((navItem) => (
        <>
          <a
            key={navItem.title}
            className={`${
              navItem.id === 3 &&
              "border-2 border-primary text-primary px-4 py-1 rounded-lg "
            }text-lg text-primary-foreground hover:underline hover:underline-offset-4"
            href={navItem.href`}
          >
            {navItem.title}
          </a>
          <hr className="w-full border-t border-border" />
        </>
      ))}
      <ConnectButton />
    </nav>
  );
};
