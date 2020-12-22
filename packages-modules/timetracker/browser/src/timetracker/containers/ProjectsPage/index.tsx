import React, { useState } from 'react';
import classNames from 'classnames';
import PageHeader from '../../components/PageHeader';
import { ProjectData } from '../../components/ProjectsData';
import { ProjectSearchBar } from '../../components/projectSearchBar';
import { CreateProjectModal } from '../../components/CreateProjectModal';
import { useFela } from 'react-fela';

const ProjectsPage = (props) => {
  const { css } = useFela(props);
  const [isInitialFetching, setIsInitialFetching] = useState(true);
  const [etalonArr, setEtalonArr] = useState([]);
  const [ addNewProjectModalToggle, setAddNewProjectModalToggle] = useState(false);
  const {
    tableData,
    projectsPageAction,
    isMobile,
    vocabulary,
    currentTeam,
  } = props;
  return (
    <div className={css(styleSheet.projectPage)}>
      <div
        className={classNames('wrapper_projects_page', {
          'wrapper_projects_page--mobile': isMobile,
        })} >
        {addNewProjectModalToggle && (
                <CreateProjectModal
                    // tableInfo={tableData}
                    // projectsPageAction={projectsPageAction}
                    // getProjects={this.getProjects}
                />
            )}
        <div className="data_container_projects_page">
          <PageHeader title="Projects">
            <button
              className="header-wrapper__child-button"
              onClick={(e) => setAddNewProjectModalToggle(true)
                // projectsPageAction('TOGGLE_MODAL', { toggle: true })
              }>
              Create new project
            </button>
          </PageHeader>
          <div className="project_page_filters">
                    <ProjectSearchBar
                        // tableInfo={this.props.tableData}
                        // etalonArr={this.state.etalonArr}
                        // projectsPageAction={projectsPageAction}
                    />
                </div>
          <div className="project_data_wrapper">
            <ProjectData
              tableInfo={tableData}
              projectsPageAction={projectsPageAction}
              // editedProject={this.props.editedProject}
              // editProjectModal={this.props.editProjectModal}
              // getProjects={this.getProjects}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
const styleSheet: any = {
  projectPage: (props) => ({
    height: '100vh',
    width: '-webkit-fill-available',
    '& .wrapper_projects_page': {
      position: 'relative',
      height: '100%',
    },
    '& .wrapper_projects_page .data_container_projects_page': {
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      backgroundColor: '#333333',
      padding: '25px 40px 0',
      overflowY: 'auto',
    },
    '& .wrapper_projects_page .project_data_wrapper': {
      marginTop: '6%',
    },
    '& .wrapper_projects_page .delete': {
      width: '24px',
      height: '24px',
      background: 'url("../../images/icons/waste-bin.svg") no-repeat center',
    },
    '& .wrapper_projects_page--mobile .data_container_projects_page': {
      padding: '1rem',
    },
    '& .wrapper_projects_page--mobile .project_page_filters': {
      marginTop: '30px',
    },
    '& .wrapper_projects_page--mobile .wrapper_project_search_bar': {
      height: '40px',
    },
    '& .wrapper_projects_page--mobile .project_search_bar_search_field_container': {
      marginLeft: '10px',
    },
    '& .wrapper_projects_page--mobile .project_search_bar_search_field_container input': {
      marginLeft: '25px',
      width: '80%',
    },
    '@media screen and (max-width: 894px)': {
      '& .wrapper_projects_page--mobile .create_projects_modal_container': {
        width: '100%',
        maxWidth: '350px',
      },
      '& .wrapper_projects_page--mobile .create_projects_modal_data_input_container': {
        flexWrap: 'wrap',
      },
      '& .wrapper_projects_page--mobile .clients_list_wrapper': {
        marginLeft: '0',
        width: '100%',
        marginTop: '35px',
      },
      '& .wrapper_projects_page--mobile .create_projects_modal_button_container': {
        justifyContent: 'center',
        marginTop: '14px',
      },
      '& .wrapper_projects_page--mobile .create_projects_modal_button_container_button': {
        marginRight: '0',
      },
      '& .wrapper_projects_page--mobile .edit_projects_modal_container': {
        width: '100%',
        maxWidth: '350px',
      },
      '& .wrapper_projects_page--mobile .edit_projects_modal_data_input_container': {
        flexWrap: 'wrap',
      },
      '& .wrapper_projects_page--mobile .edit_projects_modal_button_container': {
        justifyContent: 'center',
        marginTop: '14px',
      },
      '& .wrapper_projects_page--mobile .edit_projects_modal_button_container_button': {
        marginRight: '0',
      },
      '& .wrapper_projects_page--mobile .project_data_wrapper': {
        marginTop: '30px',
      },
      '& .wrapper_projects_page--mobile table': {
        borderTop: '1px solid #bdbdbd',
      },
      '& .wrapper_projects_page--mobile thead': {
        display: 'none',
      },
      '& .wrapper_projects_page--mobile .project_data_wrapper table tbody td': {
        padding: '10px 0',
        position: 'static',
        height: 'auto',
        minHeight: '50px',
      },
      '& .wrapper_projects_page--mobile .project_data_wrapper table tbody td:first-child': {
        width: '85%',
      },
      '& .wrapper_projects_page--mobile td:before': {
        content: 'attr(data-label)',
        fontSize: '13px',
        color: '#bdbdbd',
      },
      '& .wrapper_projects_page--mobile tr': {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      },
      '& .wrapper_projects_page--mobile .edit_button': {
        top: '50%',
        transform: 'translateY(-50%)',
        right: '5px',
        width: '30px',
        height: '30px',
        backgroundSize: 'cover',
        margin: '0',
      },
    },
  }),
};

export default ProjectsPage;
