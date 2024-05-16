import { Cross2Icon } from "@radix-ui/react-icons";
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
      {NavData.map((navItem) => (
        <a
          key={navItem.title}
          className={`${
            navItem.id === 3 &&
            "border-2 border-white text-white px-4 py-1 rounded-sm flex items-center"
          } text-sm font-bold min-w-min text-white overflow-hidden inline-block whitespace-nowrap
            px-5 py-3  h-[44px] rounded-md shadow-button text-center
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
    <nav
      className="p-2 pt-8 flex flex-col items-center gap-6 md:hidden absolute w-full  z-10
    rounded-b-lg left-0 top-[63px] transition-all pb-2 border-b shadow border-border bg-midnight h-[90vh]"
    >
      {NavData.map((navItem) => (
        <>
          <a
            key={navItem.title}
            className={`${
              navItem.id === 3 &&
              "border-2 border-white text-primary px-4 py-2 rounded-sm "
            } text-sm font-bold text-white  w-[120px]"
            href={navItem.href`}
          >
            {navItem.title}
          </a>
        </>
      ))}
      <ConnectButton />
    </nav>
  );
};
