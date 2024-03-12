import { type ComponentProps, type FC } from "react";
import type { Address } from "viem";

import { formatAddress } from "@lib/utils/global";

import { Avatar as AvatarRadix } from "@radix-ui/themes";
import makeBlockie from "ethereum-blockies-base64";

type AvatarRadixProps = ComponentProps<typeof AvatarRadix>;

interface Props extends AvatarRadixProps {
  address: Address;
}

export const AvatarWithAddress: FC<Props> = (props) => {
  const { address, size = "2", fallback = "0x", ...rest } = props;

  const src = address ? makeBlockie(address) : "";

  return (
    <AvatarRadix
      fallback={fallback}
      src={src}
      size={size}
      alt={formatAddress(address)}
      {...rest}
    />
  );
};
