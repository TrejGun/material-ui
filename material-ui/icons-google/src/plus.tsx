import { FC } from "react";
import { SvgIcon } from "@material-ui/core";
import { SvgIconProps } from "@material-ui/core/SvgIcon/SvgIcon";

export const Plus: FC<SvgIconProps> = props => {
  return (
    <SvgIcon {...props}>
      <path
        fill="#CE4234"
        d="M12,0 C5.37257812,0 0,5.37257812 0,12 C0,18.6274219 5.37257812,24 12,24 C18.6274219,24 24,18.6274219 24,12 C24,5.37257813 18.6274219,0 12,0 Z"
      />
      <path
        fill="#E3513D"
        d="M12,22.7805 C6.05559375,22.7805 1.2195,17.9444062 1.2195,12 C1.2195,6.05559375 6.05559375,1.2195 12,1.2195 C17.9443125,1.2195 22.7805,6.05559375 22.7805,12 C22.7805,17.9444062 17.9443125,22.7805 12,22.7805 Z"
      />
      <polygon
        fill="#F2F2F2"
        points="22.1347031 11.1462656 22.1347031 12.8537344 20.2264219 12.8537344 20.2264219 14.7620156 18.5189531 14.7620156 18.5189531 12.8537344 16.6113281 12.8537344 16.6113281 11.1462656 18.5189531 11.1462656 18.5189531 9.23798437 20.2264219 9.23798437 20.2264219 11.1462656"
      />
      <path
        fill="#F2F2F2"
        d="M14.6234063,10.8490312 C14.694375,11.2219687 14.7312188,11.607 14.7312188,12 C14.7312188,12.4412344 14.685,12.8710781 14.5966406,13.2862969 C14.0054063,16.0710469 11.532,18.160125 8.57114063,18.160125 C6.225,18.160125 4.18542188,16.8490781 3.1449375,14.919375 C2.67684375,14.0502187 2.41101563,13.0565625 2.41101563,12 C2.41101563,8.59785937 5.169,5.83992187 8.57109375,5.83992187 C10.0656094,5.83992187 11.4362344,6.37223437 12.5027813,7.25807812 L10.5075,8.89185937 C9.94575,8.541 9.2821875,8.338125 8.57109375,8.338125 C6.96548437,8.338125 5.60085937,9.37195313 5.10670312,10.8102188 C4.97882812,11.1831562 4.90921875,11.5835625 4.90921875,12.0000469 C4.90921875,12.4520156 4.99092187,12.8852344 5.14153125,13.2849844 C5.66179688,14.6737031 7.00092188,15.6620156 8.57109375,15.6620156 C9.24604688,15.6620156 9.87810938,15.4798594 10.4205,15.1611562 C11.1409688,14.7386719 11.7040781,14.0777812 12.0007031,13.2863437 L8.706375,13.2863437 L8.706375,10.8490781 L12.0481875,10.8490781 L14.6234531,10.8490781 L14.6234531,10.8490312 L14.6234063,10.8490312 Z"
      />
    </SvgIcon>
  );
};
