import { ConnectKitButton } from "connectkit";
export const ConnectButton = () => {
  return (
    <div className="connect-kit w-full flex justify-center">
      <ConnectKitButton showBalance />
    </div>
  );
};
export const CustomConnectButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, truncatedAddress, ...rest }) => {
        console.log("rest", rest);
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
