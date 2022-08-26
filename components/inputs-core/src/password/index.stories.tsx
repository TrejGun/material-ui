import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Story } from "@storybook/react";

import { TestIdProvider } from "@gemunion/provider-test-id";

import { IPasswordInputProps, PasswordInput } from "./index";

const i18n = {
  "form.labels.password": "Password",
  "form.placeholders.password": "******",
};

export default {
  title: "Input/Password",
  component: PasswordInput,
  decorators: [
    (Story: Story): ReactElement => (
      <TestIdProvider testId="password">
        <IntlProvider locale="en" messages={i18n}>
          <FormProvider {...useForm({ defaultValues: { password: "" } })}>
            <Story />
          </FormProvider>
        </IntlProvider>
      </TestIdProvider>
    ),
  ],
};

const Template: Story<IPasswordInputProps> = args => <PasswordInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "password",
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: "password",
  disabled: true,
};
