import { Color } from './vscode/color';
import { getTokenColorsScopeSettings } from '../redux';

export const getWorkbenchColors = (theme) => {
  const settings = getTokenColorsScopeSettings(theme);
  let foreground, background;
  if (settings) {
    foreground = settings.foreground;
    background = settings.background;
  }
  if (theme.settings && theme.settings.foreground) {
    foreground = theme.settings.foreground;
  }
  if (theme.settings && theme.settings.background) {
    background = theme.settings.background;
  }

  return {
    color: Color.Format.CSS.formatHex(Color.Format.CSS.parseHex(foreground)),
    backgroundColor: Color.Format.CSS.formatHex(Color.Format.CSS.parseHex(background)),
  };
};
