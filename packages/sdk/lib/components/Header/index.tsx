import { Cross2Icon, RowsIcon } from "@radix-ui/react-icons";
import { ConnectKitButton } from "connectkit";
import { useState, type FC } from "react";
import BrandingLogo from "./assets/stakeCapital.svg";

const NavData = [
  {
    title: "Services",
    href: "#",
  },
  {
    title: "Protocols",
    href: "#",
  },
  {
    title: "Contact Us",
    href: "#",
  },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="flex h-16 w-full items-center justify-between px-4 md:px-6 bg-card relative">
      <a className="flex items-center gap-2 " href="#">
        <img
          className="absolute top-[22px] left-[20px] "
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
    </header>
  );
};

const DesktopNavView = () => {
  return (
    <nav className="hidden items-center gap-6 md:flex ">
      {NavData.map((navItem) => (
        <a
          key={navItem.title}
          className="text-lg text-primary-foreground hover:underline hover:underline-offset-4"
          href={navItem.href}
        >
          {navItem.title}
        </a>
      ))}

      <ConnectKitButton.Custom>
        {({
          isConnected,
          isConnecting,
          show,

          truncatedAddress,
        }) => {
          return (
            <button
              onClick={show}
              className="bg-primary text-primary-accent rounded-lg p-2 font-semibold cursor-pointer"
            >
              {isConnecting && !isConnected
                ? "Connecting..."
                : isConnected
                ? truncatedAddress
                : "Connect Wallet"}
            </button>
          );
        }}
      </ConnectKitButton.Custom>
    </nav>
  );
};

const MobileNavView: FC<{ setIsMenuOpen: (a: boolean) => void }> = () => {
  return (
    <nav className="flex flex-col items-center gap-2 md:hidden absolute w-full bg-card z-10 rounded-b-lg left-0 top-[63px] transition-all pb-2 border-b shadow border-border">
      {NavData.map((navItem) => (
        <>
          <a
            key={navItem.title}
            className="text-lg text-primary-foreground hover:underline hover:underline-offset-4"
            href={navItem.href}
          >
            {navItem.title}
          </a>
          <hr className="w-full border-t border-border" />
        </>
      ))}
      <ConnectKitButton.Custom>
        {({ isConnected, isConnecting, show, truncatedAddress }) => {
          return (
            <button
              onClick={show}
              className="bg-primary text-primary-accent rounded-lg p-2 font-semibold cursor-pointer"
            >
              {isConnecting && !isConnected
                ? "Connecting..."
                : isConnected
                ? truncatedAddress
                : "Connect Wallet"}
            </button>
          );
        }}
      </ConnectKitButton.Custom>
    </nav>
  );
};
