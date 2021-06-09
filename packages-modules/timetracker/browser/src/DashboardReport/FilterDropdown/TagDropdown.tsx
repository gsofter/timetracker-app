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
interface ITagDropdown {
    title: string;
    filteredData: IFilteredData;
    setFilteredData: Function;
}
enum Status {
    ACTIVE ='Active',
    ARCHIVED = 'Archived',
    ACTIVE_ARCHIVED = 'Active & Archived',
}
enum ContainStatus {
    CONTAINS = 'Contains',
    DOES_NOT_CONTAIN = 'Does not contain',
    CONTAINS_ONLY = 'Contains only',
}

export const TagDropdown = (props: ITagDropdown) => {
    const { title, filteredData, setFilteredData } = props;
    const [visible, setVisible] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [showContainStatus, setShowContainStatus] = useState(false);
    const [checkedList, setCheckedList] = React.useState([]);
    const [checkAll, setCheckAll] = React.useState(false);
    const [status, setStatus] = useState(Status.ACTIVE);
    const [containStatus, setContainStatus] = useState(ContainStatus.CONTAINS);
    const [count, setCount] = useState(0);
    const { css } = useFela();

    const handleVisibleChange = (value) => {
        if (!value) {
            setCount(checkedList.length);
            setFilteredData({
                ...filteredData,
                [FilterName.TAG]: {
                    selectedIds: [...checkedList]
                }
            });
        }
        setVisible(value);
    };
    const showStatusMenu = () => {
        setShowStatus(!showStatus);
    };
    const showContainStatusMenu = () => {
        setShowContainStatus(!showContainStatus);
    }
    const onClickStatus = ({ key }) => {
        setStatus(key);
        setShowStatus(false);
    };
    const onClickContainStatus = ({ key }) => {
        setContainStatus(key);
        setShowContainStatus(false);
    }
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
                <Input onChange={onChangeInput} placeholder={'Find tags...'}/>
            </Menu.Item>
            <Menu.Divider className={css(styles.divider)}/>
            <Menu.Item className={css(styles.item)}>
                <div style={{ display: 'flex' }}>
                    <div className={css(styles.label)}>SHOW</div>
                    <div style={{ marginLeft: 'auto' }} onClick={showStatusMenu}>
                        <a>{status}</a>
                        <DownOutlined className={css(styles.icon)}/>
                    </div>
                </div>
            </Menu.Item>
            <Menu.Divider className={css(styles.divider)}/>
            {showStatus ? (
                <>
                    <Menu.Item className={css(styles.statusItem)} key={Status.ACTIVE_ARCHIVED} onClick={onClickStatus}>
                        <div>{Status.ACTIVE_ARCHIVED}</div>
                    </Menu.Item>
                    <Menu.Divider className={css(styles.divider)}/>
                    <Menu.Item className={css(styles.statusItem)} key={Status.ACTIVE} onClick={onClickStatus}>
                        <div>{Status.ACTIVE}</div>
                    </Menu.Item>
                    <Menu.Divider className={css(styles.divider)}/>
                    <Menu.Item className={css(styles.statusItem)} key={Status.ARCHIVED} onClick={onClickStatus}>
                        <div>{Status.ARCHIVED}</div>
                    </Menu.Item>
                    <Menu.Divider className={css(styles.divider)}/>
                </>
            ) : null}
            <Menu.Item className={css(styles.item)}>
                <div style={{ display: 'flex' }}>
                    <div className={css(styles.label)}>SHOW</div>
                    <div style={{ marginLeft: 'auto' }} onClick={showContainStatusMenu}>
                        <a>{containStatus}</a>
                        <DownOutlined className={css(styles.icon)}/>
                    </div>
                </div>
            </Menu.Item>
            <Menu.Divider className={css(styles.divider)}/>
            {showContainStatus ? (
                <>
                    <Menu.Item className={css(styles.statusItem)} key={ContainStatus.CONTAINS} onClick={onClickContainStatus}>
                        <div>{ContainStatus.CONTAINS}</div>
                    </Menu.Item>
                    <Menu.Divider className={css(styles.divider)}/>
                    <Menu.Item className={css(styles.statusItem)} key={ContainStatus.DOES_NOT_CONTAIN} onClick={onClickContainStatus}>
                        <div>{ContainStatus.DOES_NOT_CONTAIN}</div>
                    </Menu.Item>
                    <Menu.Divider className={css(styles.divider)}/>
                    <Menu.Item className={css(styles.statusItem)} key={ContainStatus.CONTAINS_ONLY} onClick={onClickContainStatus}>
                        <div>{ContainStatus.CONTAINS_ONLY}</div>
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
                            <Checkbox value={WITHOUT} className={css(styles.checkbox)}>{'Without tag'}</Checkbox>
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
