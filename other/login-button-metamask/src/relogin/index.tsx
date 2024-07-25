import { FC, PropsWithChildren, useLayoutEffect, useEffect, useRef, useState } from "react";
import { Web3ContextType, useWeb3React } from "@web3-react/core";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { v4 } from "uuid";

import { phrase } from "@gemunion/constants";
import firebase from "@gemunion/firebase";
import { useUser } from "@gemunion/provider-user";
import { useApiCall } from "@gemunion/react-hooks";
import { useAppSelector, useAppDispatch } from "@gemunion/redux";
import type { IMetamaskDto } from "@gemunion/types-jwt";
import { ProgressOverlay } from "@gemunion/mui-page-layout";
import { useConnectMetamask, useWalletInit, TConnectors, walletSelectors } from "@gemunion/provider-wallet";
import { collectionActions } from "@gemunion/provider-collection";

export const MetamaskRelogin: FC<PropsWithChildren> = props => {
  const { children } = props;
  const authFb = getAuth(firebase);
  const user = useUser<any>();
  const isUserAuthenticated = user.isAuthenticated();
  const { account = "", connector, isActive } = useWeb3React();
  const activeConnector = useAppSelector<TConnectors>(walletSelectors.activeConnectorSelector);
  const dispatch = useAppDispatch();
  const { setNeedRefresh } = collectionActions;

  const [didMount, setDidMount] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const currentWallet = useRef<string>("");

  const handleDisconnect = async () => {
    await user.logOut();
    if (connector?.deactivate) {
      void connector.deactivate();
    } else {
      void connector?.resetState();
    }
  };

  const handleTokenVerified = async (token: string) => {
    if (!token) {
      return;
    }
    await signInWithCustomToken(authFb, token);
    await user.logIn(void 0, location.pathname).catch(e => {
      console.error("login error", e);
      void handleDisconnect();
    });
    dispatch(setNeedRefresh(true));
  };

  const { fn: getVerifiedToken } = useApiCall(
    (api, values: IMetamaskDto) => {
      return api
        .fetchJson({
          url: "/metamask/login",
          method: "POST",
          data: values,
        })
        .catch(error => {
          void handleDisconnect();
          throw error;
        }) as Promise<{ token: string }>;
    },
    { success: false },
  );

  const onLoginMetamask = useWalletInit(async (web3Context: Web3ContextType) => {
    try {
      const provider = web3Context.provider!;
      const nonce = v4();
      const signature = await provider.getSigner().signMessage(`${phrase}${nonce}`);
      const token = await getVerifiedToken(void 0, { wallet: currentWallet.current || account, nonce, signature });
      await handleTokenVerified(token?.token || "");
    } catch (error) {
      console.error(error);
      await handleDisconnect();
    } finally {
      setIsConnecting(false);
    }
  });

  const handleMetamaskLogin = useConnectMetamask({ onClick: onLoginMetamask });

  useLayoutEffect(() => {
    if (
      isConnecting ||
      !didMount ||
      !account ||
      !activeConnector ||
      currentWallet.current === account ||
      !isUserAuthenticated ||
      activeConnector !== TConnectors.METAMASK
    ) {
      return;
    }
    setIsConnecting(true);
    void handleMetamaskLogin();
  }, [account, activeConnector, didMount, isConnecting, isUserAuthenticated]);

  useEffect(() => {
    if (!isActive) {
      currentWallet.current = "";
      setDidMount(false);
      return;
    }

    if (!didMount) {
      setDidMount(true);
    }

    if (!didMount && account) {
      currentWallet.current = account;
    } else if (currentWallet.current !== account && didMount) {
      void handleDisconnect();
    }
  }, [account, didMount, isActive]);

  return <ProgressOverlay isLoading={isConnecting}>{children}</ProgressOverlay>;
};
