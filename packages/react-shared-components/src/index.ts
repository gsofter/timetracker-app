import settings from './module';
import { Feature } from '@common-stack/client-react';
export * from './context';
export * from './components';
export * from './locales';
// export * from './interfaces';

export default new Feature(settings);
