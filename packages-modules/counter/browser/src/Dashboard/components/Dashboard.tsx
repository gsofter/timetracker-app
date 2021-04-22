import * as React from 'react';
import { PageView } from '@adminide-stack/react-shared-components';
import { ReportSlot } from './Report';

export const Dashboard = (props) => {
    return (
        <>
            <PageView title="Dashboard">
                <ReportSlot {...props}/>
            </PageView>
        </>
    );
};
