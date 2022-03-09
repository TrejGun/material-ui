import {FC} from "react";
import {SvgIcon} from "@mui/material";
import {SvgIconProps} from "@mui/material/SvgIcon/SvgIcon";

export const Vine: FC<SvgIconProps> = props => {
  return (
    <SvgIcon {...props}>
      <rect fill="#01B488" x="0" y="0" width="23.9858421" height="23.9858421" />
      <path
        d="M14.4893158,9.004 C14.4292105,8.52336842 14.1288421,6.33052632 15.6908947,6.33052632 C17.2529474,6.33052632 16.3817895,9.81505263 16.3817895,9.81505263 L18.9921053,9.81505263 C19.1687368,9.22663158 19.2955789,8.50715789 19.2955789,7.65221053 C19.2955789,4.82852632 17.2829474,3.83721053 15.8711053,3.83721053 C14.4592632,3.83721053 11.8758947,4.40794737 11.8758947,8.34310526 C11.8758947,12.2782632 14.9098421,13.5098421 14.9098421,13.5098421 C14.0987895,15.3122105 12.0260526,17.5351053 12.0260526,17.5351053 C8.24110526,13.2695263 7.73047368,6.27042105 7.73047368,6.27042105 L5.05268421,6.35015789 C6.80989474,19.5967895 12.0260526,20.1485263 12.0260526,20.1485263 C14.3390526,19.7665789 17.2828947,14.1406842 17.2828947,14.1406842 C17.7635263,14.2007368 19.2354211,13.9003684 19.2354211,13.9003684 L19.2354211,11.9478421 C15.3003684,12.819 14.5494211,9.48463158 14.4893158,9.004 Z"
        fill="#FFFFFF"
      />
    </SvgIcon>
  );
};