import { ChangeEvent, FC } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { BigNumber } from "ethers";

import { EntityInput } from "@gemunion/mui-inputs-entity";

export interface IContractInputProps {
  prefix: string;
  name?: string;
  readOnly?: boolean;
  data?: {
    contractModule?: Array<any>;
    contractStatus?: Array<any>;
  };
}

export const ContractInput: FC<IContractInputProps> = props => {
  const { prefix, name = "contractId", data, readOnly } = props;

  const tokenType = useWatch({ name: `${prefix}.tokenType` });
  const form = useFormContext<any>();

  const handleChange = (_event: ChangeEvent<unknown>, option: any): void => {
    form.setValue(`${prefix}.${name}`, option?.id ?? 0, { shouldDirty: true });
    form.setValue(
      `${prefix}.amount`,
      BigNumber.from(10)
        .pow(option?.decimals)
        .toString(),
    );
    form.setValue(`${prefix}.contract.address`, option?.address ?? "0x");
    form.setValue(`${prefix}.contract.decimals`, option?.decimals ?? 0);
    form.setValue(`${prefix}.contract.symbol`, option?.symbol ?? "");
    form.setValue(`${prefix}.contract.contractType`, option?.contractType ?? "");
    form.setValue(`${prefix}.contract.contractFeatures`, option?.contractFeatures ?? []);
  };

  return (
    <EntityInput
      name={`${prefix}.${name}`}
      controller="contracts"
      data={{
        contractType: [tokenType],
        ...data,
      }}
      onChange={handleChange}
      readOnly={readOnly}
      autoselect
      disableClear
    />
  );
};
