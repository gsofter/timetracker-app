import { Feature } from '@common-stack/client-react';
import { timerReducer } from '@admin-layout/timetracker-core';

export default new Feature({ reducer: { timerReducer } });
