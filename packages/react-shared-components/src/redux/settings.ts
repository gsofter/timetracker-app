import { Reducer } from 'redux';
import defaultSettings, { DefaultSettings } from '../config/default-settings';

export interface SettingModelType {
    namespace: 'settings';
    state: DefaultSettings;
    reducers: {
        settings: Reducer<DefaultSettings>;
    };
}

const updateColorWeak: (colorWeak: boolean) => void = (colorWeak) => {
    // @sri to avoid breaking during SSR, split into to checks
    if (typeof window !== 'undefined') {
        const root = document.getElementById('root');
        if (root) {
            root.className = colorWeak ? 'colorWeak' : '';
        }
    }
};
const SettingModel: SettingModelType = {
    namespace: 'settings',
    state: defaultSettings,
    reducers: {
        settings(state = defaultSettings, { payload = {} }) {
            const { colorWeak, contentWidth } = payload;
            // @sri to avoid breaking during SSR, split into to checks
            if (state.contentWidth !== contentWidth) {
                if (typeof window !== 'undefined') {
                    window.dispatchEvent(new Event('resize'));
                }
            }
            updateColorWeak(!!colorWeak);
            return {
                ...state,
                ...payload,
            };
        },
    },
};

export default SettingModel;
