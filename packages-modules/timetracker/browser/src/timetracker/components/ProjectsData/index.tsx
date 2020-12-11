import React, { Component, useState } from 'react';
import { useFela } from 'react-fela';

// Services
import { getTimeDurationByGivenTimestamp } from '../../services/timeService';
// Components
// import EditProjectModal from '../EditProjectModal/index';

const tableInfo = [
  {
    totalTime: '4',
    projects: {
      id: 'e3180114-d88f-40fc-a4fb-3c6a8e4a0dc8',
      name: 'any',
      project_color: {
        name: 'green',
      },
    },
    clients: {
      client: {
        name: 'test',
      },
    },
  },
  {
    totalTime: '7',
    projects: {
      id: 'e3180114-d88f-40fc-a4fb-3c6a8e4a0d78',
      name: 'repo',
      project_color: {
        name: 'green',
      },
    },
    clients: {
      client: {
        name: 'test client',
      },
    },
  },
];
export const ProjectData = (props) => {
  const { css } = useFela(props);
  const { currentTeam, durationTimeFormat } = props;
  const tableHeader = [
    {
      key: 1,
      value: 'Project name',
      className: 'table-project-name',
    },
    {
      key: 2,
      value: 'Client',
      className: 'table-project-client',
    },
    {
      key: 3,
      value: 'Time',
      className: 'table-project-time',
    },
  ];
  const [editProjectModal, setEditProjectModal] = useState(false);
  const setEdiItem = (item: any) => {
    // this.props.projectsPageAction('SET_EDIT_PROJECT', { tableData: item });
    // this.props.projectsPageAction('TOGGLE_EDIT_PROJECT_MODAL', { tableData: true });
  };

  const tableInfoElements = tableInfo.map((item, index) => (
    <tr key={'table-header_' + index}>
      <td data-label="Project name:">{item.projects.name}</td>
      <td data-label="Client">
        {item.clients.client ? item.clients.client.name : '-'}
      </td>
      <td data-label="Time">
        {getTimeDurationByGivenTimestamp(item.totalTime, durationTimeFormat)}
        {/* {checkIsAdminByRole(currentTeam.data.role) && ( */}
        <i className="edit_button" onClick={(e) => setEdiItem(item)} />
        {/* )} */}
      </td>
    </tr>
  ));
  const tableHeaderElements = tableHeader.map((item, index) => (
    <th key={'table-info_' + index} className={item.className}>
      {item.value}
    </th>
  ));
  return (
    <div className={css(styleSheet.projectDataStyle)}>
      <div className="project_data_wrapper">
        {editProjectModal && (
          <p>here is</p>
          // <EditProjectModal
          //     editedProject={this.props.editedProject}
          //     projectsPageAction={this.props.projectsPageAction}
          //     getProjects={this.props.getProjects}
          // />
        )}
        <table>
          <thead>
            <tr>{tableHeaderElements}</tr>
          </thead>
          <tbody>{tableInfoElements}</tbody>
        </table>
      </div>
    </div>
  );
};

const styleSheet: any = {
  projectDataStyle: (props) => ({
      width: '100%',
    '& .project_data_wrapper': {
      width: '100%',
    },
    '& .project_data_wrapper table': {
      width: '100%',
      borderSpacing: 'inherit',
    },
    '& .project_data_wrapper table th, .project_data_wrapper table td': {
      textAlign: 'left',
    },
    '& .project_data_wrapper table thead tr': {
      borderBottom: '1px solid white',
    },
    '& .project_data_wrapper table tbody td': {
      position: 'relative',
      height: '50px',
      fontFamily: '"Open Sans", sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: 'normal',
      fontSize: '16px',
      color: '#ffffff',
    },
    '& .table-project-name': {
      width: '60%',
    },
    '& .table-project-client': {
      width: '25%',
    },
    '& .table-project-time': {
      width: '15%',
    },
    '& .project_data_wrapper table tbody tr': {
      borderBottom: '1px solid rgba(189,189,189,0.11)',
    },
    '& .project_data_wrapper table tbody tr:hover': {
      backgroundColor: '#2f2f2f',
    },
    '& .project_data_wrapper table th': {
      fontFamily: '"Open Sans", sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: 'normal',
      fontSize: '18px',
      textAlign: 'left',
      color: '#ffffff',
      borderBottom: '1px solid #bdbdbd',
      paddingBottom: '11px',
    },
    '& .project_data_wrapper .delete': {
      position: 'absolute',
      top: '12px',
      left: '90%',
      width: '24px',
      height: '24px',
      background: 'url("../../images/icons/waste-bin.svg") no-repeat center',
      cursor: 'pointer',
    },
    '& .project_data_wrapper table tbody': {
      height: '100%',
      width: '100%',
    },
    '& .create_projects_modal_data_select_container .select_list .item:hover': {
      backgroundColor: '#cecece',
    },
    '& .create_projects_modal_data .green': {
      backgroundColor: 'green',
    },
    '& .create_projects_modal_data .red': {
      backgroundColor: 'red',
    },
    '& .create_projects_modal_data .blue': {
      backgroundColor: 'blue',
    },
    '& .create_projects_modal_data .pink': {
      backgroundColor: 'pink',
    },
    '& .project_data_wrapper .edit_button': {
      display: 'block',
      position: 'absolute',
      top: '21px',
      right: '8px',
      marginTop: '-2px',
      marginLeft: '18px',
      width: '15px',
      height: '15px',
      background:
        'url("../../images/icons/baseline-create-24px.svg") no-repeat center',
      cursor: 'pointer',
      backgroundSize: '20px',
    },
  }),
};
