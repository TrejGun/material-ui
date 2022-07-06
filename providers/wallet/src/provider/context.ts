import { createContext } from "react";

import { TConnectors } from "../connectors";
import { INetwork } from "../interfaces";

export interface IWalletContext {
  openConnectWalletDialog: () => void;
  closeConnectWalletDialog: () => void;
  onWalletConnect: (fn: any) => void;
  activeConnector: TConnectors | null;
  setActiveConnector: (value: TConnectors | null) => void;
  setNetwork: (network: INetwork) => void;
  network: INetwork;
}

export const WalletContext = createContext<IWalletContext>(undefined!);
