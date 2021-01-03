import { IThemeState, getTokenColorsScopeSettings } from '../../../Themes/redux';
import { GlobalThemeSettings } from '../default-styles';


export const styleSheet = {
  globalFooter: ({ theme, prefixCls }: { theme: IThemeState, prefixCls: string }) => {
    const { antPrefix, fontSizeBase } = GlobalThemeSettings;

    // less variables
    const proGlobalFooterPRefixCls = `${antPrefix}-pro-global-footer`;
    const textColorSecondary = getTokenColorsScopeSettings(theme, 'text.secondary').foreground;
    const textColor = getTokenColorsScopeSettings(theme, 'text').foreground;

    return {
      [`& .${proGlobalFooterPRefixCls}`]: {
        margin: '48px 0 24px 0',
        padding: '0 16px',
        'text-align': 'center',

        '&-links': {
          'margin-bottom': ' 8px',

          '& a': {
            color: `${textColorSecondary}`,
            transition: 'all 0.3s',

            '&:not(:last-child)': {
              'margin-right': '40px',
            },

            '&:hover': {
              color: `${textColor}`,
            },
          },
        },

        '&-copyright': {
          color: `${textColorSecondary}`,
          'font-size': `${fontSizeBase}`,
        },
      },
    };
  },
};
