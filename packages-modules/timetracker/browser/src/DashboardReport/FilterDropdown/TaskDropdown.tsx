import * as React from 'react';
import { useState } from 'react';
import { useFela } from 'react-fela';
import { Input, Checkbox, Menu, Dropdown, Badge } from 'antd';
import { CaretDownOutlined, DownOutlined } from '@ant-design/icons';
import { FilterName, WITHOUT } from '../ReportFilter';
import { styles } from './styles';

interface IData {
    selectedIds: [string];
}
interface IFilteredData extends Partial<Record<string, IData>> {}
interface ITaskDropdown {
    title: string;
    filteredData: IFilteredData;
    setFilteredData: Function;
}
enum Status {
    ACTIVE ='Active',
    COMPLETED = 'Completed',
    ACTIVE_COMPLETED = 'Active & Completed',
}
export const TaskDropdown = (props: ITaskDropdown) => {
    const { title, filteredData, setFilteredData } = props;
    const [visible, setVisible] = useState(false);
    const [show, setShow] = useState(false);
    const [checkedList, setCheckedList] = React.useState([]);
    const [checkAll, setCheckAll] = React.useState(false);
    const [status, setStatus] = useState(Status.ACTIVE);
    const [count, setCount] = useState(0);
    const { css } = useFela();

    const handleVisibleChange = (value) => {
        if(!value) {
            setCount(checkedList.length);
            setFilteredData({
                ...filteredData,
                [FilterName.TASK]: {
                    selectedIds: [...checkedList]
                }
            });
        }
        setVisible(value);
    };
    const showStatus = () => {
        setShow(!show);
    };
    const onClickStatus = ({ key }) => {
        setStatus(key);
        setShow(false);
    };
    const onChange = list => {
        setCheckedList(list);
        setCheckAll(list.length === 1);
    };
    const onCheckAllChange = e => {
        const list = e.target.checked ? [WITHOUT] : []
        setCheckedList(list);
        setCheckAll(e.target.checked);
    };
    const onChangeInput = (e) => {
    };

    const content = (
        <Menu className={css(styles.menu)}>
            <Menu.Item className={css(styles.item)}>
                <Input onChange={onChangeInput} placeholder={'Find tasks...'}/>
            </Menu.Item>
            <Menu.Divider className={css(styles.divider)}/>
            <Menu.Item className={css(styles.item)}>
                <div style={{ display: 'flex' }}>
                    <div className={css(styles.label)}>SHOW</div>
                    <div style={{ marginLeft: 'auto' }} onClick={showStatus}>
                        <a>{status}</a>
                        <DownOutlined className={css(styles.icon)}/>
                    </div>
                </div>
            </Menu.Item>
            <Menu.Divider className={css(styles.divider)}/>
            {show ? (
                <>
                    <Menu.Item className={css(styles.statusItem)} key={Status.ACTIVE_COMPLETED} onClick={onClickStatus}>
                        <div>{Status.ACTIVE_COMPLETED}</div>
                    </Menu.Item>
                    <Menu.Divider className={css(styles.divider)}/>
                    <Menu.Item className={css(styles.statusItem)} key={Status.ACTIVE} onClick={onClickStatus}>
                        <div>{Status.ACTIVE}</div>
                    </Menu.Item>
                    <Menu.Divider className={css(styles.divider)}/>
                    <Menu.Item className={css(styles.statusItem)} key={Status.COMPLETED} onClick={onClickStatus}>
                        <div>{Status.COMPLETED}</div>
                    </Menu.Item>
                    <Menu.Divider className={css(styles.divider)}/>
                </>
            ) : null}
            <Menu.Item className={css(styles.item)}>
                <Checkbox className={css(styles.checkbox)} onChange={onCheckAllChange} checked={checkAll}>
                    Select all
                </Checkbox>
            </Menu.Item>
            <Menu.Divider className={css(styles.divider)}/>
            <Menu.Item className={css(styles.disabledItem)}>
                <Checkbox.Group className={css(styles.checkboxGroup)} onChange={onChange} value={checkedList}>
                    <Menu>
                        <Menu.Item key={WITHOUT} className={css(styles.item, styles.mTB0)}>
                            <Checkbox value={WITHOUT} className={css(styles.checkbox)}>{'Without task'}</Checkbox>
                        </Menu.Item>
                    </Menu>
                </Checkbox.Group>
            </Menu.Item>
        </Menu>
    );
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
