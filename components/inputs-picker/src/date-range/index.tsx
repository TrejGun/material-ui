import { FC, Fragment, ReactElement } from "react";
import { useIntl } from "react-intl";
import { getIn, useFormikContext } from "formik";
import { Box, TextField, TextFieldProps } from "@mui/material";
import { DateRange, DateRangePicker } from "@mui/lab";

import { useStyles } from "./styles";

interface IDateTimeInputProps {
  name: string;
  readOnly?: boolean;
  required?: boolean;
  variant?: "standard" | "filled" | "outlined";
  onChange?: (dateRange: DateRange<Date> | null) => void;
}

export const DateRangeInput: FC<IDateTimeInputProps> = props => {
  const { name, variant = "standard", ...rest } = props;
  const classes = useStyles();

  const suffix = name.split(".").pop() as string;

  const formik = useFormikContext<any>();
  const value = getIn(formik.values, name);

  const { formatMessage } = useIntl();

  return (
    <DateRangePicker
      className={classes.root}
      inputFormat="MM/dd/yyyy"
      startText={formatMessage({ id: `form.labels.${suffix}Start` })}
      endText={formatMessage({ id: `form.labels.${suffix}End` })}
      value={value}
      onChange={(dateRange: DateRange<Date> | null): void => {
        formik.setFieldValue(name, dateRange);
      }}
      renderInput={(startProps: TextFieldProps, endProps: TextFieldProps): ReactElement => {
        return (
          <Fragment>
            <TextField {...startProps} name={`${name}Start`} variant={variant} onBlur={formik.handleBlur} fullWidth />
            <Box sx={{ mx: 1 }}> &raquo; </Box>
            <TextField {...endProps} name={`${name}End`} variant={variant} onBlur={formik.handleBlur} fullWidth />
          </Fragment>
        );
      }}
      {...rest}
    />
  );
};