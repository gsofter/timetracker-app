import React, { useState } from 'react';
import classNames from 'classnames';
import { useFela } from 'react-fela';

const FolderIcon = ({ className }) => (
  <svg
    className={className}
    width="24"
    height="20"
    viewBox="0 0 24 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.6 0.399902H2.4C1.08 0.399902 0 1.4799 0 2.7999V17.1999C0 18.5199 1.08 19.5999 2.4 19.5999H21.6C22.92 19.5999 24 18.5199 24 17.1999V5.1999C24 3.8799 22.92 2.7999 21.6 2.7999H12L9.6 0.399902Z"
      fill="#C1C0C0"
    />
  </svg>
);

export const ProjectsListPopup = (props: any) => {
  const { css } = useFela(props);
  const [projectsList, setProjectList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const dropdown: any = React.createRef();
  const input: any = React.createRef();

  const { vocabulary, onChange, listItem, withFolder, isMobile } = props;
  // const { v_find } = vocabulary;

  const getProjectData = (key) => {
    // tslint:disable-next-line: no-console
    console.log('here is');
    // const { projectsList, selectedProjectId } = props;
    // const filteredProjectsList = projectsList.filter(
    //   (project) => project.id === selectedProjectId
    // );
    // if (key === 'color') {
    //   if (filteredProjectsList.length > 0) {
    //     return filteredProjectsList[0].projectColor.name;
    //   }
    // } else if (key === 'name') {
    //   if (filteredProjectsList.length > 0) {
    //     return filteredProjectsList[0].name;
    //   }
    // }
    // return filteredProjectsList[0];
  };
  const closeDropdown = (event) => {
    if (
      !event.target.classList.contains(
        'project-list-popup__dropdown-list-input'
      )
    ) {
      const { onChangeVisibility } = props;
      document.removeEventListener('click', closeDropdown);
      setIsOpen(false);
      // this.setState(
      //     {
      //         isOpen: false,
      //     },
      //     () => onChangeVisibility(false)
      // );
    }
  };
  const openDropdown = (event) => {
    const { onChangeVisibility, disabled } = props;
    if (disabled) {
      return;
    }
    setIsOpen(!isOpen);
    // setState(
    //     {
    //         isOpen: true,
    //     },
    //     () => onChangeVisibility(true)
    // );
    document.addEventListener('click', closeDropdown);
  };

  const onChangeInput = (event) => {
    const value = event.target.value;
    setInputValue(value.trim().toLowerCase());
  };

  const filterList = (initial) => {
    const { projectsList } = props;

    const filteredProjectsList = projectsList.filter(
      (project) => project.name.toLowerCase().indexOf(inputValue) !== -1
    );
    setInputValue(initial ? projectsList : filteredProjectsList);
  };

  return (
    <div className={css(styleSheet.ProjectsListPopupStyles)}>
      <div
        className={classNames('project-list-popup', {
          'project-list-popup--list-item': listItem,
          'project-list-popup--mobile': isMobile,
        })}>
        <div
          className="project-list-popup__selected-project"
          onClick={openDropdown}>
          <span
            className="project-list-popup__circle"
            // style={{ background: getProjectData('color') }}
            style={{ backgroundColor: 'red' }}
          />
          <span className="project-list-popup__project-name">
            Project name
            {/* {getProjectData('name')} */}
          </span>
          {withFolder && (
            <FolderIcon className="project-list-popup__folder-icon" />
          )}
        </div>
        {isOpen && (
          <div
            ref={dropdown}
            className={classNames('project-list-popup__dropdown')}>
            <input
              className="project-list-popup__dropdown-list-input"
              ref={input}
              value={inputValue}
              onChange={onChangeInput}
              type="text"
              // placeholder={`${v_find}...`}
            />
            <div className="project-list-popup__dropdown-list">
              {projectsList.map((project) => {
                const { id, name, projectColor } = project;
                return (
                  <div
                    key={id}
                    className="project-list-popup__dropdown-list-item"
                    onClick={(event) => onChange(id)}>
                    <span
                      className="project-list-popup__dropdown-list-item-circle"
                      style={{ background: projectColor.name }}
                    />
                    <span className="project-list-popup__dropdown-list-item-project-name">
                      {name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styleSheet: any = {
  ProjectsListPopupStyles: (props) => ({
    position: 'relative',
    '& .project-list-popup': {
      cursor: 'pointer',
      position: 'relative',
      // z-index: 1,
      margin: '0 0.5rem 0 0',
    },
    '& .project-list-popup__selected-project': {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    '& .project-list-popup__circle': {
      display: 'inline-block',
      margin: '0 0.5rem 0 0',
      minWidth: '1.2rem',
      minHeight: '1.2rem',
      borderRadius: '50%',
    },
    '& .project-list-popup__project-name': {
      fontSize: '1.4rem',
      margin: '0 0.5rem 0 0',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      maxWidth: '111111',
    },

    '& .project-list-popup__folder-icon': {},
    '& .project-list-popup__dropdown': {
      position: 'absolute',
      zIndex: '1',
      padding: '1rem',
      width: '24.5rem',
      top: '130%',
      right: '0',
      background: 'white',
      borderRadius: '0.4rem',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.25)',
      animation: 'slowVisibility 0.3s',
    },
    '& .project-list-popup__dropdown-list-input': {
      minWidth: '100%',
      fontSize: '1.6rem',
      lineHeight: '1.9rem',
      color: '#000000',
      // padding: '0.6rem 0.5rem',
      margin: '0 0 0.5rem 0',
      border: '1px solid #bdbdbd',
    },
    '& .project-list-popup__dropdown-list': {
      overflowY: 'auto',
      height: '231px',
    },
    '& .project-list-popup__dropdown-list-item': {
      display: 'flex',
      minWidth: '100%',
      alignItems: 'center',
      // margin: 0 0 0.5rem 0,
      padding: '0.7rem 0.5rem',
      borderRadius: '0.4rem',
      '&:hover': {
        backgroundColor: '#e0e0e0',
      },
      '&:last-child': {
        margin: 0,
      },
    },
    '& .project-list-popup__dropdown-list-item-circle': {
      display: 'inline-block',
      margin: '0 0.5rem 0 0',
      minWidth: '1.2rem',
      minHeight: '1.2rem',
      borderRadius: '50%',
    },
    '& .project-list-popup__dropdown-list-item-project-name': {
      color: '#000000',
      fontSize: '1.4rem',
      lineHeight: '1.9rem',
    },
    '& .project-list-popup--list-item': {
      margin: '0 auto 0 0',

      '& .project-list-popup__circle': {
        minWidth: '0.8rem',
        minHeight: '0.8rem',
      },
      '& .project-list-popup__dropdown': {
        right: 'unset',
        left: '0',
        width: '22rem',
      },

      '& .project-list-popup__dropdown-list-input': {
        fontSize: '1.4rem',
        lineHeight: '1.4rem',
      },

      '& .project-list-popup__dropdown-list': {
        height: '14rem',
      },

      '& .project-list-popup__dropdown-list-item-circle': {
        minWidth: '0.8rem',
        minHeight: '0.8rem',
      },

      '& .project-list-popup__dropdown-list-item-project-name': {
        lineHeight: '1.4rem',
      },
    },

    // Mobile styles
    '& .project-list-popup--mobile': {
      '& .project-list-popup__project-name': {
        margin: '0 1rem 0 0',
        maxWidth: '100px',
      },
    },
  }),
};