import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import { TextInput } from "@gemunion/mui-inputs-core";
import { useTestId } from "@gemunion/provider-test-id";

export interface IMaskedInputProps {
  name: string;
  thousandSeparator?: string;
  valueIsNumericString?: boolean;
  prefix?: string;
  decimalSeparator?: string;
  decimalScale?: number;
  allowNegative?: boolean;
  allowLeadingZeros?: boolean;
  readOnly?: boolean;
  formatValue: (values: any) => string | number;
  normalizeValue?: (value: any) => string | number;
  InputProps?: any;
  defaultValue?: any;
  value?: any;
  displayType?: "input" | "text";
  type?: "text" | "tel" | "password";
  format?: string;
  mask?: string;
}

export const MaskedInput: FC<IMaskedInputProps> = props => {
  const { name, formatValue, normalizeValue, value: _value, readOnly, ...rest } = props;

  const form = useFormContext<any>();

  const { testId } = useTestId();
  const testIdProps = testId ? { "data-testid": `${testId}-${props.name}` } : {};

  const onValueChange = (values: any) => {
    form.setValue(props.name, formatValue(values.value));
  };

  return (
    <NumericFormat
      customInput={TextInput}
      onValueChange={onValueChange}
      name={name}
      normalizeValue={normalizeValue}
      formatValue={formatValue}
      readOnly={readOnly}
      onChange={() => {}}
      {...rest}
      {...testIdProps}
    />
  );
};
