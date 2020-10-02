import * as cookie from './node_modules/js-cookie';
import { THEME_ACTION_TYPES, THEMES, COLORS } from '../constants';
import { getTheme, setThemeSettings } from '../utils';

export type IThemeState = typeof THEMES[0];

const themeReducer = (state = THEMES[0], action) => {
  switch (action.type) {
    case THEME_ACTION_TYPES.SET_THEME:
      cookie.set('workbench.colorTheme.current', action.themeName, { path: '/' });
      return { ...state, ...getTheme(action.themeName) };

    case THEME_ACTION_TYPES.LOAD_THEME:
      const themeName = cookie.get('workbench.colorTheme.current');
      return { ...state, ...getTheme(themeName) };

    case THEME_ACTION_TYPES.SET_SETTING:
      return { ...state, ...setThemeSettings(state.name, { [action.setting]: action.value }) };

    default:
      return state;
  }
};

export { themeReducer };
