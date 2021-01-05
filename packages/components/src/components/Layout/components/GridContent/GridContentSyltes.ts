import { IThemeSettings } from '../../../Themes/interfaces';
import { GlobalThemeSettings } from '../default-styles';


export const styleSheet = {
	gridContent: ({ theme, prefixCls }: { theme: IThemeSettings, prefixCls: string }) => {
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
