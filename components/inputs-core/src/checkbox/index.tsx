import { FC, ReactElement } from "react";
import { useIntl } from "react-intl";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";
import { useStyles } from "./styles";

import { useTestId } from "@gemunion/mui-form";

export interface ICheckboxInputProps extends CheckboxProps {
  name: string;
  label?: string | number | ReactElement;
}

export const CheckboxInput: FC<ICheckboxInputProps> = props => {
  const { name, label, ...rest } = props;
  const classes = useStyles();

  const { testId } = useTestId();

  const suffix = name.split(".").pop() as string;

  const form = useFormContext<any>();

  const { formatMessage } = useIntl();
  const localizedLabel = label === void 0 ? formatMessage({ id: `form.labels.${suffix}` }) : label;

  const testIdProps = testId ? { "data-testid": `${testId}-${name}` } : {};

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormControlLabel
          classes={classes}
          control={<Checkbox {...field} checked={field.value} {...testIdProps} {...rest} />}
          label={localizedLabel}
        />
      )}
    />
  );
};
