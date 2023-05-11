import { FC, useMemo } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

import { TokenType } from "@gemunion/types-blockchain";

import { emptyItem, emptyPrice } from "./empty";
import { TokenTypeInput } from "../input/token-type";
import { ContractInput } from "../input/contract";
import { TemplateInput } from "../input/template";
import { AmountInput } from "../input/amount";
import { ITemplateAssetComponent } from "./types";

type TAssetComponentParams = ITemplateAssetComponent & {
  id: string;
};

export interface ITemplateAssetProps {
  prefix: string;
  multiple?: boolean;
  allowEmpty?: boolean;
  autoSelect?: boolean;
  readOnly?: boolean;
  showLabel?: boolean;
  tokenType?: {
    disabledOptions?: Array<TokenType>;
  };
  contract?: {
    data?: {
      contractModule?: Array<string>;
      contractStatus?: Array<string>;
    };
  };
}

export const TemplateAssetInput: FC<ITemplateAssetProps> = props => {
  const {
    prefix = "price",
    multiple = false,
    tokenType,
    contract,
    readOnly,
    allowEmpty,
    autoSelect,
    showLabel = true,
  } = props;

  const { formatMessage } = useIntl();
  const form = useFormContext<any>();
  const ancestorPrefix = prefix.split(".").pop() as string;
  const nestedPrefix = `${prefix}.components`;

  const { fields, append, remove } = useFieldArray({ name: nestedPrefix, control: form.control });
  const watchFields = useWatch({ name: nestedPrefix });
  const values: TAssetComponentParams[] = fields.map(
    (field, index) =>
      ({
        ...field,
        ...watchFields[index],
      } as TAssetComponentParams),
  );

  const handleOptionAdd = (): (() => void) => (): void => {
    append((ancestorPrefix === "price" ? emptyPrice : emptyItem).components[0]);
  };

  const handleOptionDelete =
    (i: number): (() => void) =>
    (): void => {
      remove(i);
    };

  return useMemo(
    () => (
      <Box mt={2}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {showLabel ? (
            <Typography sx={{ mr: 1 }}>
              <FormattedMessage id={`form.labels.${ancestorPrefix}`} />
            </Typography>
          ) : null}
          {multiple ? (
            <Tooltip title={formatMessage({ id: "form.tips.create" })}>
              <IconButton size="small" aria-label="add" onClick={handleOptionAdd()}>
                <Add fontSize="large" color="primary" />
              </IconButton>
            </Tooltip>
          ) : null}
        </Box>

        {values?.map((o: TAssetComponentParams, i: number) => (
          <Box key={o.id} mt={1} mb={1} display="flex" justifyContent="space-between" alignItems="center">
            <Box flex={1}>
              <Paper sx={{ p: 2, display: "flex", alignItems: "stretch", flex: 1, flexDirection: "column" }}>
                <TokenTypeInput
                  prefix={`${nestedPrefix}[${i}]`}
                  disabledOptions={tokenType?.disabledOptions}
                  readOnly={readOnly}
                />
                <ContractInput prefix={`${nestedPrefix}[${i}]`} readOnly={readOnly} data={contract?.data} />
                <TemplateInput prefix={`${nestedPrefix}[${i}]`} readOnly={readOnly} autoSelect={autoSelect} />
                <AmountInput prefix={`${nestedPrefix}[${i}]`} readOnly={readOnly} />
              </Paper>
            </Box>

            {multiple && (
              <Box ml={2}>
                <Tooltip title={formatMessage({ id: "form.tips.delete" })}>
                  <span>
                    <IconButton aria-label="delete" onClick={handleOptionDelete(i)} disabled={!i && !allowEmpty}>
                      <Delete />
                    </IconButton>
                  </span>
                </Tooltip>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    ),
    [tokenType?.disabledOptions, readOnly, values],
  );
};
