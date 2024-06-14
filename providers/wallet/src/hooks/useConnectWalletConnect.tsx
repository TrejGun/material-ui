import { useCallback } from "react";
import { useIntl } from "react-intl";
import { enqueueSnackbar } from "notistack";

import { TConnectors, useAppDispatch, useAppSelector, walletActions } from "@gemunion/redux";

import { useWallet } from "../provider";
import { walletConnect } from "../connectors/wallet-connect";

export interface IUseConnectWalletConnect {
  onClick: () => Promise<void>;
}

/* javascript-obfuscator:disable */
const WALLET_CONNECT_DEFAULT_CHAIN_ID = Number(process.env.WALLET_CONNECT_DEFAULT_CHAIN_ID);
/* javascript-obfuscator:enable */

export const useConnectWalletConnect = (props: IUseConnectWalletConnect) => {
  const { onClick } = props;

  const { formatMessage } = useIntl();

  const { network } = useAppSelector(state => state.wallet);
  const { setActiveConnector } = walletActions;
  const dispatch = useAppDispatch();
  const { connectCallback } = useWallet();

  return useCallback(() => {
    return connectCallback(async () => {
      return walletConnect
        .activate(network ? network.chainId : WALLET_CONNECT_DEFAULT_CHAIN_ID)
        .then(() => {
          dispatch(setActiveConnector(TConnectors.WALLETCONNECT));
          return onClick();
        })
        .catch(async e => {
          console.error(e);
          await walletConnect.deactivate?.();
          dispatch(setActiveConnector(null));
          if (e.message === "isNotActive") {
            enqueueSnackbar(formatMessage({ id: "snackbar.walletIsNotConnected" }), { variant: "error" });
          } else if (e.message === "User rejected") {
            enqueueSnackbar(formatMessage({ id: "snackbar.rejectedByUser" }), { variant: "warning" });
          } else if (e.message === "Connection request reset. Please try again.") {
            enqueueSnackbar(formatMessage({ id: "snackbar.rejectedByUser" }), { variant: "warning" });
          } else if (e.message === "User signature failure") {
            enqueueSnackbar(formatMessage({ id: "snackbar.rejectedByUser" }), { variant: "error" });
          } else {
            enqueueSnackbar(formatMessage({ id: "snackbar.blockchainError" }), { variant: "error" });
          }
        });
    });
  }, [network]);
};
