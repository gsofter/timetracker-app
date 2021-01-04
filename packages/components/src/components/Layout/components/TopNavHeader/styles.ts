import { getTokenColorsScopeSettings } from '../../../Themes/redux/utils';
import { IThemeState } from '../../../Themes/redux';
import { GlobalThemeSettings, LocalThemeSettings } from '../default-styles';


export const styleSheet = {
    topNavHeader: ({ theme, prefixCls }: { theme: IThemeState, prefixCls: string }) => {
        const { defaultSettings: { colors: { primaryColor }, type: themeName } } = theme;
        const { componentBackground, btnPrimaryColor, antPrefix } = GlobalThemeSettings;

        const headerColor = getTokenColorsScopeSettings(theme, 'header');
        // less variables
        const topNavHeaderPrefixCls = `${antPrefix}-pro-top-nav-header`;
        const headingColor = headerColor.foreground;
        return {
            [`& .${topNavHeaderPrefixCls}`]: {
                position: 'relative',
                width: '100%',
                height: '100%',
                'box-shadow': '0 1px 4px 0 rgba(0, 21, 41, 0.12)',
                transition: 'background 0.3s, width 0.2s',

                [`& .${antPrefix}-menu`]: {
                    background: 'transparent',
                },
                '&.light': {
                    'background-color': `${componentBackground}`,
                    [`& .${topNavHeaderPrefixCls}-logo`]: {
                        '& h1': {
                            color: `${headingColor}`,
                        },
                    },
                    '& .anticon': {
                        color: 'inherit',
                    }
                },
                '&-main': {
                    display: 'flex',
                    height: '100%',
                    'padding-left': '16px',
                    '&-left': {
                        display: 'flex',
                        'min-width': '192px',
                    },
                },

                '& .anticon': {
                    color: `${btnPrimaryColor}`,
                },
                '&-logo': {
                    position: 'relative',
                    'min-width': '165px',
                    height: '100%',
                    overflow: 'hidden',

                    '& img': {
                        display: 'inline-block',
                        height: '32px',
                        'vertical-align': 'middle',
                    },

                    '& h1': {
                        display: 'inline-block',
                        margin: '0 0 0 12px',
                        color: `${btnPrimaryColor}`,
                        'font-weight': '400',
                        'font-size': '16px',
                        'vertical-align': 'top',
                    }
                }
            },
        };
    },
};
