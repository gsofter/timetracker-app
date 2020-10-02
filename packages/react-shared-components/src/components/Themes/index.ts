import theme from './module';
import { Feature } from '@common-stack/client-react';

export * from './containers';
export * from './redux';
export * from './generated-types';

export default new Feature(theme);
