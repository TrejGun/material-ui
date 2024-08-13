import { FC, useCallback, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ProviderRpcError } from "@web3-react/types";

import type { INetwork } from "@gemunion/types-blockchain";
import { useUser } from "@gemunion/provider-user";
import { useAppSelector } from "@gemunion/redux";

import { getConnectorName, useGetConnectorByName } from "../connectors";
import { particleAuth } from "../connectors/particle";
import { TConnectors, walletSelectors } from "../reducer";
import { STORE_CONNECTOR } from "../constants";
import { useSwitchNetwork } from "../hooks";

export const Reconnect: FC = () => {
  const { isActive, chainId, connector } = useWeb3React();
  const activeConnector = useAppSelector<TConnectors>(walletSelectors.activeConnectorSelector);
  const network = useAppSelector<INetwork>(walletSelectors.networkSelector);
  const user = useUser<any>();
  const { connectorByName } = useGetConnectorByName();
  const userIsAuthenticated = user.isAuthenticated();

  useSwitchNetwork(network);

  const handleConnect = useCallback(async () => {
    if ((!isActive || network?.chainId !== chainId) && activeConnector && network) {
      if (activeConnector === TConnectors.PARTICLE && particleAuth?.isValidChain(network?.chainId)) {
        await particleAuth?.connectEagerly();
      } else {
        await connectorByName?.activate(network.chainId).catch((error: ProviderRpcError) => {
          console.error("Reconnect error", error);
        });
      }
    }
  }, [activeConnector, chainId, network]);

  useEffect(() => {
    if (userIsAuthenticated && network) {
      void handleConnect();
    }
  }, [network, userIsAuthenticated]);

  useEffect(() => {
    if (isActive) {
      const newConnector = getConnectorName(connector);

      if (newConnector) {
        localStorage.setItem(STORE_CONNECTOR, JSON.stringify(newConnector));
      }
    }
  }, [isActive]);

  return null;
};
