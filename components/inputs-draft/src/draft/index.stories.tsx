import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { Formik } from "formik";
import { Story } from "@storybook/react";
import { LicenseProvider } from "@gemunion/provider-license";
import { rawStateString } from "@gemunion/draft-js-utils";

import { IRichTextFieldProps, RichTextEditor } from "./index";

const i18n = {
  "form.labels.draft": "Draft",
  "form.placeholders.draft": "Draft",
};

export default {
  title: "ReachTextEditor/Draft",
  component: RichTextEditor,
  decorators: [
    (Story: Story): ReactElement => (
      <LicenseProvider licenseKey={process.env.STORYBOOK_GEMUNION_LICENSE as string}>
        <IntlProvider locale="en" messages={i18n}>
          <Story />
        </IntlProvider>
      </LicenseProvider>
    ),
  ],
};

const DraftTemplate: Story<IRichTextFieldProps> = args => (
  <Formik onSubmit={() => {}} initialValues={{}}>
    <RichTextEditor {...args} />
  </Formik>
);

export const Simple = DraftTemplate.bind({});
Simple.args = {
  name: "draft",
};

const DraftDefaultValueTemplate: Story<IRichTextFieldProps> = args => (
  <Formik onSubmit={() => {}} initialValues={{ draft: rawStateString }}>
    <RichTextEditor {...args} />
  </Formik>
);

export const DefaultValue = DraftDefaultValueTemplate.bind({});
DefaultValue.args = {
  name: "draft",
};