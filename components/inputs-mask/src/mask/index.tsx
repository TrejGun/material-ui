import { FC } from "react";
import { TextInput } from "@gemunion/mui-inputs-core";

import { MaskedInputWrapper } from "./wrapper";

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
  formatValue?: (values: any) => string | number;
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
  const { name, formatValue, normalizeValue, value: _value, InputProps, readOnly, ...rest } = props;

  return (
    <TextInput
      name={name}
      normalizeValue={normalizeValue}
      onChange={() => {}}
      InputProps={{
        ...InputProps,
        inputComponent: MaskedInputWrapper as any,
        inputProps: {
          formatValue,
          readOnly,
          ...rest,
        },
      }}
    />
  );
};
