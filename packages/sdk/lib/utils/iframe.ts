import type { Address } from "viem";
import { TokenSlugEnums } from "../constants/enums";

export enum TabEnum {
  STAKE = "stake",
  UNSTAKE = "unstake",
  SWAP = "swap",
}

export type TabConfig = {
  disabledTabs?: TabEnum[];
};

export type IframeTokenConfigMap = {
  [Key in TokenSlugEnums]?: Address;
};

type IframeConfigMap = IframeTokenConfigMap &
  TabConfig & { tokens?: TokenSlugEnums[] };

export const generateIframeQueryString = (
  configMap: IframeConfigMap
): string => {
  let query = "?";
  Object.entries(configMap).forEach(([key, value]) => {
    if (key !== "disabledTabs" && key && value) {
      query += `${key}=${value}&`;
    }
  });
  if (configMap.disabledTabs) {
    query += `disabledTabs=${configMap.disabledTabs.join(",")}&`;
  }
  if (configMap.tokens) {
    query += `tokens=${configMap.tokens.join(",")}&`;
  }

  // Remove the last '&' if present
  if (query.endsWith("&")) {
    query = query.slice(0, -1);
  }

  return query;
};

export const getIframeConfig = (
  queryString: string
): {
  disabledTabs: TabEnum[];
  tenderizers: IframeTokenConfigMap;
  tokens: TokenSlugEnums[] | [];
} | null => {
  const params = new URLSearchParams(queryString?.replace("?", ""));

  if (!params.size) {
    return null;
  }

  const configObject: {
    disabledTabs: TabEnum[];
    tenderizers: IframeTokenConfigMap;
    tokens: TokenSlugEnums[];
  } = {
    disabledTabs: [],
    tenderizers: {},
    tokens: [],
  };

  params.forEach((value, key) => {
    if (key === "disabledTabs") {
      configObject[key as "disabledTabs"] = value
        .split(",")
        .map(
          (tab: string) => TabEnum[tab.toUpperCase() as keyof typeof TabEnum]
        );
    }

    const keyInTokenSlugEnums =
      key.toUpperCase() as keyof typeof TokenSlugEnums;
    if (TokenSlugEnums[keyInTokenSlugEnums]) {
      // Check if key exists in TokenSlugEnums
      const tokenSlug = TokenSlugEnums[keyInTokenSlugEnums];
      configObject.tenderizers[tokenSlug] = value as Address;
      configObject.tokens.push(tokenSlug);
    }
  });

  return configObject;
};
