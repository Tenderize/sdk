import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
export const ConnectButton = () => {
  const { isConnected } = useAccount();
  return (
    <div
      className={`${
        isConnected && "connected-kit"
      } connect-kit w-full flex justify-center transform hover:-translate-y-[2px] transition duration-150 ease-out hover:ease-in`}
    >
      <ConnectKitButton showBalance />
    </div>
  );
};
export const CustomConnectButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, truncatedAddress }) => {
        return (
          <>
            <button
              onClick={show}
              className="bg-primary text-primary-accent rounded-lg p-2 font-semibold cursor-pointer w-full"
            >
              {isConnecting && !isConnected
                ? "Connecting..."
                : isConnected
                ? truncatedAddress
                : "Connect Wallet"}
            </button>
          </>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
