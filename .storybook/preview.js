import {CssBaseline} from "@material-ui/core";
import {createTheme, ThemeProvider} from "@material-ui/core/styles";

export const decorators = [
  Story => (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    page: null
  }
};
