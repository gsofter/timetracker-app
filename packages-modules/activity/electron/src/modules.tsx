import { Feature } from '@common-stack/server-core';
import { mainLoadConfigurationPre } from './initialization';

export default new Feature({
    preStartFunc: [mainLoadConfigurationPre],
});
