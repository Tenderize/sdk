import { VALIDATOR_PROFILES } from "@lib/constants/validators";
import { createPublicClient, getAddress, http, type Address } from "viem";
import { mainnet } from "viem/chains";
import type { GetEnsAvatarReturnType } from "viem/ens";
import { normalize } from "viem/ens";

export type FetchEnsAvatarArgs = {
  /** ENS name */
  name: string;
};

export type ValidatorProfile = {
  address: Address;
  name: string;
  avatar: string;
};

export type FetchEnsAvatarResult = GetEnsAvatarReturnType;

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(
    "https://eth-mainnet.g.alchemy.com/v2/trD7ShUu0k9JzVNt6HGZL-NKxWByZeYF"
  ), // TODO: make env var
});
export type FetchEnsNameArgs = {
  address: Address;
};

export type FetchEnsNameResult = string | null;

export async function fetchEnsName({
  address,
}: FetchEnsNameArgs): Promise<FetchEnsNameResult> {
  return publicClient.getEnsName({
    address: getAddress(address),
  });
}

export async function fetchEnsAvatar({
  name,
}: FetchEnsAvatarArgs): Promise<FetchEnsAvatarResult> {
  const { normalize } = await import("viem/ens");
  const avatar = await publicClient.getEnsAvatar({ name: normalize(name) });
  return avatar;
}

export async function fetchAddressForENS(name: string): Promise<Address> {
  const ensAddress = await publicClient.getEnsAddress({
    name: normalize(name),
  });
  return ensAddress?.toLowerCase() as Address;
}

export const getProfile = async (
  address: Address
): Promise<ValidatorProfile> => {
  if (VALIDATOR_PROFILES[address]) {
    return VALIDATOR_PROFILES[address];
  }
  const name = (await fetchEnsName({ address: getAddress(address) })) || "";
  const avatar = name ? await fetchEnsAvatar({ name }) : "";
  return {
    address: address,
    name,
    avatar: avatar || "",
  };
};
