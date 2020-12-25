import { Reducer } from 'redux';
import defaultSettings, { DefaultSettings } from '../config/default-settings';


// Note: We customize reducer part as AntPro uses inbuild way.
const updateColorWeak: (colorWeak: boolean) => void = (colorWeak) => {
    // @sri to avoid breaking during SSR, split into to checks
    if (typeof window !== 'undefined') {
        const root = document.getElementById('root');
        if (root) {
            root.className = colorWeak ? 'colorWeak' : '';
        }
    }
};

interface SettingsActionPayload {
    colorWeak: any;
    contentWidth: any;
}
const settingsReducer = (state = defaultSettings, { type, payload = {} }: { type: string, payload: DefaultSettings }) => {
    switch (type) {
        case 'settings/changeSetting':
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
        default:
            return state;
    }
}

export { settingsReducer };
