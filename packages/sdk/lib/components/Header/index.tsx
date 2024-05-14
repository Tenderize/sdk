import { Cross2Icon, RowsIcon } from "@radix-ui/react-icons";
import { useState, type FC } from "react";
import { ConnectButton } from "../ConnectButton";
import DarkModeBrandingLogo from "./assets/dark-stakeCapital.png";

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
    <header className="flex h-16 w-full items-center justify-between px-4 md:px-6 bg-midnight text-white relative">
      <a className="flex items-center gap-2 " href="#">
        <img
          className="absolute top-[22px] left-[90px] sm:left-[135px] "
          alt="branding"
          height={20}
          width={250}
          src={DarkModeBrandingLogo}
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
    </header>
  );
};

const DesktopNavView = () => {
  return (
    <nav className="hidden items-center gap-6 md:flex ">
      {NavData.map((navItem) => (
        <a
          key={navItem.title}
          className={`${
            navItem.id === 3 &&
            "border-2 border-primary text-primary px-4 py-1 rounded-lg "
          }text-lg text-white hover:underline hover:underline-offset-4 flex flex-grow-0 flex-shrink-0`}
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
