import { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const Trezor: FC<SvgIconProps> = props => {
  return (
    <SvgIcon {...props}>
      <circle cx="30" cy="30" r="30" fill="#DFF1FE" />
      <path
        d="M22.5116 25.0097C22.5116 23.7155 22.4408 22.4089 22.5233 21.1023C22.7474 17.4538 26.0607 14.2243 29.551 14.0148C33.5247 13.7806 36.4371 16.3691 37.3922 19.2657C37.687 20.1409 37.7342 21.1023 37.8757 22.0268C37.9228 22.3473 37.8757 22.6801 37.8757 23.0129C37.8757 23.6292 37.6752 24.3811 37.9464 24.8248C38.1822 25.2193 38.9369 25.2932 39.4675 25.4781C40.0806 25.6877 40.3636 26.0205 40.3636 26.7724C40.3283 31.7645 40.3401 36.7566 40.3518 41.7487C40.3518 42.1802 40.2575 42.3774 39.833 42.5253C36.6729 43.647 33.5365 44.8056 30.3882 45.9397C30.2231 46.0013 29.9991 46.0259 29.834 45.9643C26.6857 44.8056 23.561 43.6346 20.4127 42.4883C20.0472 42.3527 20 42.1432 20 41.8104C20.0118 36.732 20.0118 31.6536 20 26.5752C20 26.0328 20.2122 25.7123 20.6721 25.5644C21.2145 25.3919 21.7805 25.2316 22.5116 25.0097ZM36.9559 34.4393H36.9441C36.9441 32.8615 36.9324 31.2838 36.9559 29.706C36.9559 29.3486 36.8498 29.1637 36.5315 29.0897C36.3192 29.0404 36.107 28.9788 35.8947 28.9541C33.0412 28.5597 30.1759 28.5104 27.3106 28.6583C26.0372 28.7199 24.7755 28.9048 23.502 29.0527C23.0775 29.102 22.8889 29.3239 22.8889 29.8293C22.9125 32.9108 22.9007 35.9801 22.8889 39.0616C22.8889 39.4068 22.9714 39.567 23.2898 39.6903C25.3297 40.4298 27.3578 41.1817 29.3859 41.9583C29.8458 42.1309 30.2349 42.1432 30.683 41.9583C32.6285 41.1941 34.5741 40.4422 36.5315 39.7026C36.8616 39.5793 36.9795 39.4191 36.9677 39.0493C36.9441 37.5085 36.9559 35.9677 36.9559 34.4393ZM34.6684 24.5906C34.6684 23.7155 34.692 22.8157 34.6684 21.9159C34.6095 19.6109 32.9115 17.6633 30.7537 17.3921C28.5016 17.1086 26.3202 18.5508 25.8367 20.8188C25.5773 22.0514 25.6363 23.3457 25.5537 24.5906C28.6666 24.5906 31.638 24.5906 34.6684 24.5906Z"
        fill="#102534"
      />
    </SvgIcon>
  );
};
