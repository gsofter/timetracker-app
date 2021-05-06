import * as React from 'react';
import { useState } from 'react';
import { useFela } from 'react-fela';
import { message } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import { useSetting } from '@adminide-stack/react-shared-components';
import { ConfigurationTarget } from '@adminide-stack/core';
import { PaymentsModal } from './PaymentsModal';

export const Payments = (props) => {
    const [visible, setVisible] = useState(false);
    const { css } = useFela();

    const { data: payPeriodConfig, loading: loadPayPeriod, updateConfiguration } = useSetting({
        configKey: 'timetracker.user.payment.payPeriod',
        overrides: { overrideIdentifier: props.value.record.name },
    });

    const { data: payTypeConfig, loading: loadPayType } = useSetting({
        configKey: 'timetracker.user.payment.payType',
        overrides: { overrideIdentifier: props.value.record.name },
    });

    const { data: billRateConfig, loading: loadBillRate } = useSetting({
        configKey: 'timetracker.user.payment.billRate',
        overrides: { overrideIdentifier: props.value.record.name },
    });

    const { data: payRateConfig, loading: loadPayRate } = useSetting({
        configKey: 'timetracker.user.payment.payRate',
        overrides: { overrideIdentifier: props.value.record.name },
    });

    const { data: requireTimesheetApprovalConfig, loading } = useSetting({
        configKey: 'timetracker.user.payment.requireTimesheetApproval',
        overrides: { overrideIdentifier: props.value.record.name },
    });

    const openPaymentModal = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const updatePaymentSettings = async (request) => {
        if (payPeriod !== request.payPeriod) {
            await updateConfiguration({
                updateKey: 'timetracker.user.payment.payPeriod',
                value: request.payPeriod,
                updateOverrides: { overrideIdentifier: props.value.record.name },
                target: ConfigurationTarget.ORGANIZATION,
            });
        }
        if (payType !== request.payType) {
            await updateConfiguration({
                updateKey: 'timetracker.user.payment.payType',
                value: request.payType,
                updateOverrides: { overrideIdentifier: props.value.record.name },
                target: ConfigurationTarget.ORGANIZATION,
            });
        }
        if (billRate !== parseInt(request.billRate, 10)) {
            await updateConfiguration({
                updateKey: 'timetracker.user.payment.billRate',
                value: parseInt(request.billRate, 10) || '',
                updateOverrides: { overrideIdentifier: props.value.record.name },
                target: ConfigurationTarget.ORGANIZATION,
            });
        }
        if (payRate !== parseInt(request.payRate, 10)) {
            await updateConfiguration({
                updateKey: 'timetracker.user.payment.payRate',
                value: parseInt(request.payRate, 10) || '',
                updateOverrides: { overrideIdentifier: props.value.record.name },
                target: ConfigurationTarget.ORGANIZATION,
            });
        }
        if (requireTimesheetApproval !== request.requireTimesheetApproval) {
            await updateConfiguration({
                updateKey: 'timetracker.user.payment.requireTimesheetApproval',
                value: request.requireTimesheetApproval,
                updateOverrides: { overrideIdentifier: props.value.record.name },
                target: ConfigurationTarget.ORGANIZATION,
            });
        }
    };

    const onSubmit = (request, form) => {
        updatePaymentSettings(request).then(() => {
            onClose();
            form.resetFields();
            message.success('Payment details updated successfully');
        });
    }

    if (loading || loadPayPeriod || loadPayType || loadBillRate || loadPayRate) {
        return null;
    }

    const payPeriod = payPeriodConfig?.resolveConfiguration;
    const payType = payTypeConfig?.resolveConfiguration;
    const billRate = billRateConfig?.resolveConfiguration;
    const payRate = payRateConfig?.resolveConfiguration;

    const requireTimesheetApproval: boolean = requireTimesheetApprovalConfig?.resolveConfiguration;

    return (
        <div>
            <PaymentsModal
                visible={visible}
                onClose={onClose}
                onSubmit={onSubmit}
                payPeriod={payPeriod}
                payType={payType}
                payRate={payRate}
                billRate={billRate}
                requireTimesheetApproval={requireTimesheetApproval}
            />
            <div className={css(styles.left)}>
                <div>
                    <span className={css(styles.gray)}>{payType}:</span>
                    <span className={css(styles.ml5)}>{`$${payRate} / $${billRate}`}</span>
                </div>
                <div className={css(styles.font12)}>
                    <span className={css(styles.gray)}>{payPeriod}</span>
                    {requireTimesheetApproval ? (
                        <>
                            <span className={css(styles.m5)}>/</span>
                            <span className={css(styles.gray)}>Timesheet approvals</span>
                        </>
                    ) : null}
                </div>
            </div>
            <EditTwoTone className={css(styles.right, styles.m5)} onClick={openPaymentModal} />
        </div>
    );
};

const styles = {
    left: () => ({
        float: 'left',
    }),
    right: () => ({
        float: 'right',
    }),
    gray: () => ({
       color: '#6a6b6c'
    }),
    ml5: () => ({
       marginLeft: '5px',
    }),
    font12: () => ({
       fontSize: '12px',
    }),
    m5: () => ({
        margin: '5px',
    }),
}
