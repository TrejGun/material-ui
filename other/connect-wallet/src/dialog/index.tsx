import { FC } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { FormattedMessage } from "react-intl";

import {
  MetaMaksButton,
  WalletConnectButton,
  // TrezorButton
} from "./buttons";
import { CloseButton } from "./close-button";

export interface IWalletConnectDialogProps {
  open: boolean;
  onClose: () => void;
}

export const WalletDialog: FC<IWalletConnectDialogProps> = props => {
  const { onClose, open } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        <FormattedMessage id="components.header.wallet.connect" />
        <CloseButton onClick={onClose} />
      </DialogTitle>
      <DialogContent>
        <MetaMaksButton onClick={onClose} />
        <WalletConnectButton onClick={onClose} />
        {/* <TrezorButton /> */}
      </DialogContent>
    </Dialog>
  );
};
