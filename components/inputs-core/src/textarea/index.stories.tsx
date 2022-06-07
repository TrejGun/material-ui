import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { FormWrapper } from "@gemunion/mui-form";
import { Story } from "@storybook/react";

import { ITextAreaProps, TextArea } from "./index";

const i18n = {
  "form.labels.textarea": "Textarea",
  "form.placeholders.textarea": "Lorem ipsum...",
};

export default {
  title: "Input/Textarea",
  component: TextArea,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <FormWrapper onSubmit={Promise.resolve} initialValues={{ textarea: "Lorem ipsum" }}>
          <Story />
        </FormWrapper>
      </IntlProvider>
    ),
  ],
};

const Template: Story<ITextAreaProps> = args => <TextArea {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "textarea",
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: "textarea",
  disabled: true,
};
