

import { Feature } from '@common-stack/client-react';
import SettingsModel from './redux/settings';

export default new Feature({
    reducer: SettingsModel.reducers,
});

