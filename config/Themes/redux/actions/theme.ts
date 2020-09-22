import { THEME_ACTION_TYPES } from '../constants/actionTypes';

export const updateThemeParameter = (key, value) => ({
    type: THEME_ACTION_TYPES.SET_VALUE,
    key,
    value,
});

export const bulkUpdateTheme = value => ({
    type: THEME_ACTION_TYPES.BULK_UPDATE,
    payload: value,
});

export const loadTheme = () => {
    return { type: THEME_ACTION_TYPES.LOAD_THEME };
};

export const setTheme = (themeName) => {
    return { type: THEME_ACTION_TYPES.SET_THEME, themeName };
};

export const setSetting = (setting, value) => {
    return { type: THEME_ACTION_TYPES.SET_SETTING, setting, value };
};
