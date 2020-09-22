

import { Feature } from './node_modules/@common-stack/client-react';
import { themeReducer } from './redux';

export default new Feature({
   reducer: {theme: themeReducer},
});
