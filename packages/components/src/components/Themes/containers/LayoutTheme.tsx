import * as React from 'react';
import { connect, useSelector } from 'react-redux';
const { compose } = require('redux');
import { ThemeProvider as FelaThemeProvider } from 'react-fela';
import { ITheme } from '../interfaces/theme';
import { PureSettings } from '../../Layout/components/defaultSettings';
import { THEMES } from '../redux/constants';
import { merge } from 'lodash';

export interface IProps {
  settings?: any;
}

function getTheme(name: string) {
  for (let i = 0; i < THEMES.length; i++) {
    if (THEMES[i].name === name) {
      return THEMES[i];
    }
  }
}

// export class LayoutTheme extends React.Component<IProps, {}> {
//   public componentDidMount() {
//   }

//   public render() {
//     const { children, settings } = this.props;
//     const theme = { primaryColor: settings.primaryColor };
//     return (
//       <FelaThemeProvider theme={theme}>
//         <>{children}</>
//       </FelaThemeProvider>
//     );
//   }
// }

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = React.useState('dark') // Default theme is light

  const navTheme = useSelector<{ settings: PureSettings }, string>(state => state.settings.navTheme);
  const primaryColor = useSelector<{ settings: PureSettings }, string>(state => state.settings.primaryColor);
  // On mount, read the preferred theme from the persistence.
  React.useEffect(() => {
    setThemeName(navTheme);
  }, [themeName]);

  // To toggle among other theme modes
  const toggle = () => {

  }

  // Filter the styles based on the theme selected
  const theme: ITheme = merge(getTheme(themeName), { defaultSettings: { colors: { primaryColor } } });

  return (
    <FelaThemeProvider theme={{ ...theme }}>
      {children}
    </FelaThemeProvider>
  )
}

// export default compose(
//   ...[
//     connect(
//       (state: any) => ({
//         settings: state.settings, //@sri modified ...
//       }),
//     ),
//   ],
// )(LayoutTheme);
