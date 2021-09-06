import { FC } from "react";
import { getIn, useFormikContext } from "formik";
import { FormControl, FormHelperText, Grid, IconButton, InputLabel, Tooltip } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { FormattedMessage, useIntl } from "react-intl";

import { FirebaseFileInput } from "@gemunion/material-ui-inputs-file-firebase";

import { useStyles } from "./styles";
import { useDeleteUrl } from "../utils";

export interface IAvatarInputProps {
  name: string;
  label?: string;
  bucket?: string;
  accept?: string | string[];
}

export const AvatarInput: FC<IAvatarInputProps> = props => {
  const { name, label, bucket, accept } = props;

  const formik = useFormikContext<any>();
  const error = getIn(formik.errors, name);
  const value = getIn(formik.values, name);
  const touched = getIn(formik.touched, name);

  const classes = useStyles();
  const { formatMessage } = useIntl();
  const deleteUrl = useDeleteUrl(bucket);
  const suffix = name.split(".").pop() as string;
  const localizedLabel = label === void 0 ? formatMessage({ id: `form.labels.${suffix}` }) : label;
  const localizedHelperText = error ? formatMessage({ id: error }, { label: localizedLabel }) : "";

  const onChange = (urls: Array<string>) => {
    formik.setFieldValue(name, urls[0]);
  };

  const onDelete = async () => {
    await deleteUrl(value);
    formik.setFieldValue(name, "");
  };

  if (value) {
    return (
      <FormControl fullWidth className={classes.root}>
        <InputLabel id={`${name}-select-label`} shrink className={classes.label}>
          <FormattedMessage id={`form.labels.${name}`} />
        </InputLabel>
        <Tooltip title={formatMessage({ id: "form.tips.delete" })}>
          <IconButton aria-label="delete" onClick={onDelete} className={classes.button} size="medium">
            <Delete fontSize="inherit" />
          </IconButton>
        </Tooltip>
        <img src={value} className={classes.image} alt={formatMessage({ id: `form.labels.${name}` })} />
        {localizedHelperText && (
          <FormHelperText id={`${name}-helper-text`} error>
            {localizedHelperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }

  return (
    <FormControl fullWidth className={classes.root}>
      <InputLabel id={`${name}-select-label`} shrink className={classes.label}>
        <FormattedMessage id={`form.labels.${name}`} />
      </InputLabel>
      <Grid container className={classes.container}>
        <Grid item>
          <FirebaseFileInput onChange={onChange} bucket={bucket} accept={accept} />
          {touched && error && (
            <FormHelperText id={`${name}-helper-text`} error>
              {localizedHelperText}
            </FormHelperText>
          )}
        </Grid>
      </Grid>
    </FormControl>
  );
};
