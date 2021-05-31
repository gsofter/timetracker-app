import * as React from 'react';
import { useState } from 'react';
import { useFela } from 'react-fela';
import { Input, Divider, Checkbox, Menu, Dropdown } from 'antd';
import { CaretDownOutlined, DownOutlined } from '@ant-design/icons';
import { useGetOrganizationMembersQuery } from "@adminide-stack/react-shared-components";

interface ITeamDropdown {
    title: string;
}
enum Status {
    ACTIVE ='Active',
    INACTIVE = 'Inactive',
    ACTIVE_INACTIVE = 'Active & Inactive',
}
export const TeamDropdown = (props: ITeamDropdown) => {
    const { title } = props;
    const [visible, setVisible] = useState(false);
    const [show, setShow] = useState(false);
    const [checkedList, setCheckedList] = React.useState([]);
    const [indeterminate, setIndeterminate] = React.useState(true);
    const [checkAll, setCheckAll] = React.useState(false);
    const [status, setStatus] = useState(Status.ACTIVE);
    const { css } = useFela();

    const { data: { getOrganizationMembers: users } = {} } = useGetOrganizationMembersQuery();

    const handleVisibleChange = (value) => {
        setVisible(value);
    }
    const showStatus = () => {
        setShow(!show);
    }
    const onClickStatus = ({ key }) => {
        setStatus(key);
        setShow(false);
    }
    const onChange = list => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < users?.length);
        setCheckAll(list.length === users.length);
    };

    const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? users?.map(user => user.userId) : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    const content = (
      <Menu>
          <Menu.Item className={css(styles.item)}>
              <Input placeholder={'Find member...'}/>
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
                  <Menu.Item className={css(styles.statusItem)} key={Status.ACTIVE_INACTIVE} onClick={onClickStatus}>
                      <div>{Status.ACTIVE_INACTIVE}</div>
                  </Menu.Item>
                  <Menu.Divider className={css(styles.divider)}/>
                  <Menu.Item className={css(styles.statusItem)} key={Status.ACTIVE} onClick={onClickStatus}>
                      <div>{Status.ACTIVE}</div>
                  </Menu.Item>
                  <Menu.Divider className={css(styles.divider)}/>
                  <Menu.Item className={css(styles.statusItem)} key={Status.INACTIVE} onClick={onClickStatus}>
                      <div>{Status.INACTIVE}</div>
                  </Menu.Item>
                  <Menu.Divider className={css(styles.divider)}/>
              </>
          ) : null}
          <Menu.Item className={css(styles.item)}>
              <Checkbox className={css(styles.checkbox)} onChange={onCheckAllChange} checked={checkAll}>Select all</Checkbox>
          </Menu.Item>
          <Menu.Divider className={css(styles.divider, styles.space)}/>
          <Menu.Divider className={css(styles.divider)}/>
          <Menu.Item disabled={true} className={css(styles.item)}>
              <div className={css(styles.label)}>USERS</div>
          </Menu.Item>
          <Checkbox.Group className={css(styles.checkboxGroup)} onChange={onChange} value={checkedList}>
            <Menu>
                {users?.map((user) => (
                    <>
                        <Menu.Item key={user.userId} className={css(styles.item)}>
                            <Checkbox value={user.userId} className={css(styles.checkbox)}>{user.name}</Checkbox>
                        </Menu.Item>
                    </>
                ))}
            </Menu>
          </Checkbox.Group>
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
const styles = {
    item: () => ({
        padding: '10px 12px',
        ':hover': {
            backgroundColor: '#f5f5f5',
        },
    }),
    flex: () => ({
        display: 'flex',
    }),
    divider: () => ({
        margin: '0',
    }),
    m4: () => ({
        margin: '4px',
    }),
    checkbox: () => ({
        width: '100%',
    }),
    icon: () => ({
       fontSize: '11px',
       margin: '0 2px',
    }),
    label: () => ({
        color: '#999',
        fontSize: '13px',
        textTransform: 'uppercase',
    }),
    statusItem: () => ({
        padding: '10px 12px',
        background: '#e4eaee',
    }),
    space: () => ({
       marginBottom: '10px',
    }),
    checkboxGroup: () => ({
        width: '100%',
    })
};
