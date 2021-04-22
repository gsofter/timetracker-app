import * as React from 'react';
import { Fill, Slot } from '@workbench-stack/components';

export const COLUMN_CHART_SLOT_FILL_NAME = 'report-slot-fill';

export const ReportSlot = (props) => {
    return (
        <div>
            <Slot name={COLUMN_CHART_SLOT_FILL_NAME} fillProps={{ active: true, ...props }} />
        </div>
    );
};

export const ReportFill = ({ title, children, ...rest }) => {
    return (
        <Fill {...rest} name={COLUMN_CHART_SLOT_FILL_NAME}>
            {children}
        </Fill>
    );
};
