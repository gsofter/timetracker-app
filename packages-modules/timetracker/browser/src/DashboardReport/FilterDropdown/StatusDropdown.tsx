import * as React from 'react';
import { useFela } from 'react-fela';
import { useState } from 'react';
import { Checkbox, Dropdown, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { styles } from './styles';

interface IStatusDropdown {
    title: string;
}
enum Status {
    BILLABLE= 'Billable',
    NON_BILLABLE = 'Non-billable',
    APPROVED = 'Approved',
    UNAPPROVED = 'Unapproved',
}
export const StatusDropdown = (props: IStatusDropdown) => {
    const { title } = props;
    const [visible, setVisible] = useState(false);
    const { css } = useFela();

    const handleVisibleChange = (value) => {
        setVisible(value);
    };
    const content = (
        <Menu>
            <Menu.Item disabled={true}>
                <div className={css(styles.label)}>Billing</div>
            </Menu.Item>
            <Menu.Item key={Status.BILLABLE} className={css(styles.item)}>
                <Checkbox value={Status.BILLABLE} className={css(styles.checkbox)}>{Status.BILLABLE}</Checkbox>
            </Menu.Item>
            <Menu.Item key={Status.NON_BILLABLE} className={css(styles.item)}>
                <Checkbox value={Status.NON_BILLABLE} className={css(styles.checkbox)}>{Status.NON_BILLABLE}</Checkbox>
            </Menu.Item>
            <Menu.Divider className={css(styles.divider)}/>
            <Menu.Item disabled={true}>
                <div className={css(styles.label)}>Approval</div>
            </Menu.Item>
            <Menu.Item key={Status.APPROVED} className={css(styles.item)}>
                <Checkbox value={Status.APPROVED} className={css(styles.checkbox)}>{Status.APPROVED}</Checkbox>
            </Menu.Item>
            <Menu.Item key={Status.UNAPPROVED} className={css(styles.item)}>
                <Checkbox value={Status.UNAPPROVED} className={css(styles.checkbox)}>{Status.UNAPPROVED}</Checkbox>
            </Menu.Item>
        </Menu>
    )
    return (
        <Dropdown
            overlay={content}
            trigger={['click']}
            placement="bottomLeft"
            visible={visible}
            onVisibleChange={handleVisibleChange}
        >
            <div className={css(styles.flex)}>
                <div>{title}</div>
                <CaretDownOutlined className={css(styles.m4)}/>
            </div>
        </Dropdown>
    );
}
