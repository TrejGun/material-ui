import { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const Gas: FC<SvgIconProps> = props => {
  return (
    <SvgIcon {...props}>
      <g>
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M3 19V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v8h2a2 2 0 0 1 2 2v4a1 1 0 0 0 2 0v-7h-2a1 1 0 0 1-1-1V6.414l-1.657-1.657 1.414-1.414 4.95 4.95A.997.997 0 0 1 22 9v9a3 3 0 0 1-6 0v-4h-2v5h1v2H2v-2h1zM5 5v6h7V5H5z"></path>
      </g>
    </SvgIcon>
  );
};