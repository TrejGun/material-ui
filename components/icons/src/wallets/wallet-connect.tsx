import { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const WalletConnectIcon: FC<SvgIconProps> = props => {
  return (
    <SvgIcon {...props} viewBox="0 0 60 60">
      <path
        d="M30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60Z"
        fill="#D9ECFF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30 24.9239C26.8694 24.9239 24.4562 26.6948 23.1109 27.9351C22.9105 28.1199 22.5999 28.1201 22.4054 27.9291L20.2938 25.8553C20.0942 25.6593 20.0924 25.3384 20.2969 25.1476C21.906 23.6458 25.2988 21 30 21C34.7012 21 38.094 23.6458 39.7031 25.1476C39.9076 25.3384 39.9058 25.6593 39.7062 25.8553L37.5946 27.9291C37.4001 28.1201 37.0895 28.1199 36.8891 27.9351C35.5438 26.6948 33.1306 24.9239 30 24.9239ZM14.3784 31.9426C14.1705 31.7555 14.1565 31.4343 14.3474 31.2299L16.3648 29.0685C16.5508 28.8692 16.8622 28.8557 17.0648 29.0381L23.0217 34.4007C23.2106 34.5708 23.497 34.5721 23.6874 34.4038L29.6689 29.1169C29.858 28.9497 30.142 28.9497 30.3311 29.1169L36.3126 34.4038C36.503 34.5721 36.7894 34.5708 36.9783 34.4007L42.9352 29.0381C43.1378 28.8557 43.4492 28.8692 43.6352 29.0685L45.6526 31.2299C45.8435 31.4343 45.8295 31.7555 45.6216 31.9426L37.0029 39.7016C36.8141 39.8716 36.5277 39.8729 36.3373 39.7046L30.3311 34.3959C30.142 34.2288 29.858 34.2288 29.6689 34.3959L23.6627 39.7046C23.4723 39.8729 23.1859 39.8716 22.9971 39.7016L14.3784 31.9426Z"
        fill="#278FFC"
      />
    </SvgIcon>
  );
};
