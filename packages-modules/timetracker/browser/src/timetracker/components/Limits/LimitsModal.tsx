import * as React from 'react';
import { useState, useEffect } from 'react';
import { useFela } from 'react-fela';
import { Button, Form, Modal, Input, Switch, Tooltip, Avatar } from 'antd';
import { CheckOutlined, CloseOutlined, InfoCircleFilled } from '@ant-design/icons';

const { Item } = Form;

interface ILimitsModal {
    weeklyLimit: number;
    dailyLimit: number;
    daysAllowed: string[];
    visible: boolean;
    onClose: () => void;
    onSubmit: (request: any, form: any) => void;
}

const Days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const LimitsModal = (props: ILimitsModal) => {
    const { visible, onClose, onSubmit, weeklyLimit, dailyLimit, daysAllowed } = props;
    const [isDailyLimit, setIsDailyLimit] = useState(!!dailyLimit);
    const [daysAllowedState, setDaysAllowedState] = useState(daysAllowed);
    const { css } = useFela();
    const [form] = Form.useForm();

    useEffect(() => {
        setDaysAllowedState(daysAllowed);
    }, [JSON.stringify(daysAllowed)]);

    useEffect(() => {
        setIsDailyLimit(!!dailyLimit);
    }, [dailyLimit]);

    const onCloseModal = () => {
        onClose();
        form.resetFields();
        setDaysAllowedState(daysAllowed);
        setIsDailyLimit(!!dailyLimit);
    };

    const onFinish = (request) => {
        onSubmit(request, form);
    };

    const onClickDay = (day) => {
        const tempDays = daysAllowedState.slice(0);
        if (tempDays.includes(day)) {
            const index = tempDays.indexOf(day);
            tempDays.splice(index, 1);
        } else {
            tempDays.push(day);
        }
        setDaysAllowedState(tempDays);
    };

    return (
        <Modal
            visible={visible}
            title="Limits"
            onCancel={onCloseModal}
            destroyOnClose={true}
            forceRender={true}
            footer={[
                <Button key='back' onClick={onCloseModal}>Cancel</Button>,
                <Button key='submit' type={'primary'} onClick={form.submit}>Save</Button>,
            ]}
        >
            <Form
                id={'limits-form'}
                form={form}
                className={css(styles.container)}
                layout={'vertical'}
                onFinish={onFinish}
                initialValues={{ weeklyLimit, dailyLimit }}
            >
                <Item label={'Recurring Weekly Limit'} name={'weeklyLimit'} tooltip={{ icon: <InfoCircleFilled /> }}>
                    <Input addonAfter={'hrs/wk'} type={'number'} placeholder={'No weekly limit'}/>
                </Item>
                <Item label={'Recurring Daily Limit'} tooltip={{ icon: <InfoCircleFilled /> }}>
                    <div className={css(styles.flex)}>
                        <Switch
                            className={css(styles.mr10)}
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            checked={isDailyLimit}
                            onChange={() => setIsDailyLimit(!isDailyLimit)}
                        />
                        <div>Use shifts to set daily limits</div>
                    </div>
                    <Item className={css(styles.mt15, styles.mb0)} name={'dailyLimit'}>
                        <Input addonAfter={'hrs/day'} type={'number'} disabled={!isDailyLimit} placeholder={'No daily limit'}/>
                    </Item>
                </Item>
                <Item className={css(styles.mb0)} label={'Days Allowed To Work'}>
                    <div className={css(styles.flex)}>
                        {
                            Days.map((day, i) => {
                                const selectStyle = daysAllowedState.includes(day) ? styles.selectedColor : {};
                                return (
                                    <div key={i} className={css(styles.mr10)} onClick={() => onClickDay(day)}>
                                        <Tooltip title={day}>
                                            <Avatar size={'large'} className={css(selectStyle)}>
                                                {day.slice(0, 3)}
                                            </Avatar>
                                        </Tooltip>
                                    </div>
                                );
                            })
                        }
                    </div>
                </Item>
            </Form>
        </Modal>
    );
}

const styles = {
    container: () => ({
        '& .ant-form-item-label': {
            '> label': {
                color: '#6a6b6c',
                textTransform: 'uppercase',
                fontSize: '13px',
                fontWeight: '500',
            },
        },
    }),
    flex: () => ({
        display: 'flex',
    }),
    mr10: () => ({
        marginRight: '10px',
    }),
    mt15: () => ({
        marginTop: '15px',
    }),
    mb0: () => ({
        marginBottom: '0px',
    }),
    selectedColor: () => ({
        backgroundColor: '#1890ff',
    }),
};
