import * as React from 'react';
import { PageContainer } from '@admin-layout/components';
import { useIntl } from 'react-intl';

export const Home = () => {
  const { formatMessage } = useIntl();
  return (
    <PageContainer>
      <h1>admin-layout</h1>
      <div>
        {formatMessage({
          id: 'app.settings.menuMap.basic',
          defaultMessage: 'Hello',
        })}
      </div>
      <div>
        {formatMessage({
          id: 'app.preview.down.block',
          defaultMessage: 'Hello',
        })}
      </div>
    </PageContainer>
  );
};
