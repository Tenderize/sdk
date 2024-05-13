import { ConnectKitButton } from "connectkit";
export const ConnectButton = () => {
  return (
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
            className="bg-primary text-primary-accent rounded-lg p-2 font-semibold cursor-pointer w-full"
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
  );
};
