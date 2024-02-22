import { FC } from "react";
import { Link, SxProps, Theme, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { useWeb3React } from "@web3-react/core";

import { useAppSelector } from "@gemunion/redux";

export interface ITxHashLinkProps {
  hash: string;
  length?: number;
  sx?: SxProps<Theme>;
}

export const TxHashLink: FC<ITxHashLinkProps> = props => {
  const { hash, length = 16, sx = [] } = props;

  const { chainId = 1 } = useWeb3React();
  const { networks } = useAppSelector(state => state.wallet);

  const isSmallScreen = useMediaQuery<Theme>(theme => theme.breakpoints.down("sm"));

  if (!hash) {
    return null;
  }

  const formattedHash = isSmallScreen
    ? `${hash.slice(0, 5)}...${hash.slice(-4)}`
    : hash.substring(0, length).concat("...");

  if (!networks[chainId]?.blockExplorerUrls?.length) {
    return <Typography>{formattedHash}</Typography>;
  }

  return (
    <Tooltip title={hash}>
      <Link target={"_blank"} href={`${networks[chainId].blockExplorerUrls[0]}/tx/${hash}`} sx={sx}>
        {formattedHash}
      </Link>
    </Tooltip>
  );
};
