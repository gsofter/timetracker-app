import * as React from 'react';
import { useState } from 'react';
import { useFela } from 'react-fela';
import { Input, Checkbox, Menu, Dropdown, Badge } from 'antd';
import { CaretDownOutlined, DownOutlined } from '@ant-design/icons';
import { styles } from './styles';

interface ITaskDropdown {
    title: string;
}
enum Status {
    ACTIVE ='Active',
    COMPLETED = 'Completed',
    ACTIVE_COMPLETED = 'Active & Completed',
}
export const TaskDropdown = (props: ITaskDropdown) => {
    const { title } = props;
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
        const list = e.target.checked ? ['without'] : []
        setCheckedList(list);
        setCheckAll(e.target.checked);
    };
    const onChangeInput = (e) => {
    };

    const content = (
        <Menu>
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
                        <Menu.Item key={'without'} className={css(styles.item, styles.mTB0)}>
                            <Checkbox value={'without'} className={css(styles.checkbox)}>{'Without task'}</Checkbox>
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
                    <div>{title}</div>
                    <CaretDownOutlined className={css(styles.m4)}/>
                </div>
            </Badge>
        </Dropdown>
    );
}
