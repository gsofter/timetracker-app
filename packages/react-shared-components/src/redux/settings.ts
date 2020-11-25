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
    const root = document.getElementById('root');
    if (root) {
        root.className = colorWeak ? 'colorWeak' : '';
    }
};
const SettingModel: SettingModelType = {
    namespace: 'settings',
    state: defaultSettings,
    reducers: {
        settings(state = defaultSettings, { payload = {}}) {
            const { colorWeak, contentWidth } = payload;

            if (state.contentWidth !== contentWidth && window.dispatchEvent) {
                window.dispatchEvent(new Event('resize'));
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
