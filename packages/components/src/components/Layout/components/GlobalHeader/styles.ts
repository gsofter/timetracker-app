import { IThemeState, getTokenColorsScopeSettings } from '../../../Themes/redux';
import { GlobalThemeSettings, LocalThemeSettings} from '../default-styles';


export const styleSheet = {
    globalHeaderStyle: ({ theme, prefixCls }: { theme: IThemeState, prefixCls: string }) => {
        const { antPrefix, componentBackground, layoutSiderBackground /**btnPrimaryColor,**/ } = GlobalThemeSettings;
        const { proLayoutHeaderHeight } = LocalThemeSettings;
        // const { defaultSettings: { colors: { primaryColor } } } = theme;
        const primaryColor = '#fff'
        // less variables
        const proLayoutGlobalHeaderPrefixCls = `${antPrefix}-pro-global-header`;
        const proLayoutHeaderBg = componentBackground;
        const btnPrimaryColor = primaryColor;
        const proLayoutHeaderBoxShadow = '0 1px 4px rgba(0, 21, 41, 0.08)';

        return {
            [`& .${proLayoutGlobalHeaderPrefixCls}`]: {
                position: 'relative',
                display: 'flex',
                'align-items': 'center',
                height: '100%',
                padding: '0 16px',
                background: `${proLayoutHeaderBg}`,
                'box-shadow': `${proLayoutHeaderBoxShadow}`,
                '> *': {
                    height: '100%',
                },

                '&-collapsed-button': {
                    display: 'flex',
                    'align-items': 'center',
                    'margin-left': '16px',
                    'font-size': '20px',
                },

                '&-layout': {
                    '&-mix': {
                        'background-color': `${layoutSiderBackground}`,
                        [`& .${proLayoutGlobalHeaderPrefixCls}-logo`]: {
                            '& h1': {
                                color: `${btnPrimaryColor}`,
                            }
                        },
                        '& .anticon': {
                            color: `${btnPrimaryColor}`,
                        }
                    }
                },
                '&-logo': {
                    position: 'relative',
                    overflow: 'hidden',
                    '& a': {
                        display: 'flex',
                        'align-items': 'center',
                        height: '100%',
                        '& img': {
                            height: '28px',
                        },
                        '& h1': {
                            height: '32px',
                            // margin: '0 0 0 8px',
                            margin: '0 0 0 12px',
                            color: `${primaryColor}`,
                            'font-weight': '600',
                            'font-size': '18px',
                            'line-height': '32px',
                        }
                    }
                },
                '&-menu': {
                    '& .anticon': {
                        'margin-right': '8px',
                    },
                    [`& .${antPrefix}-dropdown-menu-item`]: {
                        'min-width': '160px',
                    }
                },

                '& .dark': {
                    height: `${proLayoutHeaderHeight}`,
                    '& .action': {
                        color: 'rgba(255, 255, 255, 0.85)',
                        '> i': {
                            color: 'rgba(255, 255, 255, 0.85)',
                        },
                        '&:hover': {
                            background: `${primaryColor}`,
                        },
                        '&.opened': {
                            background: `${primaryColor}`,
                        },
                        [`& .${antPrefix}-badge`]: {
                            color: 'rgba(255, 255, 255, 0.85)',
                        }
                    }
                }
            },
        };
    },
};
