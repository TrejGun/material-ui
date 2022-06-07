import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { FormWrapper } from "@gemunion/mui-form";
import { Story } from "@storybook/react";

import { ICheckboxInputProps, CheckboxInput } from "./index";

const i18n = {
  "form.labels.checkbox": "Checkbox",
};

export default {
  title: "Input/Checkbox",
  component: CheckboxInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <FormWrapper onSubmit={Promise.resolve} initialValues={{ checkbox: false }}>
          <Story />
        </FormWrapper>
      </IntlProvider>
    ),
  ],
};

const Template: Story<ICheckboxInputProps> = args => <CheckboxInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "checkbox",
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: "checkbox",
  disabled: true,
};

export const Label = Template.bind({});
Disabled.args = {
  name: "checkbox",
  label: "label",
};
