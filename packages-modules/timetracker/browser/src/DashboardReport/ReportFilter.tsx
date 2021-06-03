import * as React from 'react';
import { useState } from 'react';
import { useFela } from 'react-fela';
import { Button, Card, Checkbox, Divider, Dropdown, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { ClientDropdown, DescriptionDropdown, ProjectDropdown, StatusDropdown, TagDropdown, TaskDropdown, TeamDropdown } from './FilterDropdown';
import { IProject_Output, ITimeRecord } from '@admin-layout/timetracker-core';
import * as _ from 'lodash';

interface IReportFilter {
    projects: Array<IProject_Output>;
    setFilteredProjects: Function;
    records: Array<ITimeRecord>;
    setFilteredRecords: Function;
}

const FilterTypes = [
    { value: 'Team', selected: true, dropdown: (props) => <TeamDropdown {...props}/> },
    { value: 'Client', selected: true, dropdown: (props) => <ClientDropdown {...props}/> },
    { value: 'Project', selected: true, dropdown: (props) => <ProjectDropdown {...props}/> },
    { value: 'Task', selected: true, dropdown: (props) => <TaskDropdown {...props}/> },
    { value: 'Tag', selected: true, dropdown: (props) => <TagDropdown {...props}/> },
    { value: 'Status', selected: true, dropdown: (props) => <StatusDropdown {...props}/> },
    { value: 'Description', selected: true, dropdown: (props) => <DescriptionDropdown {...props}/> },
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

    const clientFilter = (clientIds) => {
        let filteredProjects = projects.slice(0);
        if (clientIds.length) {
            if (clientIds.length === 1 && clientIds.includes('without')) {
                filteredProjects = projects.filter((project) => !project.clientId);
            } else {
                filteredProjects = projects.filter((project) => clientIds.includes(project.clientId));
            }
            setFilteredProjects(filteredProjects);
        } else {
            setFilteredProjects(projects);
        }
        const projectIds = filteredProjects.map((project) => project.id);
        const filteredRecords = records.filter((record) => projectIds.includes(record.projectId));
        setFilteredRecords(filteredRecords);
    }

    const applyFilter = () => {
        _.forIn(filteredData, (value, key) => {
            switch (key) {
                case 'team':
                    console.log('<<<Team-filter--')
                    break;
                case 'client':
                    console.log('<<<Client-filter--')
                    clientFilter(filteredData[key].selectedIds);
                    break;
                case 'project':
                    console.log('<<<Project-filter--')
                    break;
                case 'task':
                    console.log('<<<Task-filter--')
                    break;
                case 'tag':
                    console.log('<<<Tag-filter--')
                    break;
                case 'status':
                    console.log('<<<status-filter--')
                    break;
                case 'description':
                    console.log('<<<Description-filter--')
                    break;
                default:
                    break;
            }
        });
    };

    const menu = (
        <Menu className={css(styles.dropdown)} onClick={onClickItem}>
            {
                filterTypes.map((data, i) => (
                    <Menu.Item key={i}>
                        <Checkbox className={css(styles.checkbox)} checked={data.selected}>{data.value}</Checkbox>
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
};
