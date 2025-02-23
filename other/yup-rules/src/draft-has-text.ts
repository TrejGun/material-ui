import { addMethod, string } from "yup";
import { convertFromRaw, EditorState, RawDraftContentState } from "draft-js";

addMethod(string, "draftHasText", function (errorMessage) {
  return this.test("draft-has-text", errorMessage, function (value) {
    const { path, createError } = this;
    const contentState = EditorState.createWithContent(convertFromRaw(JSON.parse(value!) as RawDraftContentState));
    const hasText = contentState.getCurrentContent().hasText();
    return hasText || createError({ path, message: errorMessage });
  });
});

export const draftValidationSchema = string()
  .required("form.validations.valueMissing")
  .draftHasText("form.validations.valueMissing");
