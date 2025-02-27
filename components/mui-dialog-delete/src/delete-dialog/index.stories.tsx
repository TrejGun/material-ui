import { IntlProvider } from "react-intl";
import { Meta, StoryObj } from "@storybook/react";

import { SettingsProvider } from "@ethberry/provider-settings";

import { DeleteDialog } from "./index";

const i18n = {
  "dialogs.delete": "Delete `{title}`?",
  "dialogs.confirmation": "Please confirm",
  "form.buttons.cancel": "Cancel",
  "form.buttons.ok": "Ok",
};

export default {
  title: "Dialog/Delete",
  component: DeleteDialog,
  decorators: [
    Story => (
      <SettingsProvider>
        <IntlProvider locale="en" messages={i18n}>
          <Story />
        </IntlProvider>
      </SettingsProvider>
    ),
  ],
  argTypes: {
    onConfirm: { action: "confirmed" },
    onCancel: { action: "canceled" },
  },
} as Meta<typeof DeleteDialog>;

type Story = StoryObj<typeof DeleteDialog>;

export const Simple: Story = {
  render: args => <DeleteDialog {...args}>some text</DeleteDialog>,
  args: {
    open: true,
    initialValues: {
      id: 1,
      title: "Title",
    },
  },
};
