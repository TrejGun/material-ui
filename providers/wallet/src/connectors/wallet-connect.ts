import { initializeConnector, Web3ReactHooks } from "@web3-react/core";
import { Web3ReactStore } from "@web3-react/types";
import { WalletConnect } from "@web3-react/walletconnect-v2";

// do not import from provider
import { rpcUrls } from "../provider/constants";

/* javascript-obfuscator:disable */
const WALLET_CONNECT_PROJECT_ID = process.env.WALLET_CONNECT_PROJECT_ID;
const WALLET_CONNECT_DEFAULT_CHAIN_ID = Number(process.env.WALLET_CONNECT_DEFAULT_CHAIN_ID);
/* javascript-obfuscator:enable */

export const [walletConnect, hooks, store]: [WalletConnect, Web3ReactHooks, Web3ReactStore] =
  initializeConnector<WalletConnect>(
    (actions): WalletConnect =>
      new WalletConnect({
        actions,
        options: {
          projectId: WALLET_CONNECT_PROJECT_ID,
          chains: [WALLET_CONNECT_DEFAULT_CHAIN_ID],
          optionalChains: Object.keys(rpcUrls).map(Number),
          showQrModal: true,
        },
      }),
  );