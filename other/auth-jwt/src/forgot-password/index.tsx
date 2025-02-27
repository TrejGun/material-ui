import { FC, useEffect } from "react";
import { Grid2 } from "@mui/material";
import { useNavigate } from "react-router";
import { enqueueSnackbar } from "notistack";
import { useIntl } from "react-intl";

import { Captcha } from "@ethberry/mui-inputs-captcha";
import { PageHeader } from "@ethberry/mui-page-layout";
import { FormWrapper } from "@ethberry/mui-form";
import { TextInput } from "@ethberry/mui-inputs-core";
import { useUser } from "@ethberry/provider-user";
import { ApiError, useApi } from "@ethberry/provider-api";

import { validationSchema } from "./validation";

interface IForgotPasswordDto {
  email: string;
  captcha: string;
}

interface IForgotPasswordProps {
  fetchUrl?: string;
  successSendUrl?: string;
  profileRedirectUrl?: string;
}

export const ForgotPassword: FC<IForgotPasswordProps> = props => {
  const {
    fetchUrl = "/auth/forgot-password",
    successSendUrl = "/message/forgot-successful",
    profileRedirectUrl = "/profile",
  } = props;

  const navigate = useNavigate();
  const { formatMessage } = useIntl();

  const user = useUser<any>();
  const api = useApi();

  const handleSubmit = (values: IForgotPasswordDto, form: any): Promise<void> => {
    return api
      .fetchJson({
        url: fetchUrl,
        method: "POST",
        data: values,
      })
      .then(() => {
        void navigate(successSendUrl);
      })
      .catch((e: ApiError) => {
        if (e.status === 400) {
          const errors = e.getLocalizedValidationErrors();

          Object.keys(errors).forEach(key => {
            form.setError(key, { type: "custom", message: errors[key] });
          });
        } else if (e.status) {
          enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
        } else {
          console.error(e);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      });
  };

  useEffect(() => {
    if (user.isAuthenticated()) {
      void user.getProfile(profileRedirectUrl);
    }
  }, [user.isAuthenticated()]);

  return (
    <Grid2
      container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: 500,
        margin: "0 auto",
      }}
    >
      <Grid2 size={{ sm: 10 }}>
        <PageHeader message="pages.guest.forgotPassword" />
        <FormWrapper
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          initialValues={{
            email: "",
            captcha: "",
          }}
          testId="ForgotPassword"
        >
          <TextInput name="email" autoComplete="username" />
          <Captcha />
        </FormWrapper>
      </Grid2>
    </Grid2>
  );
};
