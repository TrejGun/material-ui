import { FC, ReactElement } from "react";
import { get, useFormContext, useWatch } from "react-hook-form";
import { Box, FormControl, FormHelperText, Grid2, IconButton, InputLabel, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { FormattedMessage, useIntl } from "react-intl";

import { Accept, S3FileInput, useDeleteUrl } from "@ethberry/mui-inputs-file-s3";

export interface IAvatarInputProps {
  name: string;
  label?: string | number | ReactElement;
  bucket?: string;
  accept?: Accept;
  required?: boolean;
}

export const AvatarInput: FC<IAvatarInputProps> = props => {
  const { name, label, bucket, accept, required } = props;

  const form = useFormContext<any>();
  const error = get(form.formState.errors, name);
  const value = get(useWatch(), name);

  const { formatMessage } = useIntl();
  const deleteUrl = useDeleteUrl(bucket);
  const suffix = name.split(".").pop()!;
  const localizedLabel = label === void 0 ? formatMessage({ id: `form.labels.${suffix}` }) : label;
  const localizedHelperText = error ? formatMessage({ id: error.message }, { label: localizedLabel }) : "";

  const onChange = (url: string) => {
    form.setValue(name, url, { shouldTouch: true, shouldDirty: true });
    form.clearErrors(name);
    void form.trigger(name);
  };

  const onDelete = async () => {
    await deleteUrl(value);
    form.setValue(name, "", { shouldTouch: false, shouldDirty: true });
    void form.trigger(name);
  };

  if (value) {
    return (
      <FormControl fullWidth sx={{ mt: 2, height: 200, width: 200, position: "relative" }} required={required}>
        <InputLabel id={`${name}-select-label`} shrink>
          {localizedLabel}
        </InputLabel>
        <Tooltip title={formatMessage({ id: "form.tips.delete" })}>
          <IconButton
            aria-label="delete"
            onClick={onDelete}
            size="medium"
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            <Delete fontSize="inherit" />
          </IconButton>
        </Tooltip>
        <Box
          component="img"
          src={value}
          alt={formatMessage({ id: `form.labels.${name}` })}
          sx={{
            height: 200,
            width: 200,
            borderRadius: "50%",
            borderColor: "#fff",
            borderStyle: "solid",
            borderWidth: 0,
            overflow: "hidden",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        {localizedHelperText && (
          <FormHelperText id={`${name}-helper-text`} error>
            {localizedHelperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }

  return (
    <FormControl fullWidth sx={{ mt: 2, height: 200, width: 200, position: "relative" }} required={required}>
      <InputLabel id={`${name}-select-label`} shrink>
        <FormattedMessage id={`form.labels.${name}`} />
      </InputLabel>
      <Grid2 container sx={{ mt: 1 }}>
        <Grid2>
          <S3FileInput label={label} name={name} onChange={onChange} bucket={bucket} accept={accept} maxFiles={1} />
        </Grid2>
      </Grid2>
    </FormControl>
  );
};
