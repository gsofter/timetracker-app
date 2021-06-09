import * as React from 'react';
import { useEffect, useState } from 'react';
import { useFela } from 'react-fela';
import { Input, Checkbox, Menu, Dropdown, Badge } from 'antd';
import { CaretDownOutlined, DownOutlined } from '@ant-design/icons';
import { useGetOrganizationClientsQuery, useGetProjectsQuery } from '@adminide-stack/account-api-client';
import { styles } from './styles';
import { FilterName, WITHOUT } from '../ReportFilter';
import * as _ from 'lodash';

interface IData {
    selectedIds: [string];
}
interface IFilteredData extends Partial<Record<string, IData>> {}
interface IProjectDropdown {
    title: string;
    filteredData: IFilteredData;
    setFilteredData: Function;
}
enum Status {
    ACTIVE ='Active',
    ARCHIVED = 'Archived',
    ACTIVE_ARCHIVED = 'Active & Archived',
}
export const ProjectDropdown = (props: IProjectDropdown) => {
    const { title, filteredData, setFilteredData } = props;
    const [visible, setVisible] = useState(false);
    const [show, setShow] = useState(false);
    const [checkedList, setCheckedList] = React.useState([]);
    const [checkAll, setCheckAll] = React.useState(false);
    const [status, setStatus] = useState(Status.ACTIVE);
    const [clientProjects, setClientProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [count, setCount] = useState(0);
    const { css } = useFela();

    const { data: { getOrganizationClients: clients } = {} } = useGetOrganizationClientsQuery();
    const { data: { getProjects: projects } = {} } = useGetProjectsQuery();

    useEffect(() => {
        if (projects) {
            const projectList = _.chain(projects)
                .groupBy('clientId')
                .map((value, key) => ({ clientId: key, projects: value }))
                .value();
            setClientProjects(projectList);
            setFilteredProjects(projectList);
        }
    }, [projects]);

    useEffect(() => {
        setFilteredProjects(filterProjectsByStatus(status));
    }, [status]);

    const handleVisibleChange = (value) => {
        if(!value) {
            setFilteredData({
                ...filteredData,
                [FilterName.PROJECT]: {
                    selectedIds: [...checkedList],
                },
            });
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
        setCheckAll(false);
        setCheckedList([]);
    };
    const getProjectsId = () => {
        let ids = [];
        filteredProjects.forEach(({ projects }) => {
            projects.forEach((project) => {
                ids.push(project.id);
            });
        });
        return ids;
    };
    const onChange = list => {
        setCheckedList(list);
        setCheckAll(list.length === (getProjectsId().length + 1));
    };
    const onCheckAllChange = e => {
        let list = e.target.checked ? getProjectsId() : []
        if (e.target.checked) {
            list.push(WITHOUT);
        }
        setCheckedList(list);
        setCheckAll(e.target.checked);
    };
    const onChangeInput = (e) => {
        let newProjects = [];
        if (e.target.value.trim()) {
            newProjects = filterProjectsByName(e.target.value);
        } else {
            newProjects = clientProjects;
        }
        setFilteredProjects(newProjects);
    };
    const filterProjectsByName = (str) => {
        const projectList =  clientProjects?.map(({ clientId, projects }) => {
            return ({
                clientId,
                projects: projects.filter((project) => {
                    return project.name.toLowerCase().includes(str.toLowerCase());
                }),
            })
        });
        return projectList.filter(({ projects }) => projects.length);
    };
    const filterProjectsByStatus = (status) => {
        const projectList =  clientProjects?.map(({ clientId, projects }) => {
            return ({
                clientId,
                projects: projects.filter((project) => {
                    if (status === Status.ACTIVE_ARCHIVED) {
                        return (project.status === Status.ACTIVE || project.status === Status.ARCHIVED);
                    } else {
                        return (project.status === status);
                    }
                }),
            })
        });
        return projectList.filter(({ projects }) => projects.length);
    };
    const getClientName = (id) => {
        const client = clients?.find((client) => client.id === id);
        return client?.displayName;
    }

    const content = (
        <Menu className={css(styles.menu)}>
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
            {(filteredProjects.length || clientProjects?.length) ? (
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
                    <Menu.Item className={css(styles.disabledItem)}>
                        <Checkbox.Group className={css(styles.checkboxGroup)} onChange={onChange} value={checkedList}>
                            <Menu>
                                <Menu.Item key={WITHOUT} className={css(styles.item, styles.mTB0)}>
                                    <Checkbox value={WITHOUT} className={css(styles.checkbox)}>{'Without project'}</Checkbox>
                                </Menu.Item>
                                {filteredProjects?.map(({ projects, clientId }) => (
                                    <React.Fragment key={clientId}>
                                        <Menu.Divider className={css(styles.divider)}/>
                                        <Menu.Item disabled={true} className={css(styles.item, styles.mTB0)}>
                                            <div className={css(styles.label)}>{getClientName(clientId)}</div>
                                        </Menu.Item>
                                        {
                                            projects?.map((project) => (
                                                <Menu.Item key={project.id} className={css(styles.item, styles.mTB0)}>
                                                    <Checkbox value={project.id} className={css(styles.checkbox)}>{project.name}</Checkbox>
                                                </Menu.Item>
                                            ))
                                        }
                                    </React.Fragment>
                                ))}
                            </Menu>
                        </Checkbox.Group>
                    </Menu.Item>
                </>
            ) : (
                <Menu.Item className={css(styles.item)}>
                    <div>No project</div>
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
            <Badge count={count} style={{ background: '#2a90fe' }}>
                <div className={css(styles.flex, styles.m5)}>
                    <div className={css(styles.capitalize)}>{title}</div>
                    <CaretDownOutlined className={css(styles.m4)}/>
                </div>
            </Badge>
        </Dropdown>
    );
}
