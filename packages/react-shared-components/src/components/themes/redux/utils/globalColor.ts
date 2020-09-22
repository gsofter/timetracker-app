import { getThemeSetting } from './themeSettings';

const defaultSelectColors = {
  light: {
    background: '#F8F8F8',
    foreground: '#000',
    border: '#A6A6A6',
  },
  dark: {
    background: '#444',
    foreground: '#DDD',
  },
  hc: {
    background: '#000',
    foreground: '#FFF',
    border: '#7fffd4',
  },
};

export const getSelectColor = (theme) => {
  const background = getThemeSetting(theme.name, 'select.background', defaultSelectColors[theme.name].background);
  const foreground = getThemeSetting(theme.name, 'select.foreground', defaultSelectColors[theme.name].foreground);
  const border = getThemeSetting(theme.name, 'select.border', defaultSelectColors[theme.name].border);

  const styles = {
    backgroundColor: background,
    color: foreground,
  };
  if (border) {
    styles['border-color'] = border;
  }

  return styles;
};
