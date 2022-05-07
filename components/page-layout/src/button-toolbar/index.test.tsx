import { render, cleanup } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material";

import { ButtonToolbar } from "./index";

afterEach(cleanup);

describe("<ButtonToolbar />", () => {
  it("renders component", () => {
    const { asFragment } = render(
      <ThemeProvider theme={createTheme()}>
        <ButtonToolbar />
      </ThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
