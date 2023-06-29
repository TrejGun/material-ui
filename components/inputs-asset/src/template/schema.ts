import { array, mixed, number, object } from "yup";

import { bigNumberValidationSchema } from "@gemunion/yup-rules-eth";
import { TokenType } from "@gemunion/types-blockchain";

export const templateAssetTokenTypeValidationSchema = mixed<TokenType>()
  .oneOf(Object.values(TokenType))
  .required("form.validations.valueMissing");

export const templateAssetContractIdValidationSchema = number()
  .required("form.validations.valueMissing")
  .integer("form.validations.badInput")
  .min(1, "form.validations.rangeUnderflow");

export const templateAssetTemplateIdValidationSchema = number().when("tokenType", {
  is: (tokenType: TokenType) => tokenType !== TokenType.ERC20 && tokenType !== TokenType.NATIVE,
  then: schema =>
    schema
      .min(1, "form.validations.valueMissing")
      .integer("form.validations.badInput")
      .required("form.validations.valueMissing"),
});

export const templateAssetAmountValidationSchema = bigNumberValidationSchema.when("tokenType", {
  is: (tokenType: TokenType) => tokenType !== TokenType.ERC721 && tokenType !== TokenType.ERC998,
  then: () =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    bigNumberValidationSchema.min(1, "form.validations.rangeUnderflow").required("form.validations.valueMissing"),
});

export const templateAssetComponentValidationSchema = object().shape({
  tokenType: templateAssetTokenTypeValidationSchema,
  contractId: templateAssetContractIdValidationSchema,
  templateId: templateAssetTemplateIdValidationSchema,
  amount: templateAssetAmountValidationSchema,
});

export const templateAssetValidationSchema = object().shape({
  components: array().of(templateAssetComponentValidationSchema),
});
