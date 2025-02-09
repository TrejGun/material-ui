import { FC, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Box, Button, Grid2, SxProps } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import { auth } from "firebaseui";
import {
  EmailAuthProvider,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithCustomToken,
  TwitterAuthProvider,
  User,
} from "firebase/auth";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router";
import { enqueueSnackbar } from "notistack";

import "firebaseui/dist/firebaseui.css";

import { useApi } from "@ethberry/provider-api";
import firebase from "@ethberry/firebase";
import { ProgressOverlay } from "@ethberry/mui-page-layout";

import { StyledContainer, StyledFirebaseAuthForm } from "./styled";
import type { IFirebaseLoginButtonProps } from "../../types";

export enum PROVIDERS {
  email = "email",
  google = "google",
  facebook = "facebook",
  twitter = "twitter",
}

export const providersStore = {
  [PROVIDERS.email]: {
    provider: EmailAuthProvider.PROVIDER_ID,
    requireDisplayName: false,
  },
  [PROVIDERS.google]: GoogleAuthProvider.PROVIDER_ID,
  [PROVIDERS.facebook]: FacebookAuthProvider.PROVIDER_ID,
  [PROVIDERS.twitter]: TwitterAuthProvider.PROVIDER_ID,
};

export interface IFirebaseLogin {
  providers?: PROVIDERS[];
  buttons?: Array<FC<IFirebaseLoginButtonProps>>;
  withEmail?: boolean;
  onTokenVerified?: () => void;
  sx?: SxProps;
}

export const FirebaseLogin: FC<IFirebaseLogin> = props => {
  const { providers = [PROVIDERS.email], buttons = [], withEmail = true, onTokenVerified, sx } = props;
  const { formatMessage } = useIntl();

  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const navigate = useNavigate();
  const api = useApi();

  const isLoginPage = window.location.pathname.includes("/login");

  const signInOptions = useMemo(() => providers.map(name => providersStore[name]), [providers]);

  const handleMainPageClick = () => {
    void navigate("/");
  };

  const authFb = getAuth(firebase);

  const logIn = async (user: User) => {
    const accessToken = await user.getIdToken(true);
    const now = Date.now();
    api.setToken({
      accessToken,
      accessTokenExpiresAt: now + 1000 * 60 * 60,
      refreshToken: "",
      refreshTokenExpiresAt: now + 1000 * 60 * 60,
    });
    if (isLoginPage) {
      void navigate(window.location.pathname);
    }
  };

  const handleTokenVerified = async (token: string) => {
    if (!token) {
      return;
    }

    const userCredentials = await signInWithCustomToken(authFb, token);
    await logIn(userCredentials.user);

    onTokenVerified?.();
  };

  useLayoutEffect(() => {
    const ui = auth.AuthUI.getInstance() || new auth.AuthUI(authFb);
    ui.start("#firebaseui-auth-container", {
      callbacks: {
        signInSuccessWithAuthResult: data => {
          if (data.additionalUserInfo.isNewUser && !data.additionalUserInfo.profile.verified_email) {
            const actionCodeSettings = {
              url: `${window.location.origin}/login`,
            };
            void sendEmailVerification(authFb.currentUser!, actionCodeSettings).then(() => {
              enqueueSnackbar(formatMessage({ id: "snackbar.registered" }), { variant: "info" });
              setShowMessage(true);
            });
          } else {
            setIsLoggingIn(true);
            void logIn(authFb.currentUser!);
          }
          return false;
        },
        signInFailure: error => {
          setIsLoggingIn(false);
          console.error("error", error);
        },
      },
      signInFlow: "popup",
      signInOptions,
    });
    return () => {
      if (auth.AuthUI.getInstance() && ui) {
        void ui.delete();
      }
    };
  }, []);

  useEffect(() => {
    return () => setShowMessage(false);
  }, []);

  return (
    <ProgressOverlay isLoading={isLoggingIn}>
      <StyledContainer sx={sx} container>
        <Grid2 size={{ xs: 12 }} className="FirebaseLogin-buttonsBox">
          {showMessage && (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <FormattedMessage id="pages.guest.confirmation" />
              <Box mt={2}>
                <Button
                  onClick={handleMainPageClick}
                  variant="contained"
                  color="primary"
                  data-testid="LoginMainPageButton"
                  endIcon={<NavigateNext />}
                >
                  <FormattedMessage id="form.buttons.mainPage" />
                </Button>
              </Box>
            </Box>
          )}
          <StyledFirebaseAuthForm withEmail={withEmail} id="firebaseui-auth-container" />
          {buttons.map((Button, i) => (
            <Button key={i} onTokenVerified={handleTokenVerified} />
          ))}
        </Grid2>
      </StyledContainer>
    </ProgressOverlay>
  );
};

export const Login = FirebaseLogin;
