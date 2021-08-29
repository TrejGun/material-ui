import React, { FC } from "react";

import { Theme, useMediaQuery } from "@material-ui/core";

import { ITextInputProps, TextInput } from "../text";
import { useStyles } from "./styles";

export type ITextAreaProps = ITextInputProps;

export const TextArea: FC<ITextAreaProps> = props => {
  const classes = useStyles();
  const isSmallScreen = useMediaQuery<Theme>(theme => theme.breakpoints.down("sm"));

  return <TextInput classes={classes} multiline rows={isSmallScreen ? 2 : 5} maxRows={Infinity} {...props} />;
};
