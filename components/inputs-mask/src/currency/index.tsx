import { FC } from "react";
import { useFormContext } from "react-hook-form";

import { MaskedInput } from "../mask";

export interface ICurrencyInputProps {
  allowNegative?: boolean;
  fractionalDelimiter?: string;
  fillByZeros?: string;
  name: string;
  readOnly?: boolean;
  precision?: number;
  symbol?: string;
  thousandsSeparator?: string;
}

export const CurrencyInput: FC<ICurrencyInputProps> = props => {
  const {
    allowNegative = false,
    fractionalDelimiter = ".",
    fillByZeros = false,
    name,
    precision = 2,
    symbol = "$",
    thousandsSeparator = " ",
    ...rest
  } = props;

  const formatValue = (value: string): number => Number.parseFloat(value) * 10 ** precision;
  const normalizeValue = (value: number): string => (value ? (value / 10 ** precision).toString() : "0");

  const form = useFormContext<any>();
  const value = form.getValues(name);
  const formattedValue = normalizeValue(value);

  const maskProps = {
    mask: Number,
    thousandsSeparator,
    scale: precision, // digits after decimal
    signed: allowNegative, // allow negative
    normalizeZeros: true, // appends or removes zeros at ends
    radix: fractionalDelimiter, // fractional delimiter
    padFractionalZeros: fillByZeros, // if true, then pads zeros at end to the length of scale
  };

  const mask = [
    {
      mask: "", // To hide symbol if field is empty
    },
    {
      mask: `${symbol} num`,
      blocks: {
        num: maskProps,
      },
    },
    {
      mask: `-${symbol} num`,
      blocks: {
        num: maskProps,
      },
    },
  ];

  const updateValue = (maskedRef: any): void => {
    if (maskedRef && maskedRef.current) {
      const currencyAmount = formatValue(maskedRef.current.unmaskedValue);
      form.setValue(name, currencyAmount);
    }
  };

  return (
    <MaskedInput
      mask={mask}
      name={name}
      updateValue={updateValue}
      useMaskedValue={false}
      value={formattedValue}
      {...rest}
    />
  );
};
