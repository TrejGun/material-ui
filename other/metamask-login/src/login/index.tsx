import { FC, useContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, Grid } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { v4 } from "uuid";

import { phrase } from "@gemunion/constants";
import { IMetamaskDto } from "@gemunion/types-jwt";
import { PageHeader } from "@gemunion/mui-page-header";
import { ApiError, IJwt, useApi } from "@gemunion/provider-api";
import { useUser } from "@gemunion/provider-user";
import { WalletContext } from "@gemunion/provider-wallet";

import { useStyles } from "./styles";

export const Login: FC = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const [data, setData] = useState<IMetamaskDto>({ nonce: "", signature: "", wallet: "" });

  const { account, library, active } = useWeb3React();

  const user = useUser();
  const api = useApi();
  const wallet = useContext(WalletContext);

  const handleSubmit = (values: IMetamaskDto): Promise<void | ApiError> => {
    return api
      .fetchJson({
        url: "/auth/metamask",
        method: "POST",
        data: values,
      })
      .then((json: IJwt) => {
        api.setToken(json);
        return user.getProfile("/dashboard");
      })
      .catch((e: ApiError) => {
        api.setToken(null);
        if (e.status) {
          enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
        } else {
          console.error(e);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      });
  };

  const handleConnect = (): void => {
    wallet.setWalletConnectDialogOpen(true);
  };

  const handleLogin = (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return library
      .getSigner()
      .signMessage(`${phrase}${data.nonce}`)
      .then((signature: string) => {
        setData({ ...data, signature });
        return handleSubmit({ ...data, signature });
      })
      .catch((error: any) => {
        if (error.code === 4001) {
          enqueueSnackbar(formatMessage({ id: "snackbar.denied" }), { variant: "warning" });
        } else {
          console.error(error);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      });
  };

  useEffect(() => {
    if (user.isAuthenticated()) {
      void user.getProfile("/dashboard");
    }
  }, [user.isAuthenticated()]);

  useEffect(() => {
    setData({ nonce: v4(), signature: "", wallet: account || "" });
  }, [account]);

  return (
    <Grid container className={classes.section}>
      <Grid item sm={12}>
        <PageHeader message="pages.guest.login" />
        {active ? (
          <Button onClick={handleLogin}>
            <FormattedMessage id="form.buttons.login" />
          </Button>
        ) : (
          <Button onClick={handleConnect}>
            <FormattedMessage id="components.header.wallet.connect" />
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
