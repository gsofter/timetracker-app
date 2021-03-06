import * as React from 'react';
import { useState } from 'react';
import { useFela } from 'react-fela';
import { Button, Card, Checkbox, Divider, Dropdown, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { ClientDropdown, DescriptionDropdown, ProjectDropdown, StatusDropdown, TagDropdown, TaskDropdown, TeamDropdown } from './FilterDropdown';
import { IProject_Output, ITimeRecord } from '@admin-layout/timetracker-core';
import { Status } from './FilterDropdown';
import * as _ from 'lodash';

interface IReportFilter {
    projects: Array<IProject_Output>;
    setFilteredProjects: Function;
    records: Array<ITimeRecord>;
    setFilteredRecords: Function;
}
export enum FilterName {
    TEAM = 'team',
    CLIENT = 'client',
    PROJECT = 'project',
    TASK = 'task',
    TAG = 'tag',
    STATUS = 'status',
    DESCRIPTION = 'description',
}
export const WITHOUT = 'without';

const FilterTypes = [
    { value: FilterName.TEAM, selected: true, dropdown: (props) => <TeamDropdown {...props}/> },
    { value: FilterName.CLIENT, selected: true, dropdown: (props) => <ClientDropdown {...props}/> },
    { value: FilterName.PROJECT, selected: true, dropdown: (props) => <ProjectDropdown {...props}/> },
    { value: FilterName.TASK, selected: true, dropdown: (props) => <TaskDropdown {...props}/> },
    { value: FilterName.TAG, selected: true, dropdown: (props) => <TagDropdown {...props}/> },
    { value: FilterName.STATUS, selected: true, dropdown: (props) => <StatusDropdown {...props}/> },
    { value: FilterName.DESCRIPTION, selected: true, dropdown: (props) => <DescriptionDropdown {...props}/> },
];

export const ReportFilter = (props: IReportFilter) => {
    const { projects, records, setFilteredProjects, setFilteredRecords } = props;
    const [visible, setVisible] = useState(false);
    const [filterTypesItem, setFilterTypesItem] = useState(FilterTypes);
    const [filterTypes, setFilterTypes] = useState(FilterTypes);
    const [filteredData, setFilteredData] = useState({});
    const { css } = useFela();

    const onClickItem = ({ key }) => {
        const index = parseInt(key, 10);
        const updatedValue: any = { ...filterTypes[index], selected: !filterTypes[index].selected };
        let valuesArray = filterTypes.slice(0);
        valuesArray.splice(index, 1, updatedValue);
        setFilterTypes(valuesArray);
    }

    const handleVisibleChange = (value) => {
        setVisible(value);
        if (!value) {
            setFilterTypesItem(filterTypes);
        }
    }

    const filterRecordsByProject = (filteredProjects, newRecords, isWithoutProject) => {
        const projectIds = filteredProjects.map((project) => project.id);
        return newRecords.filter((record) => {
            if (isWithoutProject) {
                return (projectIds.includes(record.projectId) || !record.projectId);
            }
            return projectIds.includes(record.projectId);
        });
    }

    const filterProjectsByRecord = (filteredRecords, newProjects) => {
        const projectIds = filteredRecords.map(record => record.projectId);
        return newProjects.filter(project => projectIds.includes(project.id));
    }

    const clientFilter = (newProjects, newRecords, clientIds) => {
        let filteredProjects = newProjects.slice(0);
        if (clientIds.length) {
            filteredProjects = newProjects.filter((project) => {
                if (clientIds.includes(WITHOUT)) {
                    return (clientIds.includes(project.clientId) || !project.clientId);
                }
                return clientIds.includes(project.clientId);
            });
            return ({
                projects: filteredProjects,
                records: filterRecordsByProject(filteredProjects, newRecords, true),
            });
        }
        return ({ projects: newProjects, records: newRecords });
    }

    const projectFilter = (newProjects, newRecords, projectIds) => {
        let filteredProjects = newProjects.slice(0);
        if (projectIds.length) {
            filteredProjects = newProjects.filter((project) => {
                if (projectIds.includes(WITHOUT)) {
                    return (projectIds.includes(project.id) || !project.id);
                }
                return projectIds.includes(project.id);
            });
            return ({
                projects: filteredProjects,
                records: filterRecordsByProject(filteredProjects, newRecords, projectIds.includes(WITHOUT)),
            });
        }
        return ({ projects: newProjects, records: newRecords });
    }

    const descriptionFilter = (newProjects, newRecords, input, isWithout) => {
        let filteredRecords = newRecords.slice(0);
        if (input.trim() || isWithout) {
            filteredRecords = newRecords.filter((record) => {
                if (input.trim() && isWithout) {
                    return (record.description?.includes(input) || !record.description);
                } else if (input.trim() && !isWithout) {
                    return record.description?.includes(input);
                } else {
                    return !record.description;
                }
            });
            return ({
                projects: filterProjectsByRecord(filteredRecords, newProjects),
                records: filteredRecords,
            });
        }
        return ({ projects: newProjects, records: newRecords });
    }

    const teamFilter = (newProjects, newRecords, userIds) => {
        let filteredRecords = newRecords.slice(0);
        if (userIds.length) {
            filteredRecords = newRecords.filter((record) => userIds.includes(record.userId));
            return ({
                projects: filterProjectsByRecord(filteredRecords, newProjects),
                records: filteredRecords,
            });
        }
        return ({ projects: newProjects, records: newRecords });
    }

    const taskFilter = (newProjects, newRecords, tasks) => {
        let filteredRecords = newRecords.slice(0);
        if (tasks.length) {
            filteredRecords = newRecords.filter((record) => {
                if (tasks.includes(WITHOUT)) {
                    return (tasks.includes(record.taskName) || !record.taskName);
                }
                return tasks.includes(record.taskName);
            });
            return ({
                projects: filterProjectsByRecord(filteredRecords, newProjects),
                records: filteredRecords,
            });
        }
        return ({ projects: newProjects, records: newRecords });
    }

    const tagFilter = (newProjects, newRecords, tags) => {
        let filteredRecords = newRecords.slice(0);
        if (tags.length) {
            filteredRecords = newRecords.filter((record) => {
                const diff = _.difference(record.tags || [], tags);
                if (tags.includes(WITHOUT)) {
                    return ((diff.length < ((record.tags || []).length)) || !record.tags.length);
                }
                return (diff.length < ((record.tags || []).length));
            });
            return ({
                projects: filterProjectsByRecord(filteredRecords, newProjects),
                records: filteredRecords,
            });
        }
        return ({ projects: newProjects, records: newRecords });
    }

    const statusFilter = (newProjects, newRecords, statuses) => {
        let filteredRecords = newRecords.slice(0);
        if (statuses.length) {
            filteredRecords = newRecords.filter((record) => {
                if (statuses.includes(Status.BILLABLE) && statuses.includes(Status.NON_BILLABLE)) {
                    return (record.isBillable || !record.isBillable);
                } else if (statuses.includes(Status.BILLABLE)) {
                    return record.isBillable;
                } else if (statuses.includes(Status.NON_BILLABLE)) {
                    return !record.isBillable;
                }
                return true;
            });
            return ({
                projects: filterProjectsByRecord(filteredRecords, newProjects),
                records: filteredRecords,
            });
        }
        return ({ projects: newProjects, records: newRecords });
    }

    const applyFilter = () => {
        let filteredProjects = projects.slice(0);
        let filteredRecords = records.slice(0);
        _.forIn(filteredData, (value, key) => {
            switch (key) {
                case FilterName.TEAM:
                    const tData = teamFilter(filteredProjects, filteredRecords, filteredData[key].selectedIds);
                    filteredRecords = tData.records;
                    filteredProjects = tData.projects;
                    break;
                case FilterName.CLIENT:
                    const cData = clientFilter(filteredProjects, filteredRecords, filteredData[key].selectedIds);
                    filteredRecords = cData.records;
                    filteredProjects = cData.projects;
                    break;
                case FilterName.PROJECT:
                    const pData =  projectFilter(filteredProjects, filteredRecords, filteredData[key].selectedIds);
                    filteredRecords = pData.records;
                    filteredProjects = pData.projects;
                    break;
                case FilterName.TASK:
                    const sData =  taskFilter(filteredProjects, filteredRecords, filteredData[key].selectedIds);
                    filteredRecords = sData.records;
                    filteredProjects = sData.projects;
                    break;
                case FilterName.TAG:
                    const gData =  tagFilter(filteredProjects, filteredRecords, filteredData[key].selectedIds);
                    filteredRecords = gData.records;
                    filteredProjects = gData.projects;
                    break;
                case FilterName.STATUS:
                    const uData = statusFilter(filteredProjects, filteredRecords, filteredData[key].selectedIds);
                    filteredRecords = uData.records;
                    filteredProjects = uData.projects;
                    break;
                case FilterName.DESCRIPTION:
                    const dData = descriptionFilter(filteredProjects, filteredRecords, filteredData[key].input, filteredData[key].isWithout)
                    filteredRecords = dData.records;
                    filteredProjects = dData.projects;
                    break;
                default:
                    break;
            }
        });
        setFilteredProjects(filteredProjects);
        setFilteredRecords(filteredRecords);
    };

    const menu = (
        <Menu className={css(styles.dropdown)} onClick={onClickItem}>
            {
                filterTypes.map((data, i) => (
                    <Menu.Item key={i}>
                        <Checkbox className={css(styles.checkbox, styles.capitalize)} checked={data.selected}>{data.value}</Checkbox>
                    </Menu.Item>
                ))
            }
        </Menu>
    );
    return (
        <Card className={css(styles.card)} bordered={false}>
            <div className={css(styles.flex)}>
                <Dropdown overlay={menu} trigger={['click']} visible={visible} onVisibleChange={handleVisibleChange}>
                    <div className={css(styles.m10, styles.flex)}>
                        <div>Filter</div>
                        <CaretDownOutlined className={css(styles.m4)}/>
                    </div>
                </Dropdown>
                {filterTypesItem.map((data, index) => {
                    return (
                        data.selected ? (
                            <div className={css(styles.flex)} key={index}>
                                <Divider className={css(styles.divider)} type={'vertical'}/>
                                <div className={css(styles.m10)}>
                                    {data.dropdown({ title: data.value, filteredData, setFilteredData })}
                                </div>
                            </div>
                        ) : null
                    )
                })}
                <Button className={css(styles.button)} size={'large'} type={'primary'} onClick={applyFilter}>APPLY FILTER</Button>
            </div>
        </Card>
    );
}

const styles = {
    card: () => ({
        marginBottom: '25px',
        '& .ant-card-body': {
            padding: '10px',
        },
    }),
    flex: () => ({
        display: 'flex',
    }),
    divider: () => ({
        height: '45px',
    }),
    m10: () => ({
        margin: '10px',
    }),
    m4: () => ({
        margin: '4px',
    }),
    button: () => ({
        marginRight: 0,
        marginLeft: 'auto',
        marginBottom: 'auto',
        marginTop: 'auto',
    }),
    dropdown: () => ({
        padding: '15px 0',
    }),
    checkbox: () => ({
        padding: '3px 10px',
        width: '100%',
    }),
    capitalize: () => ({
        textTransform: 'capitalize',
    }),
};
