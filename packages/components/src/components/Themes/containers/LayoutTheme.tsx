import * as React from 'react';
import {  useSelector } from 'react-redux';
import { ThemeProvider as FelaThemeProvider } from 'react-fela';
import { IThemeSettings } from '../interfaces';
import { PureSettings } from '../../Layout/components/defaultSettings';
import { THEMES } from '../constants';
import { merge } from 'lodash';

function getTheme(name: string) {
  for (let i = 0; i < THEMES.length; i++) {
    if (THEMES[i].name === name) {
      return THEMES[i];
    }
  }
}

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = React.useState('dark') // Default theme is light

  const navTheme = useSelector<{ settings: PureSettings }, string>(state => state.settings.navTheme);
  const primaryColor = useSelector<{ settings: PureSettings }, string>(state => state.settings.primaryColor);
  // On mount, read the preferred theme from the persistence.
  React.useEffect(() => {
    setThemeName(navTheme);
  }, [navTheme]);

  // To toggle among other theme modes
  const toggle = () => {

  }

  // Filter the styles based on the theme selected
  const theme: IThemeSettings = merge(getTheme(themeName).defaultSettings, {  colors: { primaryColor } } );

  return (
    <FelaThemeProvider theme={{ ...theme }}>
      {children}
    </FelaThemeProvider>
  )
}
