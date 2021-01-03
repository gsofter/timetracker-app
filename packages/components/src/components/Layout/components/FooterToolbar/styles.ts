import { IThemeState, getTokenColorsScopeSettings } from '../../../Themes/redux';
import { GlobalThemeSettings } from '../default-styles';


export const styleSheet = {
    footerToolbarStyle: ({ theme, prefixCls }: { theme: IThemeState, prefixCls: string }) => {
        const { antPrefix, componentBackground, borderColorSplit, shadow1Up } = GlobalThemeSettings;

        // less variables
        const proFooterBarPrefixCls = `${antPrefix}-pro-footer-bar`;


        return {
            [`& .${proFooterBarPrefixCls}`]: {
                position: 'fixed',
                right: '0',
                bottom: '0',
                'z-index': '99',
                display: 'flex',
                width: '100%',
                'align-items': 'center',
                padding: '0 24px',
                'line-height': '44px',
                background: `${componentBackground}`,
                'border-top': `1px solid ${borderColorSplit}`,
                'box-shadow': `${shadow1Up}`,
                '&-left': {
                    flex: '1',
                },

                '&-right': {
                    '> *': {
                        'margin-right': '8px',
                        '&:last-child': {
                            margin: '0',
                        }
                    }
                }
            },
        };
    },
}