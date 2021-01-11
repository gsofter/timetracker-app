import { IThemeSettings } from '../../../Themes/interfaces';
import { GlobalThemeSettings, LocalThemeSettings } from '../default-styles';
import { getTokenColorsScopeSettings } from '../../../Themes/utils';


export const styleSheet = {
    settingDrawerContent: ({ theme }: { theme: IThemeSettings }) => {
        const { antPrefix } = GlobalThemeSettings;
        // less variables
        const antProSettingDrawer = `${antPrefix}-pro-setting-drawer`;
        return {
            // [`& .${antProSettingDrawer}-content`]: { //@sri not needed in our case.
                '& .theme-color': {
                    'margin-top': '16px',
                    overflow: 'hidden',
                    '& .theme-color-title': {
                        'margin-bottom': '12px',
                        'font-size': '14px',
                        'line-height': '22px',
                    },
                    '& .theme-color-block': {
                        float: 'left',
                        width: '20px',
                        height: '20px',
                        'margin-right': '8px',
                        'margin-top': '8px',
                        color: '#fff',
                        'font-weight': 'bold',
                        'text-align': 'center',
                        'border-radius': '2px',
                        cursor: 'pointer',
                    }
                }
            // },
        };
    },
};
