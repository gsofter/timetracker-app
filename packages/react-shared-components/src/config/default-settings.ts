import { Settings as ProSettings } from '@admin-layout/components';


type DefaultSettings = Partial<ProSettings> & {

}


const proSettings: DefaultSettings = {
    navTheme: 'dark',
    primaryColor: '#1890ff',
    layout: 'side',
    contentWidth: 'Fluid',
    fixedHeader: false,
    fixSiderbar: true,
    colorWeak: false,
    title: 'CDMBase LLC',
    iconfontUrl: '',
}

export type { DefaultSettings };

export default proSettings;
