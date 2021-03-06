import { IThemeSettings } from '../../../Themes/interfaces';
import { GlobalThemeSettings, LocalThemeSettings } from '../default-styles';
import { getTokenColorsScopeSettings } from '../../../Themes/utils';


export const styleSheet = {
    settingDrawerHandler: ({ theme }: { theme: IThemeSettings }) => {
        const { antPrefix } = GlobalThemeSettings;
        const { colors: { primaryColor, 'popover.background': popoverBackground } } = theme;
        // less variables
        const antProSettingDrawerHandle = `${antPrefix}-pro-setting-drawer-handle`;
        return {
            [`& .${antProSettingDrawerHandle}`]: {
                position: 'absolute',
                top: '240px',
                right: '300px',
                'z-index': '0',
                display: 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                width: '48px',
                height: '48px',
                'font-size': '16px',
                'text-align': 'center',
                background: `${primaryColor}`,
                'border-radius': '4px 0 0 4px',
                cursor: 'pointer',
                'pointer-events': 'auto',
            },
        };
    },
    settingDrawer: ({ theme }: { theme: IThemeSettings }) => {
        const { antPrefix } = GlobalThemeSettings;
        const { colors: { primaryColor, 'popover.background': popoverBackground } } = theme;
        // less variables
        const antProSettingDrawer = `${antPrefix}-pro-setting-drawer`;
        const header = getTokenColorsScopeSettings(theme, 'header');
        const headingColor = header.foreground;
        const menuDarkBg = popoverBackground;
        return {
            [`& .${antProSettingDrawer}`]: {
                '&-content': {
                    position: 'relative',
                    'min- height': '100%',
                    [`& .${antPrefix}-list-item`]: {
                        '& span': {
                            flex: '1',
                        },
                    },
                },
                '&-block-checkbox': {
                    display: 'flex',
                    '&-item': {
                        position: 'relative',
                        'margin-right': '16px',
                        'box-shadow': '0 1px 2.5px 0 rgba(0, 0, 0, 0.18)',
                        'border-radius': '4px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        width: '44px',
                        height: '36px',
                        'background-color': '#f0f2f5',

                        '&::before': {
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '33%',
                            height: '100%',
                            'background-color': '#fff',
                            content: "''",
                        },
                        '&::after': {
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '25%',
                            'background-color': '#fff',
                            content: "''",
                        },

                        // ????????????
                        '&-light': {
                            '&::before': {
                                'background-color': '#fff',
                                content: "''",
                            },
                            '&::after': {
                                'background-color': '#fff',
                            }
                        },

                        // ????????????
                        '&-dark': {
                            '&::before': {
                                'background-color': `${menuDarkBg}`,
                                content: "''",
                                'z-index': '1',
                            },
                            '&::after': {
                                'background-color': '#fff',
                            },
                        },
                        // ??????????????????
                        '&-side': {
                            '&::before': {
                                'background-color': `${menuDarkBg}`,
                                content: "''",
                                'z-index': "1",
                            },
                            '&::after': {
                                'background-color': '#fff',
                            }
                        },

                        // ??????????????????
                        '&-top': {
                            '&::before': {
                                'background-color': 'transparent',
                                content: "''",
                            },
                            '&::after': {
                                'background-color': `${menuDarkBg}`,
                            }
                        },

                        // ??????????????????
                        '&-mix': {
                            '&::before': {
                                'background-color': '#fff',
                                content: "''",
                            },
                            '&::after': {
                                'background-color': `${menuDarkBg}`,
                            },
                        }
                    },
                    '&-selectIcon': {
                        position: 'absolute',
                        bottom: '4px',
                        right: '6px',
                        color: `${primaryColor}`,
                        'font-weight': 'bold',
                        'font-size': '14px',
                        'pointer-events': 'none',
                        '& .action': {
                            color: `${primaryColor}`,
                        }
                    }
                },
                '&-color_block': {
                    display: 'inline-block',
                    width: '38px',
                    height: '22px',
                    margin: '4px',
                    'margin-right': '12px',
                    'vertical-align': 'middle',
                    'border-radius': '4px',
                    cursor: 'pointer',
                },

                '&-title': {
                    'margin-bottom': '12px',
                    color: `${headingColor}`,
                    'font-size': '14px',
                    'line-height': '22px',
                },

                //@sri &-handler need to run seperately

                '&-production-hint': {
                    'margin-top': '16px',
                    'font-size': '12px',
                }
            },
        };
    },
};
