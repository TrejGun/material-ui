import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { Story } from "@storybook/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { TextInput } from "@gemunion/mui-inputs-core";

import { FormDialog, IFormikFormProps } from "./index";

const i18n = {
  "dialogs.edit": "Edit",
  "form.buttons.cancel": "Cancel",
  "form.buttons.ok": "Ok",
  "form.labels.title": "Title",
  "form.placeholders.title": "...",
};

export default {
  title: "Example/Dialog/Form",
  component: FormDialog,
  decorators: [
    (Story: Story): ReactElement => (
      <Router history={createMemoryHistory()}>
        <IntlProvider locale="en" messages={i18n}>
          <Story />
        </IntlProvider>
      </Router>
    ),
  ],
  argTypes: {
    onConfirm: { action: "confirmed" },
    onCancel: { action: "canceled" },
  },
};

const Template: Story<IFormikFormProps<any>> = args => (
  <FormDialog {...args}>
    <TextInput name="title" />
  </FormDialog>
);

export const Simple = Template.bind({});
Simple.args = {
  open: true,
  showButtons: true,
  showPrompt: true,
  message: "dialogs.edit",
  initialValues: {
    title: "Title",
  },
};
