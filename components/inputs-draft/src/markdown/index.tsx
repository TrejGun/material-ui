import { FC, useState } from "react";
import { TextFieldProps } from "@mui/material";
import { getIn, useFormikContext } from "formik";
import { useIntl } from "react-intl";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";

import { TToolbarControl } from "@gemunion/mui-rte";
import { TextInput } from "@gemunion/mui-inputs-core";
import { useLicense } from "@gemunion/provider-license";

import { IRichTextInputProps, RichTextInput } from "../input";

const defaultControls = [
  "title",
  "bold",
  "italic",
  "strikethrough",
  "undo",
  "redo",
  "numberList",
  "bulletList",
  "clear",
];

export interface IMarkdownInputProps {
  name: string;
  customControls?: Array<TToolbarControl>;
}

export const MarkdownInput: FC<IMarkdownInputProps & TextFieldProps> = props => {
  const { name, InputLabelProps, customControls = [], ...rest } = props;

  const suffix = name.split(".").pop() as string;

  const license = useLicense();
  const formik = useFormikContext<any>();
  const value = getIn(formik.values, name);

  // Manually handle the TextField's focused state based on the editor's focused state
  const [isFocused, setIsFocused] = useState(false);

  const { formatMessage } = useIntl();
  const localizedPlaceholder = formatMessage({ id: `form.placeholders.${suffix}` });

  const inputProps: IRichTextInputProps = {
    defaultValue: JSON.stringify(markdownToDraft(value)),
    label: localizedPlaceholder,
    onSave: (data: string) => {
      const markdownString = draftToMarkdown(JSON.parse(data));
      formik.setFieldValue(name, markdownString);
    },
    controls: defaultControls.concat(customControls),
  };

  if (!license.isValid()) {
    return null;
  }

  return (
    <TextInput
      name={name}
      focused={isFocused}
      onClick={() => setIsFocused(true)}
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true,
      }}
      InputProps={{
        inputComponent: RichTextInput,
        inputProps: inputProps,
      }}
      onChange={() => {}}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...rest}
    />
  );
};