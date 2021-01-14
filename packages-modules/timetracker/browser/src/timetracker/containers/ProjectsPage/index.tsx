import React, { Component, useState } from 'react';
import { PageContainer } from '@admin-layout/components';
import { Button } from 'antd';
import PageHeader from '../../components/PageHeader';
import { ProjectData } from '../../components/ProjectsData';
import { ProjectSearchBar } from '../../components/projectSearchBar';
import DemoData from '../../demoData';


const ProjectsPage = (props) => {
  const [timeEntriesList, setTimeEntriesList] = useState(DemoData.project_v2);
  const tableInfo = timeEntriesList.map((item: any, index: number) => {
    return {
      client: item.client ? item.client : '-',
      time: '00:00:00',
      name: item.name,
      id: '23456',
    };
  });
    return (
      <PageContainer>
        <PageHeader>
          <Button type="primary" className="theme-primary">Create new project</Button>
            {/* <button
              className="header-wrapper__child-button"
              // onClick={(e) => setAddNewProjectModalToggle(true)
              //   // projectsPageAction('TOGGLE_MODAL', { toggle: true })
              // }
              >
              Create new project
            </button> */}
          </PageHeader>
          {/* <div className="project_page_filters">
              <ProjectSearchBar
                  // tableInfo={this.props.tableData}
                  // etalonArr={this.state.etalonArr}
                  // projectsPageAction={projectsPageAction}
              />
          </div> */}
           <div className="project_data_wrapper">
            <ProjectData
              tableInfo={tableInfo}
            />
          </div>
      </PageContainer>
    );
};
export default ProjectsPage;
