import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { FormWrapper } from "@gemunion/mui-form";
import { SnackbarProvider } from "notistack";
import { Story } from "@storybook/react";

import { JwtApiProvider } from "@gemunion/provider-api-jwt";

import { PhotoInput, IPhotoInputProps } from "./index";

const i18n = {
  "form.labels.photo": "Photo",
  "form.placeholders.photo": "Photo",
  "form.labels.title": "Title",
  "form.placeholders.title": "Title",
  "form.buttons.delete": "Delete",
  "form.buttons.cancel": "Cancel",
  "form.buttons.ok": "Ok",
  "dialogs.confirmation": "Please confirm",
  "dialogs.delete": "Delete `{title}`?",
};

export default {
  title: "FileInput/S3/Photo",
  component: PhotoInput,
  decorators: [
    (Story: Story): ReactElement => (
      <JwtApiProvider baseUrl={"http://localhost/"}>
        <IntlProvider locale="en" messages={i18n}>
          <SnackbarProvider>
            <FormWrapper onSubmit={Promise.resolve} initialValues={{ photo: [] }}>
              <Story />
            </FormWrapper>
          </SnackbarProvider>
        </IntlProvider>
      </JwtApiProvider>
    ),
  ],
};

const Template: Story<IPhotoInputProps> = args => <PhotoInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "photo",
};
