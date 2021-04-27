import * as React from 'react';
import { Fill, Slot } from '@workbench-stack/components';

export const REPORT_SLOT_FILL_NAME = 'report-slot-fill';

export const ReportSlot = (props) => {
    return (
        <div>
            <Slot name={REPORT_SLOT_FILL_NAME} fillProps={{ active: true, ...props }} />
        </div>
    );
};

export const ReportFill = ({ children, ...rest }) => {
    return (
        <Fill {...rest} name={REPORT_SLOT_FILL_NAME}>
            {children}
        </Fill>
    );
};
