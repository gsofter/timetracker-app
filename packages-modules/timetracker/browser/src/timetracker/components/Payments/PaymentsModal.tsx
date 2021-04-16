import * as React from 'react';
import { useFela } from 'react-fela';
import { Modal, Form, Input, Select, Switch, Button } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Item } = Form;
const { Option } = Select;

interface IPaymentsModal {
    payPeriod: string;
    payType: string;
    billRate: number;
    payRate: number;
    requireTimesheetApproval: boolean;
    visible: boolean;
    onClose: () => void;
    onSubmit: (request: any, form: any) => void;
}

const enum PayPeriod {
    NONE = 'None',
    WEEKLY = 'Weekly',
    TWICE_PER_MONTH = 'Twice per month',
    BI_WEEKLY = 'Bi-weekly',
    MONTHLY = 'Monthly',
}
const enum PayRate {
    HOURLY = 'Hourly',
    FIXED = 'Fixed',
}
const payPeriodOptions = [PayPeriod.NONE, PayPeriod.WEEKLY, PayPeriod.TWICE_PER_MONTH, PayPeriod.BI_WEEKLY, PayPeriod.MONTHLY];
const payTypeOptions = [PayRate.HOURLY, PayRate.FIXED];

export const PaymentsModal = (props: IPaymentsModal) => {
    const { visible, onClose, payPeriod, payType, payRate, billRate, requireTimesheetApproval, onSubmit } = props;
    const { css } = useFela();
    const [form] = Form.useForm();

    const onCloseModal = () => {
        onClose();
        form.resetFields();
    };

    const onFinish = (request) => {
        onSubmit(request, form);
    }

    return (
        <Modal
            visible={visible}
            title="Payments"
            onCancel={onCloseModal}
            destroyOnClose={true}
            forceRender={true}
            footer={[
                <Button key='back' onClick={onCloseModal}>Cancel</Button>,
                <Button key='submit' type={'primary'} onClick={form.submit}>Save</Button>,
            ]}
        >
            <Form
                id={'payment-form'}
                form={form}
                className={css(styles.container)}
                layout={'vertical'}
                onFinish={onFinish}
                initialValues={{
                    payPeriod, payType, payRate, billRate, requireTimesheetApproval,
                }}
            >
                <div className={css(styles.flex)}>
                    <Item className={css(styles.width50, styles.mr20)} label={'Pay Period'} name={'payPeriod'}>
                        <Select placeholder={'Select pay period'}>
                            {
                                payPeriodOptions.map((option, i) => (
                                    <Option key={i} value={option}>{option}</Option>
                                ))
                            }
                        </Select>
                    </Item>
                    <Item className={css(styles.width50)} label={'Pay Type'} name={'payType'}>
                        <Select placeholder={'Select pay type'}>
                            {
                                payTypeOptions.map((option, i) => (
                                    <Option key={i} value={option}>{option}</Option>
                                ))
                            }
                        </Select>
                    </Item>
                </div>
                <Item>
                    <div className={css(styles.flex)}>
                        <Item noStyle={true} name={'requireTimesheetApproval'} valuePropName={'checked'}>
                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                            />
                        </Item>
                        <div className={css(styles.timesheet)}>Require timesheet approval</div>
                    </div>
                </Item>
                <div className={css(styles.flex)}>
                    <Item className={css(styles.width50, styles.mr20)} label={'Pay Rate'} name={'payRate'}>
                        <Input type={'number'} addonAfter={'USD/hr'}/>
                    </Item>
                    <Item className={css(styles.width50)} label={'Bill Rate'} name={'billRate'}>
                        <Input type={'number'} addonAfter={'USD/hr'}/>
                    </Item>
                </div>
            </Form>
        </Modal>
    )
};

const styles = {
    container: () => ({
        '& .ant-form-item-label': {
            '> label': {
                color: '#6a6b6c',
            },
        },
    }),
    flex: () => ({
       display: 'flex',
    }),
    width50: () => ({
       width: '50%',
    }),
    mr20: () => ({
        marginRight: '20px',
    }),
    timesheet: () => ({
        color: '#828588',
        margin: '0px 10px',
    }),
}
