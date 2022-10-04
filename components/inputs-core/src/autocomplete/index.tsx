import { ChangeEvent, FC, HTMLAttributes, ReactElement } from "react";
import { Autocomplete, AutocompleteRenderInputParams, TextField } from "@mui/material";
import { useIntl } from "react-intl";
import { Controller, get, useFormContext, useWatch } from "react-hook-form";

import { useTestId } from "@gemunion/provider-test-id";

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

  const { testId } = useTestId();
  const testIdProps = testId ? { "data-testid": `${testId}-${name}` } : {};

  const suffix = name.split(".").pop() as string;

  const form = useFormContext<any>();
  const error = get(form.formState.errors, name);
  const value = useWatch({ name });

  const { formatMessage } = useIntl();
  const localizedLabel = label === void 0 ? formatMessage({ id: `form.labels.${suffix}` }) : label;
  const localizedHelperText = error ? formatMessage({ id: error.message }, { label: localizedLabel }) : "";

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => {
        if (multiple) {
          return (
            <Autocomplete
              classes={classes}
              multiple={true}
              options={options}
              value={options.filter((option: IAutocompleteOptions) => value.includes(option.key) as boolean)}
              onChange={(_event: ChangeEvent<unknown>, values: Array<IAutocompleteOptions> | null): void => {
                const newValue = values ? values.map((value: IAutocompleteOptions) => value.key) : [];
                form.setValue(name, newValue, { shouldDirty: true });
              }}
              getOptionLabel={(option: IAutocompleteOptions) => option.value}
              renderOption={(props: HTMLAttributes<HTMLLIElement>, option: IAutocompleteOptions) => {
                return (
                  <li {...props} key={option.key}>
                    {option.value}
                  </li>
                );
              }}
              renderInput={(params: AutocompleteRenderInputParams): ReactElement => (
                <TextField
                  {...field}
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                    ...testIdProps,
                  }}
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
                form.setValue(name, newValue, { shouldDirty: true });
              }}
              getOptionLabel={(option: IAutocompleteOptions): string => option.value}
              renderOption={(props: HTMLAttributes<HTMLLIElement>, option: IAutocompleteOptions) => {
                return (
                  <li {...props} key={option.key}>
                    {option.value}
                  </li>
                );
              }}
              renderInput={(params: AutocompleteRenderInputParams): ReactElement => (
                <TextField
                  {...field}
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                    ...testIdProps,
                  }}
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
      }}
    />
  );
};
