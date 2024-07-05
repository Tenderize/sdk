import {
  useChainId,
  useTenderizeConfigStore,
  useTenderizer,
} from "@lib/config";
import { TOKENS, type TokenSlugEnums } from "@lib/constants";
import { useTenderizerData } from "@lib/hooks";
import { useValidatorProfile } from "@lib/hooks/useValidatorProfile";
import { useEffect } from "react";

interface ItemProps {
  item: {
    slug: TokenSlugEnums;
  };
}

export const LoadMetaData: React.FC<ItemProps> = ({ item }) => {
  const tenderizer = useTenderizer(item.slug);
  const chainId = useChainId(item.slug);
  const { data: tenderizerData } = useTenderizerData(tenderizer, chainId);
  const { profile } = useValidatorProfile(tenderizerData.validator);
  const { updateBranding, tokenMetadata } = useTenderizeConfigStore();

  useEffect(() => {
    if (profile && updateBranding) {
      const updatedData = {
        [item.slug]: {
          name:
            tokenMetadata?.[item.slug]?.name ||
            `${profile?.name}-t${TOKENS[item.slug].currency}` ||
            `t${TOKENS[item.slug].currency}`,
          avatar:
            tokenMetadata?.[item.slug]?.avatar ||
            profile?.avatar ||
            TOKENS[item.slug].img.token,
        },
      };
      updateBranding(updatedData);
    }
  }, [item.slug, profile !== null]);

  return [];
};
