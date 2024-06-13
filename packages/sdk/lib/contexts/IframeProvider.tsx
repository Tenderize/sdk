import { useTenderizeConfigStore } from "@lib/config/store";
import type { TokenSlugEnums } from "@lib/constants";
import type { IframeTokenConfigMap, TabEnum } from "@lib/hooks";
import type { TenderizeConfig } from "@lib/types";
import { useEffect, type FC } from "react";

type iframeConfig = {
  disabledTabs: TabEnum[];
  tenderizers: IframeTokenConfigMap;
  tokens: TokenSlugEnums[] | [];
};

export const IframeProvider: FC<{
  config: TenderizeConfig;
  iframeConfig: iframeConfig;
}> = ({ config, iframeConfig }) => {
  // This provider change the config according to the Iframe query data
  const { setConfig, setActiveTabs, activeTabs, setTokens } =
    useTenderizeConfigStore();
  useEffect(() => {
    const {
      tenderizers: iframeTenderizers,
      disabledTabs,
      tokens,
    } = iframeConfig;
    //change the tenderizers according to the query string data
    if (Object.keys(iframeTenderizers).length !== 0) {
      config.tenderizers = iframeTenderizers;
      if (config?.tokens?.length !== 0) {
        setTokens(tokens);
        config.tokens = tokens;
      }
      setConfig(config);
    }

    //change the active tabs according to the disabled tabs
    if (disabledTabs.length !== 0) {
      const tabs = activeTabs.filter(
        (tab) => !iframeConfig.disabledTabs.includes(tab)
      );
      setActiveTabs(tabs);
    }
  }, [iframeConfig.disabledTabs, iframeConfig.tenderizers]);

  return null;
};
