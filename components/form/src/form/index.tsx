import { FC, PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";

import { useDeepCompareEffect } from "@gemunion/react-hooks";
import { useLicense } from "@gemunion/provider-license";
import { TestIdProvider } from "@gemunion/provider-test-id";

import { PromptIfDirty } from "../prompt";
import { FormButtons } from "../buttons";
import { useYupValidationResolver } from "../hook";

interface IFormWrapperProps<T> {
  showButtons?: boolean;
  showPrompt?: boolean;
  showDebug?: boolean;
  submit?: string;
  onSubmit: (values: T, form?: any) => Promise<void>;
  className?: string;
  initialValues: T;
  enableReinitialize?: boolean;
  validationSchema?: any;
  formSubmitButtonRef?: any;
  innerRef?: any;
  validate?: (data: any) => Promise<any>;
  testId?: string;
}

export const FormWrapper: FC<PropsWithChildren<IFormWrapperProps<any>>> = props => {
  const {
    children,
    initialValues,
    enableReinitialize = true,
    onSubmit,
    showButtons,
    showDebug,
    showPrompt,
    submit,
    formSubmitButtonRef,
    innerRef,
    className,
    validationSchema,
    validate,
    testId,
  } = props;

  const license = useLicense();

  const resolver = validate
    ? useYupValidationResolver(validate)
    : validationSchema
    ? yupResolver(validationSchema)
    : undefined;

  const form = useForm({
    mode: "all",
    defaultValues: initialValues,
    resolver,
  });

  const handleSubmit = async (data: any, e: any): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();
    const values = form.getValues();
    await onSubmit(values, form);
  };

  useDeepCompareEffect(() => {
    if (enableReinitialize) {
      form.reset(initialValues);
    }
  }, [enableReinitialize, initialValues]);

  if (!license.isValid()) {
    return null;
  }

  const testIdProps = testId ? { "data-testid": `${testId}-form` } : {};

  return (
    <TestIdProvider testId={testId}>
      <Box sx={{ mb: 2 }}>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className={className} ref={innerRef} {...testIdProps}>
            <PromptIfDirty visible={showPrompt} />

            {children}

            <FormButtons
              ref={formSubmitButtonRef}
              visible={showButtons}
              showDebug={showDebug}
              submit={submit}
              handleSubmit={form.handleSubmit(handleSubmit)}
            />
          </form>
        </FormProvider>
      </Box>
    </TestIdProvider>
  );
};
