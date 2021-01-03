import { IThemeState } from '../../../Themes/redux';
import { GlobalThemeSettings } from '../default-styles';


export const styleSheet = {
	gridContent: ({ theme, prefixCls }: { theme: IThemeState, prefixCls: string }) => {
		const { antPrefix } = GlobalThemeSettings;

		// less variables
		const proLayoutGridContent = `${antPrefix}-pro-grid-content`;

		return {
            [`& .${proLayoutGridContent}`]: {
                width: '100%',
                '&.wide': {
                  'max-width': '1200px',
                  margin: '0 auto',
                },
            }
        };
    },
};
