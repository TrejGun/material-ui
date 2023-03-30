import { FC } from "react";
import { useWatch } from "react-hook-form";

import { EthInput } from "@gemunion/mui-inputs-mask";
import { TokenType } from "@gemunion/types-blockchain";

export interface IAmountInputProps {
  prefix: string;
  name?: string;
  readOnly?: boolean;
}

export const AmountInput: FC<IAmountInputProps> = props => {
  const { prefix, name = "amount", readOnly } = props;

  const tokenType = useWatch({ name: `${prefix}.tokenType` });
  const decimals = useWatch({ name: `${prefix}.contract.decimals` });

  switch (tokenType) {
    case TokenType.NATIVE:
    case TokenType.ERC20:
    case TokenType.ERC1155:
      return <EthInput name={`${prefix}.${name}`} units={decimals} readOnly={readOnly} />;
    case TokenType.ERC721:
    case TokenType.ERC998:
    default:
      return null;
  }
};
