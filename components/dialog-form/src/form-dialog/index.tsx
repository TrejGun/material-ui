import { FC, MouseEvent, PropsWithChildren, ReactElement, useRef, useState } from "react";
import { Breakpoint } from "@mui/material";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { ConfirmationDialog } from "@gemunion/mui-dialog-confirmation";
import { ProgressOverlay } from "@gemunion/mui-page-layout";
import { FormWrapper } from "@gemunion/mui-form";

export interface IFormDialogProps<T> {
  showButtons?: boolean;
  showPrompt?: boolean;
  showDebug?: boolean;
  onConfirm: (values: T, form?: any) => Promise<void>;
  onCancel: () => void;
  message: string;
  data?: any;
  open: boolean;
  initialValues: T;
  validationSchema?: any | (() => any);
  maxWidth?: Breakpoint | false;
  testId?: string;
  action?: ReactElement | null;
}

export const FormDialog: FC<PropsWithChildren<IFormDialogProps<any>>> = props => {
  const {
    children,
    onConfirm,
    initialValues,
    validationSchema,
    maxWidth = "lg",
    testId,
    showPrompt,
    showDebug,
    ...rest
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const innerRef = useRef<HTMLFormElement | null>(null) as any;

  const onFormStateChange = async (form: UseFormReturn<FieldValues, any>) => {
    const {
      formState: { isDirty, isValid },
    } = form;

    setIsDirty(isDirty);
    setIsValid(isValid);

    return Promise.resolve();
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();

    if (innerRef && innerRef.current) {
      setIsLoading(true);
      innerRef.current.dispatchEvent(new Event("submit", { bubbles: false, cancelable: true }));
      setIsLoading(false);
    }

    return Promise.resolve();
  };

  return (
    <ConfirmationDialog
      onConfirm={handleSubmit}
      maxWidth={maxWidth}
      disabled={!isDirty || !isValid}
      data-testid="DialogForm"
      {...rest}
    >
      <ProgressOverlay isLoading={isLoading}>
        <FormWrapper
          onSubmit={onConfirm}
          onFormStateChange={onFormStateChange}
          validationSchema={validationSchema}
          initialValues={initialValues}
          innerRef={innerRef}
          showButtons={false}
          showPrompt={showPrompt}
          showDebug={showDebug}
          testId={testId}
        >
          {children}
        </FormWrapper>
      </ProgressOverlay>
    </ConfirmationDialog>
  );
};
