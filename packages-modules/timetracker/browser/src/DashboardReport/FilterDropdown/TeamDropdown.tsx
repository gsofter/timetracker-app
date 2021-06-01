import * as React from 'react';
import { useEffect, useState } from 'react';
import { useFela } from 'react-fela';
import { Input, Checkbox, Menu, Dropdown } from 'antd';
import { CaretDownOutlined, DownOutlined } from '@ant-design/icons';
import { useGetOrganizationMembersQuery } from '@adminide-stack/react-shared-components';
import { styles } from './styles';

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
    const [checkAll, setCheckAll] = React.useState(false);
    const [status, setStatus] = useState(Status.ACTIVE);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const { css } = useFela();

    const { data: { getOrganizationMembers: users } = {} } = useGetOrganizationMembersQuery();

    useEffect(() => {
        if (users?.length) {
            setFilteredUsers(users);
        }
    }, [users])

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
        setCheckAll(list.length === users.length);
    };
    const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? users?.map(user => user.userId) : []);
        setCheckAll(e.target.checked);
    };
    const onChangeInput = (e) => {
        let newUsers = [];
        if (e.target.value.trim()) {
            newUsers = filterUsers(e.target.value);
        } else {
            newUsers = users;
        }
        setFilteredUsers(newUsers);
    };
    const filterUsers = (str) => {
        return users?.filter((user) => {
            return user.name.toLowerCase().includes(str.toLowerCase());
        });
    };

    const content = (
      <Menu>
          <Menu.Item className={css(styles.item)}>
              <Input onChange={onChangeInput} placeholder={'Find member...'}/>
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
          {filteredUsers.length ? (
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
                  <Menu.Divider className={css(styles.divider, styles.space)}/>
                  <Menu.Divider className={css(styles.divider)}/>
                  <Menu.Item disabled={true} className={css(styles.item)}>
                      <div className={css(styles.label)}>USERS</div>
                  </Menu.Item>
                  <Checkbox.Group className={css(styles.checkboxGroup)} onChange={onChange} value={checkedList}>
                      <Menu>
                          {filteredUsers?.map((user) => (
                              <Menu.Item key={user.userId} className={css(styles.item, styles.mTB0)}>
                                  <Checkbox value={user.userId} className={css(styles.checkbox)}>{user.name}</Checkbox>
                              </Menu.Item>
                          ))}
                      </Menu>
                  </Checkbox.Group>
              </>
              ) : (
                  <Menu.Item className={css(styles.item)}>
                      <div>No team</div>
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
