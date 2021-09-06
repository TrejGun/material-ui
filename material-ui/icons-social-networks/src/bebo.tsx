import {FC} from "react";
import {SvgIcon} from "@material-ui/core";
import {SvgIconProps} from "@material-ui/core/SvgIcon/SvgIcon";

export const Bebo: FC<SvgIconProps> = props => {
  return (
    <SvgIcon {...props}>
      <rect fill="#CD0300" x="0" y="0" width="23.9858421" height="23.9858421" />
      <path
        d="M12.6786316,18.8275789 L11.7298421,18.8275789 C8.65705263,18.8275789 6.15710526,16.3276316 6.15710526,13.2548421 L6.15710526,6.30968421 C6.15710526,5.67378947 6.67263158,5.15826316 7.30852632,5.15826316 C7.94442105,5.15826316 8.45994737,5.67378947 8.45994737,6.30968421 L8.45994737,13.2548421 C8.45994737,15.0578421 9.92684211,16.5246842 11.7297895,16.5246842 L12.6785789,16.5246842 C14.4815789,16.5246842 15.9484211,15.0577895 15.9484211,13.2548421 C15.9484211,11.4517895 14.4815789,9.98494737 12.6785789,9.98494737 L12.0061579,9.98494737 C11.3702632,9.98494737 10.8547368,9.46947368 10.8547368,8.83352632 C10.8547368,8.19757895 11.3702632,7.68210526 12.0061579,7.68210526 L12.6785789,7.68210526 C15.7513684,7.68210526 18.2513158,10.1820526 18.2513158,13.2548947 C18.2513158,16.3276316 15.7514211,18.8275789 12.6786316,18.8275789 Z"
        fill="#FFFFFF"
      />
    </SvgIcon>
  );
};
