import { useCallback } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { OptionsObject, enqueueSnackbar } from "notistack";
import { Button } from "@mui/material";
import { NoMetaMaskError } from "@web3-react/metamask";

import { TConnectors, useAppDispatch, useAppSelector, walletActions } from "@gemunion/redux";

import { useWallet } from "../provider";
import { metaMask } from "../connectors/meta-mask";

export interface IUseConnectMetamask {
  onClick?: () => void;
}

export const useConnectMetamask = (props: IUseConnectMetamask) => {
  const { onClick } = props;

  const { formatMessage } = useIntl();
  const { activeConnector, network } = useAppSelector(state => state.wallet);
  const { setActiveConnector } = walletActions;
  const dispatch = useAppDispatch();
  const { connectCallback } = useWallet();

  const notDetectedWeb3MessageConfig: OptionsObject = {
    variant: "warning",
    action: () => (
      <Button
        onClick={() => {
          window.open("https://metamask.io/download.html", "_blank");
        }}
      >
        <FormattedMessage id="buttons.download-metamask" />
      </Button>
    ),
  };

  return useCallback(() => {
    return connectCallback(async () => {
      if (!(window as any).ethereum) {
        enqueueSnackbar(formatMessage({ id: "snackbar.web3NotDetected" }), notDetectedWeb3MessageConfig);
      }

      const metamaskNetwork = network
        ? {
            chainId: network.chainId,
            chainName: network.chainName,
            rpcUrls: network.rpcUrls,
            blockExplorerUrls: network.blockExplorerUrls,
            nativeCurrency: network.nativeCurrency,
          }
        : undefined;

      return metaMask
        .activate(metamaskNetwork)
        .then(() => {
          dispatch(setActiveConnector(TConnectors.METAMASK));
          onClick && onClick();
        })
        .catch(e => {
          console.error("error", e);
          dispatch(setActiveConnector(null));
          if (e && e.code === 4001) {
            enqueueSnackbar(formatMessage({ id: "snackbar.rejectedByUser" }), { variant: "warning" });
          } else if (e instanceof NoMetaMaskError) {
            enqueueSnackbar(formatMessage({ id: "snackbar.web3NotDetected" }), notDetectedWeb3MessageConfig);
          } else {
            enqueueSnackbar(formatMessage({ id: "snackbar.blockchainError" }), { variant: "error" });
          }
        });
    });
  }, [activeConnector, network]);
};
