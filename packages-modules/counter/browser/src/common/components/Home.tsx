import * as React from 'react';
import { PageContainer } from '@admin-layout/components';
import { Translate } from '@admin-layout/react-shared-components';
export const Home = () => (
  <PageContainer>
    <h1>admin-layout</h1>
    <div>transte {Translate('app.settings.menuMap.basic')}</div>
  </PageContainer>
);
