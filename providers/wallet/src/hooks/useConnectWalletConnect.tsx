import { useCallback } from "react";
import { useIntl } from "react-intl";
import { useSnackbar } from "notistack";

import { useWallet } from "../provider";
import { TConnectors } from "../connectors/types";
import { walletConnect } from "../connectors/wallet-connect";

export interface IUseConnectWalletConnect {
  onClick?: () => void;
}

export const useConnectWalletConnect = (props: IUseConnectWalletConnect) => {
  const { onClick } = props;

  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const { setActiveConnector, network, connectCallback } = useWallet();

  return useCallback(() => {
    return connectCallback(async () => {
      return walletConnect
        .activate(network ? network.chainId : undefined)
        .then(() => {
          setActiveConnector(TConnectors.WALLETCONNECT);
          onClick && onClick();
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.error("error", e);

          setActiveConnector(null);

          if (e && e.code === 4001) {
            enqueueSnackbar(formatMessage({ id: "snackbar.rejectedByUser" }), { variant: "warning" });
          } else {
            enqueueSnackbar((e && e.message) || formatMessage({ id: "snackbar.error" }), { variant: "error" });
          }
        });
    });
  }, [network]);
};