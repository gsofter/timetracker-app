import { IThemeSettings } from '../../Themes/interfaces';
import { GlobalThemeSettings } from './default-styles';


export const styleSheet = {
    headerStyle: ({ theme }: { theme: IThemeSettings }) => {
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