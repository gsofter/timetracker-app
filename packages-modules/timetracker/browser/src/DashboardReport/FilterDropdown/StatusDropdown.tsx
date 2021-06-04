import * as React from 'react';
import { useFela } from 'react-fela';
import { useState } from 'react';
import { Badge, Checkbox, Dropdown, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { styles } from './styles';
import { FilterName } from '../ReportFilter';

interface IData {
    selectedIds: [string];
}
interface IFilteredData extends Partial<Record<string, IData>> {}
interface IStatusDropdown {
    title: string;
    filteredData: IFilteredData;
    setFilteredData: Function;
}
export enum Status {
    BILLABLE= 'Billable',
    NON_BILLABLE = 'Non-billable',
    APPROVED = 'Approved',
    UNAPPROVED = 'Unapproved',
}
export const StatusDropdown = (props: IStatusDropdown) => {
    const { title, filteredData, setFilteredData } = props;
    const [visible, setVisible] = useState(false);
    const [checkedList, setCheckedList] = React.useState([]);
    const [count, setCount] = useState(0);
    const { css } = useFela();

    const handleVisibleChange = (value) => {
        if (!value) {
            setCount(checkedList.length);
            setFilteredData({
                ...filteredData,
                [FilterName.STATUS]: {
                    selectedIds: [...checkedList]
                }
            });
        }
        setVisible(value);
    };
    const onChange = list => {
        setCheckedList(list);
    };

    const content = (
        <Menu>
            <Menu.Item className={css(styles.disabledItem)}>
                <Checkbox.Group className={css(styles.checkboxGroup)} onChange={onChange} value={checkedList}>
                    <Menu>
                        <Menu.Item disabled={true}>
                            <div className={css(styles.label)}>Billing</div>
                        </Menu.Item>
                        <Menu.Item key={Status.BILLABLE} className={css(styles.item, styles.mTB0)}>
                            <Checkbox value={Status.BILLABLE} className={css(styles.checkbox)}>{Status.BILLABLE}</Checkbox>
                        </Menu.Item>
                        <Menu.Item key={Status.NON_BILLABLE} className={css(styles.item, styles.mTB0)}>
                            <Checkbox value={Status.NON_BILLABLE} className={css(styles.checkbox)}>{Status.NON_BILLABLE}</Checkbox>
                        </Menu.Item>
                        <Menu.Divider className={css(styles.divider)}/>
                        <Menu.Item disabled={true}>
                            <div className={css(styles.label)}>Approval</div>
                        </Menu.Item>
                        <Menu.Item key={Status.APPROVED} className={css(styles.item, styles.mTB0)}>
                            <Checkbox value={Status.APPROVED} className={css(styles.checkbox)}>{Status.APPROVED}</Checkbox>
                        </Menu.Item>
                        <Menu.Item key={Status.UNAPPROVED} className={css(styles.item, styles.mTB0)}>
                            <Checkbox value={Status.UNAPPROVED} className={css(styles.checkbox)}>{Status.UNAPPROVED}</Checkbox>
                        </Menu.Item>
                    </Menu>
                </Checkbox.Group>
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
            <Badge count={count} style={{ background: '#2a90fe' }}>
                <div className={css(styles.flex, styles.m5)}>
                    <div className={css(styles.capitalize)}>{title}</div>
                    <CaretDownOutlined className={css(styles.m4)}/>
                </div>
            </Badge>
        </Dropdown>
    );
}
