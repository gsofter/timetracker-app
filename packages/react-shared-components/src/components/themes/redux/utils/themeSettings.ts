import * as R from './node_modules/ramda';
import * as cookie from './node_modules/js-cookie';
import { THEMES, COLORS } from '../constants';

export const getTheme = (themeName) => {
  const theme = R.find(R.propEq('name', themeName))(THEMES);
  const themeSetting = cookie.get(`workbench.colorTheme.${themeName}`);

  if (theme) {
    if (themeSetting) {
      try {
        theme.settings = JSON.parse(themeSetting);
      } catch (e) {
        console.log(e);
        theme.settings = {};
      }
    }
    return theme;
  } else {
    return THEMES[0];
  }
}

export const setThemeSettings = (themeName, settings) => {
  const theme = getTheme(themeName);

  theme.settings = { ...theme.settings, ...settings };
  cookie.set(`workbench.colorTheme.${themeName}`, JSON.stringify(theme.settings), { path: '/' });

  return theme;
};

export const getThemeSetting = (themeName, setting, defaultValue = null) => {
  const theme = getTheme(themeName);

  if (theme.settings && theme.settings[setting]) {
    return theme.settings[setting];
  } else {
    if (!theme.settings) {
      theme.settings = {};
    }

    if (defaultValue) {
      theme.settings[setting] = defaultValue;
      cookie.set(`workbench.colorTheme.${themeName}`, JSON.stringify(theme.settings), { path: '/' });
    }
  }

  return theme.settings[setting];
};

export const getTokenColorsScopeSettings = (theme, scope = null) => {
  const tokenColors = theme.defaultSettings.tokenColors;
  let token = null;

  if (scope && scope !== '') {
    token = R.find(R.propEq('scope', scope))(tokenColors);
  } else {
    token = R.find((r => r.scope === undefined))(tokenColors);
  }

  return token && token.settings;
};
