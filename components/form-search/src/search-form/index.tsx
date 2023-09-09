import { FC, PropsWithChildren } from "react";
import { Collapse, Grid } from "@mui/material";
import { UseFormReturn } from "react-hook-form";

import { AutoSave, FormWrapper } from "@gemunion/mui-form";
import { SearchInput } from "@gemunion/mui-inputs-core";

interface ICommonSearchFormProps {
  onSubmit: (values: any, form: UseFormReturn) => Promise<void>;
  initialValues: any;
  autosave?: boolean;
  awaitingFieldsNames?: string[];
  open?: boolean;
  name?: string;
  testId?: string;
}

export const CommonSearchForm: FC<PropsWithChildren<ICommonSearchFormProps>> = props => {
  const {
    onSubmit,
    awaitingFieldsNames,
    initialValues,
    name = "query",
    autosave = true,
    open = false,
    testId,
    children,
  } = props;

  return (
    <FormWrapper
      initialValues={initialValues}
      onSubmit={onSubmit}
      showButtons={false}
      showPrompt={false}
      testId={testId || "CommonSearchForm"}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <SearchInput name={name} data-testid="CommonSearchInput" />
        </Grid>
      </Grid>
      <Collapse in={open}>{children}</Collapse>
      {autosave ? <AutoSave onSubmit={onSubmit} awaitingFieldsNames={awaitingFieldsNames} /> : null}
    </FormWrapper>
  );
};
