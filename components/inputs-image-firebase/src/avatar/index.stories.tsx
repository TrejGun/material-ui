import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { Formik } from "formik";
import { SnackbarProvider } from "notistack";
import { Story } from "@storybook/react";

import { AvatarInput, IAvatarInputProps } from "./index";

const i18n = {
  "form.labels.avatar": "Avatar",
  "form.placeholders.avatar": "Avatar",
};

export default {
  title: "FileInput/Firebase/Avatar",
  component: AvatarInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <SnackbarProvider>
          <Formik onSubmit={() => {}} initialValues={{ avatar: "" }}>
            <Story />
          </Formik>
        </SnackbarProvider>
      </IntlProvider>
    ),
  ],
};

const Template: Story<IAvatarInputProps> = args => <AvatarInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "avatar",
};