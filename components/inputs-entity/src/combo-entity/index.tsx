import { ChangeEvent, FC, HTMLAttributes, ReactElement, useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { enqueueSnackbar } from "notistack";
import { Controller, get, useFormContext, useWatch } from "react-hook-form";
import {
  Autocomplete,
  AutocompleteChangeReason,
  AutocompleteRenderInputParams,
  TextField,
  TextFieldProps,
} from "@mui/material";

import { ProgressOverlay } from "@ethberry/mui-page-layout";
import { useTestId } from "@ethberry/provider-test-id";
import { useApiCall, useDeepCompareEffect } from "@ethberry/react-hooks";

import { IAutocompleteOption } from "../interfaces";

export interface IComboEntityInputProps extends Omit<TextFieldProps, "onChange" | "name"> {
  name: string;
  label?: string | number | ReactElement;
  placeholder?: string;
  controller: string;
  disabled?: boolean;
  readOnly?: boolean;
  disableClear?: boolean;
  autoselect?: boolean;
  freeSolo?: boolean;
  getTitle?: (item: any) => string;
  targetId?: string;
  data?: Record<string, any>;
  variant?: "standard" | "filled" | "outlined";
  registerInput?: (name: string, isAsync: boolean) => () => void;
  onChange?: (
    event: ChangeEvent<unknown>,
    options: Array<IAutocompleteOption | string> | string | IAutocompleteOption | null,
    reason: string,
  ) => void;
}

export const ComboEntityInput: FC<IComboEntityInputProps> = props => {
  const {
    name,
    controller,
    getTitle,
    targetId = "id",
    autoselect = false,
    data = {},
    variant = "standard",
    onChange,
    registerInput,
    label,
    placeholder,
    disabled,
    readOnly,
    freeSolo = false,
    disableClear,
    ...rest
  } = props;
  const suffix = name.split(".").pop()!;

  const { testId } = useTestId();
  const testIdProps = testId ? { "data-testid": `${testId}-${name}` } : {};

  const [open, setOpen] = useState(false);

  const form = useFormContext<any>();
  const error = get(form.formState.errors, name);
  const value = useWatch({ name });

  const { formatMessage } = useIntl();
  const localizedLabel = label ?? formatMessage({ id: `form.labels.${suffix}` });
  const localizedPlaceholder = placeholder ?? formatMessage({ id: `form.placeholders.${suffix}` });
  const localizedHelperText = error ? formatMessage({ id: error.message }, { label: localizedLabel }) : "";

  const [options, setOptions] = useState<Array<IAutocompleteOption>>([]);

  const abortController = new AbortController();

  const { fn: fetchByController, isLoading } = useApiCall(
    (api, data: Record<string, any>) => {
      return api.fetchJson({
        url: `/${controller}/autocomplete`,
        data,
        signal: abortController.signal,
      });
    },
    { success: false },
  );

  const fetchOptions = useCallback(async (): Promise<void> => {
    return fetchByController(form, data)
      .then((json: Array<any>) => {
        setOptions(json);
        if (autoselect) {
          const newValue = json[0];

          if (!newValue) {
            form.setValue(name, null, { shouldDirty: true });
            return;
          }

          const isValueNotExistInOptions = value && json.every((o: IAutocompleteOption) => o[targetId] !== value);

          if (!value || isValueNotExistInOptions) {
            if (onChange) {
              onChange({} as ChangeEvent<unknown>, newValue, "autoselect");
            } else {
              form.setValue(name, newValue[targetId], { shouldDirty: true });
            }
          }
        }
      })
      .catch(e => {
        if (!e.message.includes("The user aborted a request")) {
          console.error(e);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      });
  }, [data, value, name, form]);

  useDeepCompareEffect(() => {
    void fetchOptions();

    return () => abortController.abort();
  }, [data]);

  useEffect(() => {
    const unregisterInput = registerInput?.(name, true);

    return () => {
      if (unregisterInput) {
        unregisterInput();
      }
    };
  }, [name, registerInput]);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => {
        return (
          <ProgressOverlay isLoading={isLoading}>
            <Autocomplete
              open={open}
              onOpen={() => !readOnly && setOpen(true)}
              onClose={() => setOpen(false)}
              disableClearable={disableClear || readOnly}
              sx={{ my: 1 }}
              multiple={false}
              disabled={disabled}
              options={options}
              freeSolo={freeSolo}
              autoSelect
              value={options.find((option: IAutocompleteOption) => value === option[targetId]) || null}
              onChange={
                onChange ||
                ((
                  _event: ChangeEvent<unknown>,
                  option: string | IAutocompleteOption | null,
                  reason: AutocompleteChangeReason,
                ): void => {
                  let value = option ? (typeof option !== "string" ? option[targetId] : option) : null;
                  if (reason === "blur" && typeof option === "string") {
                    const foundOption = options.find(({ title, address }) => option === title || option === address);
                    value = foundOption?.address || option;
                  }
                  form.setValue(name, value, { shouldDirty: true, shouldTouch: true });
                  void form.trigger(name);
                })
              }
              getOptionLabel={(option: IAutocompleteOption | string) =>
                getTitle ? getTitle(option) : typeof option !== "string" ? option.title : option
              }
              renderOption={(props: HTMLAttributes<HTMLLIElement>, option: IAutocompleteOption | string) => {
                const title = getTitle ? getTitle(option) : typeof option !== "string" ? option.title : option;
                return (
                  <li {...props} key={typeof option !== "string" ? option.id : option}>
                    {title}
                  </li>
                );
              }}
              renderInput={(params: AutocompleteRenderInputParams): ReactElement => (
                <TextField
                  {...params}
                  {...field}
                  inputProps={{ ...params.inputProps, readOnly, ...testIdProps }}
                  InputProps={{ ...params.InputProps }}
                  label={localizedLabel}
                  placeholder={localizedPlaceholder}
                  error={!!error}
                  helperText={localizedHelperText}
                  variant={variant}
                  onChange={() => {}}
                  onBlur={() => {
                    if (!readOnly) {
                      field.onBlur();
                    }
                  }}
                  fullWidth
                  {...rest}
                />
              )}
            />
          </ProgressOverlay>
        );
      }}
    />
  );
};
