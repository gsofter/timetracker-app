import * as React from 'react';
import { HelloChild } from './HelloChild';
import { PageContainer } from '@admin-layout/components';

const Hello = () => (
  <PageContainer>
    <div>Hello</div>
    <HelloChild />
  </PageContainer>
);

export { Hello };
