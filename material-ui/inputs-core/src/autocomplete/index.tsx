import { ChangeEvent, FC, ReactElement } from "react";
import { Autocomplete, AutocompleteRenderInputParams, TextField } from "@mui/material";
import { useIntl } from "react-intl";
import { getIn, useFormikContext } from "formik";

import { useStyles } from "./styles";

export interface IAutocompleteOptions {
  key: string | number;
  value: string;
}

export interface IAutocompleteInputProps {
  name: string;
  label?: string | number | ReactElement;
  options: Array<IAutocompleteOptions>;
  multiple?: boolean;
  disableClearable?: boolean;
  variant: "filled" | "outlined" | "standard";
}

export const AutocompleteInput: FC<IAutocompleteInputProps> = props => {
  const { name, label, options, multiple, variant = "standard" } = props;
  const classes = useStyles();

  const suffix = name.split(".").pop() as string;

  const formik = useFormikContext<any>();
  const error = getIn(formik.errors, name);
  const value = getIn(formik.values, name);

  const { formatMessage } = useIntl();
  const localizedLabel = label === void 0 ? formatMessage({ id: `form.labels.${suffix}` }) : label;
  const localizedHelperText = error ? formatMessage({ id: error }, { label: localizedLabel }) : "";

  if (multiple) {
    return (
      <Autocomplete
        classes={classes}
        multiple={true}
        options={options}
        value={options.filter((option: IAutocompleteOptions) => value.includes(option.key) as boolean)}
        onChange={(_event: ChangeEvent<unknown>, values: Array<IAutocompleteOptions> | null): void => {
          const newValue = values ? values.map((value: IAutocompleteOptions) => value.key) : [];
          formik.setFieldValue(name, newValue);
        }}
        getOptionLabel={(option: IAutocompleteOptions) => option.value}
        renderInput={(params: AutocompleteRenderInputParams): ReactElement => (
          <TextField
            {...params}
            label={localizedLabel}
            placeholder={formatMessage({ id: `form.placeholders.${suffix}` })}
            error={!!error}
            helperText={localizedHelperText}
            variant={variant}
            fullWidth
          />
        )}
      />
    );
  } else {
    return (
      <Autocomplete
        classes={classes}
        multiple={false}
        options={options}
        value={options.find((option: IAutocompleteOptions) => value === option.key) || null}
        onChange={(_event: ChangeEvent<unknown>, value: IAutocompleteOptions | null): void => {
          const newValue = value ? value.key : null;
          formik.setFieldValue(name, newValue);
        }}
        getOptionLabel={(option: IAutocompleteOptions): string => option.value}
        renderInput={(params: AutocompleteRenderInputParams): ReactElement => (
          <TextField
            {...params}
            label={localizedLabel}
            placeholder={formatMessage({ id: `form.placeholders.${suffix}` })}
            error={!!error}
            helperText={localizedHelperText}
            variant={variant}
            fullWidth
          />
        )}
      />
    );
  }
};
