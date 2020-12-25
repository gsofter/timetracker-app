

import { Feature } from '@common-stack/client-react';
import { settingsReducer } from './redux/settings';

export default new Feature({
    reducer: { settings: settingsReducer },
});

