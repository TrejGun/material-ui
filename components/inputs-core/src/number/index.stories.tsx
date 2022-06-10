import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Story } from "@storybook/react";

import { INumberInputProps, NumberInput } from "./index";

const i18n = {
  "form.labels.number": "Number",
  "form.placeholders.number": "100",
};

export default {
  title: "Input/Number",
  component: NumberInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <FormProvider {...useForm({ defaultValues: { number: 50 } })}>
          <Story />
        </FormProvider>
      </IntlProvider>
    ),
  ],
};

const Template: Story<INumberInputProps> = args => <NumberInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "number",
};

export const Negative = Template.bind({});
Negative.args = {
  name: "number",
  allowNegative: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  name: "number",
  readOnly: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: "number",
  disabled: true,
};
