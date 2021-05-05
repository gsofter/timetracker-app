import * as React from 'react'
import { useState } from 'react';
import { useFela } from 'react-fela';
import { message } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import { useSetting } from '@adminide-stack/react-shared-components';
import { ConfigurationTarget } from '@adminide-stack/core';
import { LimitsModal } from './LimitsModal';
import { isArray } from 'lodash';

export const Limits = (props) => {
    const [visible, setVisible] = useState(false);
    const { css } = useFela();

    const { data: weeklyLimitConfig, loading: loadWeekly, updateConfiguration } = useSetting({
        configKey: 'timetracker.user.recurringWeeklyLimit',
        overrides: { overrideIdentifier: props.value.record.name },
    });

    const { data: dailyLimitConfig, loading: loadDaily } = useSetting({
        configKey: 'timetracker.user.recurringDailyLimit',
        overrides: { overrideIdentifier: props.value.record.name },
    });

    const { data: daysAllowedConfig, loading } = useSetting({
        configKey: 'timetracker.project.daysAllowedToWork',
        overrides: { overrideIdentifier: props.value.record.name },
    });

    const openLimitsModal = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const updateLimitSettings = async (request, daysAllowed) => {
        await updateConfiguration({
            updateKey: 'timetracker.user.recurringWeeklyLimit',
            value: parseInt(request.weeklyLimit, 10) || '',
            updateOverrides: { overrideIdentifier: props.value.record.name },
            target: ConfigurationTarget.ORGANIZATION,
        });
        await updateConfiguration({
            updateKey: 'timetracker.user.recurringDailyLimit',
            value: parseInt(request.dailyLimit, 10) || '',
            updateOverrides: { overrideIdentifier: props.value.record.name },
            target: ConfigurationTarget.ORGANIZATION,
        });
        await updateConfiguration({
            updateKey: 'timetracker.project.daysAllowedToWork',
            value: daysAllowed.toString(),
            updateOverrides: { overrideIdentifier: props.value.record.name },
            target: ConfigurationTarget.ORGANIZATION,
        });
    };

    const onSubmit = (request, daysAllowed, resetFields) => {
        updateLimitSettings(request, daysAllowed).then(() => {
            onClose();
            resetFields();
            message.success('Limit details updated successfully');
        })
    };

    if (loading || loadWeekly || loadDaily) {
        return null;
    }
    const weeklyLimit = weeklyLimitConfig?.resolveConfiguration;
    const dailyLimit = dailyLimitConfig?.resolveConfiguration;
    const daysAllowed = daysAllowedConfig?.resolveConfiguration;

    return (
        <div>
            <LimitsModal
                visible={visible}
                onClose={onClose}
                onSubmit={onSubmit}
                weeklyLimit={weeklyLimit}
                dailyLimit={dailyLimit}
                daysAllowed={isArray(daysAllowed) ? daysAllowed : daysAllowed.split(',')}
            />
            <div className={css(styles.left)}>
                {weeklyLimit ? <div>{`${weeklyLimit} / week`}</div> : <div className={css(styles.gray)}>No weekly limit</div>}
                {dailyLimit ? <div>{`${dailyLimit} / day`}</div> : <div className={css(styles.gray)}>No daily limit</div>}
            </div>
            <EditTwoTone className={css(styles.right, styles.m5)} onClick={openLimitsModal}/>
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
    m5: () => ({
        margin: '5px',
    }),
};
