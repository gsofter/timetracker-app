import * as React from 'react';
import { Card } from 'antd';
import { Fill, Slot } from '@workbench-stack/components';

export interface IIntegrationsSlotProps {
    title?: string;
}

export function IntegrationsSlot(props: IIntegrationsSlotProps) {
    return (
        <div>
            {props.title && <h3 style={{ fontSize: '24px' }}>{props.title}</h3>}
            <Slot name="IntegrationSlot.Card" />
        </div>
    );
}

export function IntegrationCard({ title, children, ...rest }) {
    return (
        <Fill {...rest} name="IntegrationSlot.Card">
            <div>
                <h4 style={{ fontSize: '18px' }}>{title}</h4>
                {children}
            </div>
        </Fill>
    )
}