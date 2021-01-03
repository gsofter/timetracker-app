import { IThemeState, getTokenColorsScopeSettings } from '../../Themes/redux';
import { GlobalThemeSettings } from './default-styles';


export const styleSheet = {
    headerStyle: ({ theme, prefixCls }: { theme: IThemeState, prefixCls: string }) => {
        const { antPrefix } = GlobalThemeSettings;

        // less variables
        const proLayoutFixedHeaderPrefixCls = `${antPrefix}-pro-fixed-header`;


        return {
            [`& .${proLayoutFixedHeaderPrefixCls}`]: {
                'z-index': '9',
                width: '100%',
            },
        };
    },
};