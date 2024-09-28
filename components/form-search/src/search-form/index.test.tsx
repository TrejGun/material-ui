import { IntlProvider } from "react-intl";
import { cleanup, render } from "@testing-library/react";
import { createTheme, ThemeProvider } from "@mui/material";
import { MemoryRouter } from "react-router-dom";

import { LicenseProvider } from "@ethberry/provider-license";

import { CommonSearchForm } from "./index";

afterEach(cleanup);

const i18n = {
  "form.labels.query": "Query",
  "form.placeholders.query": "Query",
  "form.hints.prompt": "Prompt",
};

describe("<CommonSearchForm />", () => {
  it("renders component", () => {
    const container = document.createElement("div");
    document.body.append(container);

    const formProps = {
      onSubmit: () => Promise.resolve(),
      initialValues: {
        number: 50,
      },
    };

    const { asFragment } = render(
      <LicenseProvider licenseKey={process.env.STORYBOOK_ETHBERRY_LICENSE}>
        <MemoryRouter>
          <ThemeProvider theme={createTheme()}>
            <IntlProvider locale="en" messages={i18n}>
              <CommonSearchForm {...formProps} />
            </IntlProvider>
          </ThemeProvider>
        </MemoryRouter>
      </LicenseProvider>,
      { container },
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
