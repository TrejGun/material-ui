import { FC, useRef, useState } from "react";
import { Breakpoint } from "@mui/material";

import { ConfirmationDialog } from "@gemunion/mui-dialog-confirmation";
import { ProgressOverlay } from "@gemunion/mui-page-layout";
import { FormWrapper } from "@gemunion/mui-form";

export interface IFormDialogProps<T> {
  showButtons?: boolean;
  showPrompt?: boolean;
  onConfirm: (values: T, form?: any) => Promise<void>;
  onCancel: () => void;
  message: string;
  data?: any;
  open: boolean;
  initialValues: T;
  validationSchema?: any | (() => any);
  maxWidth?: Breakpoint | false;
  formTestId?: string;
}

export const FormDialog: FC<IFormDialogProps<any>> = props => {
  const { children, onConfirm, initialValues, validationSchema, maxWidth = "lg", formTestId, ...rest } = props;

  const [isLoading, setIsLoading] = useState(false);

  const innerRef = useRef(null) as any;

  const handleSubmit = async (): Promise<void> => {
    if (innerRef && innerRef.current) {
      setIsLoading(true);

      if (typeof innerRef.current.requestSubmit === "function") {
        await new Promise(resolve => {
          innerRef.current.requestSubmit();
          resolve(true);
        });
      } else {
        innerRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
      }

      setIsLoading(false);
    }
  };

  return (
    <ConfirmationDialog onConfirm={handleSubmit} maxWidth={maxWidth} data-testid="DialogForm" {...rest}>
      <ProgressOverlay isLoading={isLoading}>
        <FormWrapper
          onSubmit={onConfirm}
          validationSchema={validationSchema}
          initialValues={initialValues}
          innerRef={innerRef}
          showButtons={false}
          testId={formTestId}
        >
          {children}
        </FormWrapper>
      </ProgressOverlay>
    </ConfirmationDialog>
  );
};
