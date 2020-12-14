import { relative } from 'path';
import React from 'react';
import { useFela } from 'react-fela';

export const CreateProjectModal = (props) => {
  const { css } = useFela(props);
  return (
    <div className={css(styleSheet.projectPage)}>
      <div className="wrapper_create_projects_modal">
        <div className="create_projects_modal_background" />
        <div className="create_projects_modal_container">
          <div className="create_projects_modal_header">
            <div className="create_projects_modal_header_title">
              Create project
            </div>
            <i
              className="create_projects_modal_header_close"
              //   onClick={(e) =>
              //     // props.projectsPageAction('TOGGLE_MODAL', { toggle: false })
              //   }
            />
          </div>
          <div className="create_projects_modal_data">
            <div
              className="create_projects_modal_data_input_container"
              data-label="Add project name">
              <input
                className="project-input"
                type="text"
                // ref={input => {
                //     createProjectInput = input;
                // }}
                placeholder="Project name..."
              />
              <div
                className="create_projects_modal_data_select_container"
                // onClick={e => toggleSelect()}
              >
                <div className="select_main">
                  {/* <div className={`circle ${state.selectedValue.name}`} /> */}
                </div>
                <i className="vector" />
                {/* {state.listOpen && <div className="select_list">{selectItems}</div>} */}
              </div>
              {/* <ClientsDropdown
                            clientsList={clientsList}
                            clientSelect={clientSelect}
                            vocabulary={vocabulary}
                        /> */}
              {/* {props.userReducer.user.tokenJira && (
                            <ProjectsDropdown
                                relationProjectsList={relationProjectsList}
                                projectSelect={projectSelect}
                                vocabulary={vocabulary}
                            />
                        )} */}
            </div>
          </div>
          <div className="create_projects_modal_button_container">
            <button
              className="create_projects_modal_button_container_button"
              // onClick={e => addProject(props.tableInfo)}
            >
              Create project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styleSheet: any = {
  projectPage: (props) => ({
    position: 'relative',
    '& .create_projects_modal_background': {
      position: 'fixed',
      backgroundColor: 'rgba(89,89,89,0.5)',
      left: '0',
      right: '0',
      bottom: '0',
      top: '0',
      zIndex: '1',
    },
    '& .create_projects_modal_container': {
      position: 'fixed',
      transform: 'translate(-50%,-50%)',
      top: '50%',
      left: '50%',
      width: '660px',
      zIndex: '2',
      background: '#ffffff',
      border: '1px solid #828282',
      boxSizing: 'border-box',
      borderRadius: '4px',
    },
    '& .create_projects_modal_header': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      borderBottom: '1px solid #bdbdbd',
      height: '63px',
    },
    '& .create_projects_modal_header_title': {
      fontFamily: '"Open Sans", sans-serif',
      lineHeight: 'normal',
      fontSize: '16px',
      color: '#000000',
      fontWeight: '600',
    },
    '& .create_projects_modal_header_close': {
      display: 'block',
      width: '24px',
      height: '24px',
      background:
        'url("https://time.wobbly.me/static/media/close_black.ee636d80.svg") no-repeat center',
      cursor: 'pointer',
    },
    '& .create_projects_modal_data': {
      padding: '0 20px',
    },
    '& .create_projects_modal_data .create_projects_modal_data_input_container': {
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '43px',
      flexWrap: 'wrap',
    },
    '& .create_projects_modal_data_input_container::before': {
      content: 'attr(data-label)',
      position: 'absolute',
      fontFamily: '"Open Sans", sans-serif',
      color: '#4F4F4F',
      fontSize: '14px',
      top: '-25px',
    },
    '& .create_projects_modal_data .create_projects_modal_data_input_container .project-input': {
      paddingLeft: '16px',
      flexGrow: '1',
      height: '47px',
      border: '1px solid #828282',
      borderRadius: '4px 0 0 4px',
      textTransform: 'none',
      fontFamily: '"Open Sans", sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: 'normal',
      fontSize: '16px',
      color: '#4f4f4f',
      '-webkit-appearance': 'none',
    },
    '& .create_projects_modal_data .create_projects_modal_data_input_container input::-webkit-input-placeholder': {
      fontFamily: '"Open Sans", sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: 'normal',
      fontSize: '14px',
      paddingTop: '2px',
      color: '#4f4f4f',
    },
    '& .create_projects_modal_data .create_projects_modal_data_input_container input::-moz-placeholder': {
      fontFamily: '"Open Sans", sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: 'normal',
      fontSize: '14px',
      color: '#4f4f4f',
    },
    '& .create_projects_modal_data .create_projects_modal_data_input_container input:-moz-placeholder': {
      fontFamily: '"Open Sans", sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: 'normal',
      fontSize: '14px',
      color: '#4f4f4f',
    },
    '& .create_projects_modal_data .create_projects_modal_data_input_container input:-ms-input-placeholder': {
      fontFamily: '"Open Sans", sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: 'normal',
      fontSize: '14px',
      color: '#4f4f4f',
    },
    '& .create_projects_modal_data .circle': {
      width: '23px',
      height: '23px',
      borderRadius: '50%',
    },
    '& .create_projects_modal_data .create_projects_modal_data_select_container': {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '10px',
      width: '70px',
      height: '47px',
      marginLeft: '-1px',
      border: '1px solid #828282',
      borderTopRightRadius: '4px',
      borderBottomRightRadius: '4px',
      cursor: 'pointer',
    },
    '& .create_projects_modal_data_select_container .select_list': {
      background: 'white',
      border: '1px solid #828282',
      width: '70px',
      position: 'absolute',
      top: '110%',
      left: '-1px',
      zIndex: '99',
      borderRadius: '4px',
      boxShadow: '0px 4px 24px rgba(0,0,0,0.25)',
    },
    '& .create_projects_modal_data_select_container .select_list .item': {
      cursor: 'pointer',
      padding: '10px',
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
    '.create_projects_modal_data .blue': {
      backgroundColor: 'blue',
    },
    '.create_projects_modal_data .pink': {
      backgroundColor: 'pink',
    },
    '.create_projects_modal_button_container': {
      marginTop: '28px',
      padding: '0',
      display: 'flex',
      justifyContent: 'flex-end',
      paddingBottom: '19px',
    },
    '& .create_projects_modal_button_container_button': {
      width: '177px',
      height: '41px',
      marginRight: '20px',
      border: '0',
      backgroundColor: '#27ae60',
      fontFamily: '"Open Sans", sans-serif',
      fontStyle: 'normal',
      fontWeight: 'bold',
      lineHeight: 'normal',
      fontSize: '14px',
      color: '#ffffff',
      borderRadius: '0',
      cursor: 'pointer',
    },
    '& .create_projects_modal_container i.vector': {
      width: '24px',
      height: '24px',
      marginLeft: '5px',
      background: 'url("https://time.wobbly.me/static/media/Vector.6802a7a2.svg") no-repeat center',
    },
  }),
};
