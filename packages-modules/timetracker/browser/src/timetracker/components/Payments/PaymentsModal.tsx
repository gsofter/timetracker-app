import * as React from 'react';
import { useFela } from 'react-fela';
import { Modal, Form, Input, Select, Switch, Button } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Item } = Form;
const { Option } = Select;

interface IPaymentsModal {
    visible: boolean;
    onClose: () => void;
}

const payPeriodOptions = ['None', 'Weekly', 'Twice per month', 'Bi-weekly', 'Monthly'];

export const PaymentsModal = (props: IPaymentsModal) => {
    const { visible, onClose } = props;
    const { css } = useFela();

    return (
        <Modal
            visible={visible}
            title="Payments"
            onCancel={onClose}
            footer={[
                <Button key='back' onClick={onClose}>Cancel</Button>,
                <Button key='submit' type={'primary'}>Save</Button>,
            ]}
        >
            <Form className={css(styles.container)} layout={'vertical'}>
                <div className={css(styles.flex)}>
                    <Item className={css(styles.width50, styles.mr20)} label={'Pay Period'} name={'payPeriod'} initialValue={payPeriodOptions[0]}>
                        <Select>
                            {
                                payPeriodOptions.map((option) => (
                                    <Option value={option}>{option}</Option>
                                ))
                            }
                        </Select>
                    </Item>
                    <Item className={css(styles.width50)} label={'Pay Type'} name={'payType'}>
                        <Input placeholder={'Hourly'}/>
                    </Item>
                </div>
                <Item>
                    <div className={css(styles.flex)}>
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            defaultChecked
                        />
                        <div className={css(styles.timesheet)}>Require timesheet approval</div>
                    </div>
                </Item>
                <div className={css(styles.flex)}>
                    <Item className={css(styles.width50, styles.mr20)} label={'Pay Rate'} name={'payRate'}>
                        <Input addonAfter={'USD/hr'}/>
                    </Item>
                    <Item className={css(styles.width50)} label={'Bill Rate'} name={'billRate'}>
                        <Input addonAfter={'USD/hr'}/>
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
