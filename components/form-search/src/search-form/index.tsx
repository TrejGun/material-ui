import { FC } from "react";
import { Collapse, Grid } from "@mui/material";

import { AutoSave, FormWrapper } from "@gemunion/mui-form";
import { SearchInput } from "@gemunion/mui-inputs-core";

interface ICommonSearchFormProps {
  autosave?: boolean;
  onSubmit: (values: any) => Promise<void>;
  initialValues: any;
  open?: boolean;
}

export const CommonSearchForm: FC<ICommonSearchFormProps> = props => {
  const { autosave = true, onSubmit, initialValues, open = false, children } = props;

  const { query } = initialValues;
  const fixedValues = { query };

  return (
    <FormWrapper initialValues={fixedValues} onSubmit={onSubmit} showButtons={false} showPrompt={false}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <SearchInput name="query" data-testid="CommonSearchInput" />
        </Grid>
      </Grid>
      <Collapse in={open}>
        <Grid container spacing={2}>
          {children}
        </Grid>
      </Collapse>
      {autosave ? <AutoSave onSubmit={onSubmit} /> : null}
    </FormWrapper>
  );
};
