import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useWeb3React, Web3ContextType } from "@web3-react/core";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { FormattedMessage } from "react-intl";
import { v4 } from "uuid";

import { phrase } from "@gemunion/constants";
import firebase from "@gemunion/firebase";
import { useApi } from "@gemunion/provider-api";
import { useUser } from "@gemunion/provider-user";
import { MetaMaskIcon } from "@gemunion/provider-wallet";
import { useApiCall } from "@gemunion/react-hooks";
import { useMetamask } from "@gemunion/react-hooks-eth";
import type { IMetamaskDto } from "@gemunion/types-jwt";

import { StyledButton } from "./styled";

export const MetamaskButton = () => {
  const [data, setData] = useState<IMetamaskDto>({ nonce: "", signature: "", wallet: "" });

  const { account } = useWeb3React();
  const user = useUser();
  const api = useApi();

  const authFb = getAuth(firebase);

  const { fn: login, isLoading } = useApiCall((api, values: IMetamaskDto) => {
    return api.fetchJson({
      url: "/metamask/login",
      method: "POST",
      data: values,
    }) as Promise<{ token: string }>;
  });

  const handleLogin = useMetamask(
    async (web3Context: Web3ContextType) => {
      const wallet = web3Context.account!;
      const provider = web3Context.provider!;

      const signature = await provider.getSigner().signMessage(`${phrase}${data.nonce}`);
      setData({ ...data, wallet, signature });
      const token = await login(undefined, { wallet, nonce: data.nonce, signature });
      console.info("token", token);

      const userFb = await signInWithCustomToken(authFb, token?.token || "");

      console.info("userFb", userFb);
      console.info("userFb.user.refreshToken", userFb.user.refreshToken);

      await authFb.currentUser
        ?.getIdToken(true)
        .then(async accessToken => {
          const now = Date.now();
          api.setToken({
            accessToken,
            accessTokenExpiresAt: now + 1000 * 60 * 60,
            refreshToken: "",
            refreshTokenExpiresAt: now + 1000 * 60 * 60,
          });
          return user.getProfile("/dashboard");
        })
        .catch(console.error);
    },
    { success: false },
  );

  const handleClick = async () => {
    await handleLogin();
  };

  useEffect(() => {
    setData({ nonce: v4(), signature: "", wallet: account || "" });
  }, [account]);

  return (
    <StyledButton
      disabled={isLoading}
      onClick={handleClick}
      startIcon={isLoading ? null : <MetaMaskIcon viewBox="9 5 50 50" />}
      fullWidth
    >
      {isLoading ? <CircularProgress size={20} /> : <FormattedMessage id="pages.guest.signInWithMetamask" />}
    </StyledButton>
  );
};
