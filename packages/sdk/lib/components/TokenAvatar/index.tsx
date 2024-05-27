import { useValidatorProfile } from "@lib/hooks/useValidatorProfile";

import { useCallback, useEffect, useState, type FC } from "react";
import type { Address } from "viem";

interface Props {
  address: Address;
  imgUrl?: string;
  defaultUrl: string;
  size?: number;
}

export const TokenAvatar: FC<Props> = (props) => {
  const { address, size = 20, imgUrl, defaultUrl } = props;
  const { profile } = useValidatorProfile(address?.toLowerCase() as Address);
  const [imgSrc, setImgSrc] = useState<string>(defaultUrl);

  useEffect(() => {
    if (imgUrl) {
      setImgSrc(imgUrl);
    }
  }, [imgUrl, setImgSrc]);

  const renderAvatar = useCallback(() => {
    if (!address) return null;

    const imageProps = {
      width: size,
      height: size,
    };

    return (
      <img
        src={imgSrc}
        onError={() => {
          if (profile?.avatar) {
            setImgSrc(profile.avatar);
            return;
          }
          setImgSrc(defaultUrl);
        }}
        className="rounded-full"
        alt={address as string}
        {...imageProps}
      />
    );
  }, [address, defaultUrl, imgSrc, profile?.avatar, size]);

  return <span className="flex items-center gap-1.5">{renderAvatar()}</span>;
};
