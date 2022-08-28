import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { utils } from "ethers";
import { useWeb3React } from "@web3-react/core";

import { downForMaintenance } from "@gemunion/license-messages";
import { useLicense } from "@gemunion/provider-license";
import { useWallet } from "@gemunion/provider-wallet";

export type MetamaskOptionsParams = {
  success?: boolean;
  error?: boolean;
};

export const useMetamaskWallet = <T = any>(
  fn: (...args: Array<any>) => Promise<T>,
  options: MetamaskOptionsParams = {},
) => {
  const license = useLicense();

  const web3ContextGlobal = useWeb3React();
  const { isActive } = web3ContextGlobal;
  const { openConnectWalletDialog, isDialogOpen, closeConnectWalletDialog } = useWallet();

  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const { success = true, error = true } = options;

  return async (...args: Array<any>): Promise<T> => {
    if (!license.isValid()) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ licensed: null }).catch(() => {
        enqueueSnackbar(downForMaintenance(), { variant: "error" });
        return null as unknown as T;
      });
    }

    let context = web3ContextGlobal;
    if (!isActive) {
      context = await openConnectWalletDialog();
    } else if (isDialogOpen()) {
      closeConnectWalletDialog();
    }

    return fn(...args, context)
      .then((result: any) => {
        if (success && result !== null) {
          enqueueSnackbar(formatMessage({ id: "snackbar.success" }), { variant: "success" });
        }
        return result as T;
      })
      .catch((e: any) => {
        if (error) {
          if (e.code === 4001) {
            enqueueSnackbar(formatMessage({ id: "snackbar.rejectedByUser" }), { variant: "warning" });
          } else if (e.error?.data?.data) {
            enqueueSnackbar(formatMessage({ id: "snackbar.blockchainError" }), { variant: "error" });
            const data = e.error?.data?.data as string;
            const decodedMessage = utils.toUtf8String(`0x${data.substr(138)}`);
            console.error("[blockchain error]", decodedMessage);
          }
          return null;
        }

        throw e;
      }) as Promise<T>;
  };
};
