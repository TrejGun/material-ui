import { FC } from "react";
import { useFormikContext } from "formik";
import { Button } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink } from "react-router-dom";

import { ButtonToolbar } from "@gemunion/mui-page-layout";

export const LoginButtons: FC = () => {
  const formik = useFormikContext();
  return (
    <ButtonToolbar>
      <Button variant="text" type="button" to="/forgot-password" component={RouterLink} data-testid="forgotEmailButton">
        <FormattedMessage id="form.buttons.forgot" />
      </Button>
      <Button
        variant="contained"
        type="button"
        to="/registration"
        component={RouterLink}
        data-testid="signupWithEmailButton"
      >
        <FormattedMessage id="form.buttons.signup" />
      </Button>
      <Button
        variant="contained"
        type="submit"
        color="primary"
        disabled={formik.isSubmitting}
        data-testid="loginWithEmailButton"
      >
        <FormattedMessage id="form.buttons.login" />
      </Button>
    </ButtonToolbar>
  );
};
