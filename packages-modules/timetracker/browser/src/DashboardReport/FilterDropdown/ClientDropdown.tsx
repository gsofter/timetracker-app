import * as React from 'react';
import { useEffect, useState } from 'react';
import { useFela } from 'react-fela';
import { Input, Checkbox, Menu, Dropdown } from 'antd';
import { CaretDownOutlined, DownOutlined } from '@ant-design/icons';
import { useGetOrganizationClientsQuery } from '@adminide-stack/react-shared-components';
import { styles } from './styles';

interface IClientDropdown {
    title: string;
}
enum Status {
    ACTIVE ='Active',
    ARCHIVED = 'Archived',
    ACTIVE_ARCHIVED = 'Active & Archived',
}
export const ClientDropdown = (props: IClientDropdown) => {
    const { title } = props;
    const [visible, setVisible] = useState(false);
    const [show, setShow] = useState(false);
    const [checkedList, setCheckedList] = React.useState([]);
    const [checkAll, setCheckAll] = React.useState(false);
    const [status, setStatus] = useState(Status.ACTIVE);
    const [filteredClients, setFilteredClients] = useState([]);
    const { css } = useFela();

    const { data: { getOrganizationClients: clients } = {} } = useGetOrganizationClientsQuery();

    useEffect(() => {
        if (clients?.length) {
            setFilteredClients(clients);
        }
    }, [clients])

    const handleVisibleChange = (value) => {
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
        setCheckAll(list.length === (clients.length + 1));
    };
    const onCheckAllChange = e => {
        let list = e.target.checked ? clients?.map(client => client.id) : []
        if (e.target.checked) {
            list.push('without');
        }
        setCheckedList(list);
        setCheckAll(e.target.checked);
    };
    const onChangeInput = (e) => {
        let newClients = [];
        if (e.target.value.trim()) {
            newClients = filterClients(e.target.value);
        } else {
            newClients = clients;
        }
        setFilteredClients(newClients);
    };
    const filterClients = (str) => {
        return clients?.filter((client) => {
            return client.displayName.toLowerCase().includes(str.toLowerCase());
        });
    };

    const content = (
        <Menu>
            <Menu.Item className={css(styles.item)}>
                <Input onChange={onChangeInput} placeholder={'Find client...'}/>
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
            {(filteredClients.length || clients?.length) ? (
                <>
                    <Menu.Item className={css(styles.item)}>
                        <Checkbox
                            className={css(styles.checkbox)}
                            onChange={onCheckAllChange}
                            checked={checkAll}
                        >
                            Select all
                        </Checkbox>
                    </Menu.Item>
                    <Menu.Divider className={css(styles.divider)}/>
                    <Checkbox.Group className={css(styles.checkboxGroup)} onChange={onChange} value={checkedList}>
                        <Menu>
                            <Menu.Item key={'without'} className={css(styles.item, styles.mTB0)}>
                                <Checkbox value={'without'} className={css(styles.checkbox)}>{'Without client'}</Checkbox>
                            </Menu.Item>
                            {filteredClients?.map((client) => (
                                <>
                                    <Menu.Divider className={css(styles.divider)}/>
                                    <Menu.Item key={client.id} className={css(styles.item, styles.mTB0)}>
                                        <Checkbox value={client.id} className={css(styles.checkbox)}>{client.displayName}</Checkbox>
                                    </Menu.Item>
                                </>
                            ))}
                        </Menu>
                    </Checkbox.Group>
                </>
            ) : (
                <Menu.Item className={css(styles.item)}>
                    <div>No client</div>
                </Menu.Item>
            )}
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
            <div className={css(styles.flex)}>
                <div>{title}</div>
                <CaretDownOutlined className={css(styles.m4)}/>
            </div>
        </Dropdown>
    );
}
