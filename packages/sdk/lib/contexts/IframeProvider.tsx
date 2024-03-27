import { useTenderizeConfigStore } from "@lib/config/store";
import type { IframeTokenConfigMap, TabEnum } from "@lib/hooks";
import type { TenderizeConfig } from "@lib/types";
import { useEffect, type FC } from "react";

type iframeConfig = {
  disabledTabs: TabEnum[];
  tenderizers: IframeTokenConfigMap;
};

export const IframeProvider: FC<{
  config: TenderizeConfig;
  iframeConfig: iframeConfig;
}> = ({ config, iframeConfig }) => {
  // This provider change the config according to the Iframe query data
  const { setConfig, setActiveTabs, activeTabs } = useTenderizeConfigStore();
  useEffect(() => {
    const { tenderizers: iframeTenderizers, disabledTabs } = iframeConfig;

    //change the tenderizers according to the query string data
    if (Object.keys(iframeTenderizers).length !== 0) {
      config.tenderizers = iframeTenderizers;
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
