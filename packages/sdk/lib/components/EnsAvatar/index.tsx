import { useValidatorProfile } from "@lib/hooks/useValidatorProfile";
import { formatAddress } from "@lib/utils/global";
import makeBlockie from "ethereum-blockies-base64";
import { useCallback, type FC } from "react";
import type { Address } from "viem";

interface Props {
  address: Address;
  textSize?: string;
  size?: number;
}

export const EnsAvatar: FC<Props> = (props) => {
  const { address, textSize = "3", size = 20 } = props;
  const { profile } = useValidatorProfile(props.address);

  const renderAvatar = useCallback(() => {
    if (!address) return null;

    const hash = address;

    const imageProps = {
      width: size,
      height: size,
    };

    return (
      <div
        className="text-primary-foreground"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <img
          src={
            profile?.avatar
              ? profile?.avatar
              : typeof hash === "string"
              ? makeBlockie(hash)
              : ""
          }
          className="rounded-full"
          alt={address as string}
          {...imageProps}
        />
      </div>
    );
  }, [address, profile?.avatar, size]);

  return (
    <span className="flex items-center gap-1.5">
      {renderAvatar()}

      <div
        className={`${textSize}font-medium truncate max-w-[240px] text-primary-foreground`}
      >
        {profile?.name || formatAddress(address || "0x0")}
      </div>
    </span>
  );
};
