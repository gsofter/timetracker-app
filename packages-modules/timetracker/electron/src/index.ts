import { Feature } from '@common-stack/client-react';
import { timerReducer } from '@admin-layout/timetracker-module-browser/lib/redux/reducers/TimeWidgetReducer';

export default new Feature({ reducer: { timerReducer } });
