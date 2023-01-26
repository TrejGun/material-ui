import { FC, Fragment, MouseEvent, ReactElement, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { IconButton, Menu, MenuItem, MenuItemProps, MenuProps, Tooltip } from "@mui/material";
import { Translate } from "@mui/icons-material";

import { useSettings } from "@gemunion/provider-settings";

export interface ILocalizationProps {
  languages: Array<string>;
  icon?: ReactElement;
  menuProps?: MenuProps;
  menuItemProps?: MenuItemProps;
}

export const Localization: FC<ILocalizationProps> = props => {
  const { languages, icon, menuProps = {}, menuItemProps = {} } = props;

  const { formatMessage } = useIntl();
  const settings = useSettings();
  const [anchor, setAnchor] = useState<Element | null>(null);

  const handleLanguageIconClick = (e: MouseEvent): void => {
    setAnchor(e.currentTarget);
  };

  const handleLanguageMenuClose = (): void => {
    setAnchor(null);
  };

  const handleLanguageMenuItemClick = (language: string) => (): void => {
    settings.setLanguage(language);
    document.documentElement.setAttribute("lang", language);
    handleLanguageMenuClose();
  };

  return (
    <Fragment>
      <Tooltip title={formatMessage({ id: "components.header.language.switch" })} enterDelay={300}>
        <IconButton
          color="inherit"
          aria-owns={anchor ? "language-menu" : undefined}
          aria-haspopup="true"
          onClick={handleLanguageIconClick}
          data-testid="switchLanguage"
        >
          {icon || <Translate />}
        </IconButton>
      </Tooltip>
      <Menu id="language-menu" anchorEl={anchor} open={!!anchor} onClose={handleLanguageMenuClose} {...menuProps}>
        {languages.map(language => (
          <MenuItem
            key={language}
            selected={settings.getLanguage() === language}
            onClick={handleLanguageMenuItemClick(language)}
            {...menuItemProps}
          >
            <FormattedMessage id={`enums.language.${language}`} />
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};
