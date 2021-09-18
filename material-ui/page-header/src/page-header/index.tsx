import { FC } from "react";
import { FormattedMessage } from "react-intl";

import { Grid, Typography } from "@mui/material";
import { ButtonToolbar } from "@gemunion/mui-toolbar";

import { useStyles } from "./styles";

export interface IPageHeader {
  message: string;
  data?: any;
}

export const PageHeader: FC<IPageHeader> = props => {
  const { children, message, data } = props;
  const classes = useStyles();
  return (
    <Grid className={classes.header} container justifyContent="space-between" alignItems="center">
      <Grid item className={classes.wrapper}>
        <Typography component="h2" className={classes.title}>
          <FormattedMessage id={message} values={data} />
        </Typography>
      </Grid>

      <Grid item className={classes.buttons}>
        <ButtonToolbar>{children}</ButtonToolbar>
      </Grid>
    </Grid>
  );
};
