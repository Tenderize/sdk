import { useChain } from '@lib/config/store';
import { type FC } from 'react';
import { useChainId, useChains, useSwitchChain } from 'wagmi';
import { Button } from '@lib/components'
import { CHAINS } from '@lib/constants';
type ChainId = number;

type SwitchChainButtonProps = { requiredChainId: ChainId; children?: React.ReactNode };

export const SwitchChainButton: FC<SwitchChainButtonProps> = ({
  requiredChainId,
  children,
}) => {
  const currentChainId = useChainId();
  const { switchChain, chains, status } = useSwitchChain();

  const requiredChain = chains.find((chain) => chain.id === requiredChainId);
  const requiredChainData = CHAINS[requiredChainId]
  if (!requiredChain) {
    console.error(`Chain with ID ${requiredChainId} not found in myChains`);
    return null;
  }

  if (currentChainId === requiredChainId) {
    return <>{children}</>;
  }

  return (
    <Button
      size="3"
      style={{ width: "100%" }}
      variant="solid"
      onClick={() => {
        switchChain?.({ chainId: requiredChainId });
      }}
    >
      <img width={30} src={requiredChainData.iconUrl} alt={requiredChain.name} />
      {`${status === "pending" ? 'Switching to' : 'Switch to'} ${requiredChain.name
        }`}
    </Button>
  );
};
