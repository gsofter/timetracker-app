import { Feature } from '@common-stack/client-react';
import TimeTrackerModule from '@admin-layout/timetracker-module-browser';
import { basicModule } from './local-module';

const modules = new Feature(TimeTrackerModule, basicModule);

export default modules;
