import React from 'react';
import { useFela } from 'react-fela';

export const ProjectSearchBar = (props) => {
  const { css } = useFela(props);
  const etalonTable = [];
  const searchInput = null;
  const search = () => {
    if (searchInput.value.length) {
      let afterSearch = props.etalonArr.filter(
        (obj) =>
          obj.name
            .toLowerCase()
            .indexOf(searchInput.value.toLowerCase().trim()) !== -1
      );
      props.projectsPageAction('CHANGE_ARR', { tableData: afterSearch });
    } else {
      props.projectsPageAction('CHANGE_ARR', { tableData: props.etalonArr });
    }
  };
  const setDefaultArr = () => {
    if (searchInput.value.length < 1) {
      props.projectsPageAction('CHANGE_ARR', { tableData: props.etalonArr });
    }
  };
  return (
    <div className={css(styleSheet.projectSearchBar)}>
      <div className="wrapper_project_search_bar">
        <div className="project_search_bar_search_field_container">
          <i className="magnifer" />
          <input
            onChange={(e) => setDefaultArr()}
            type="text"
            onKeyUp={(e) => (e.keyCode === 13 ? search() : null)}
            //   ref={(input) => (searchInput = input)}
            className="project_search_bar_search_field"
          />
        </div>
        <div className="project_search_bar_button_container">
          <button
            className="project_search_bar_button"
            onClick={(e) => search()}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

const styleSheet: any = {
  projectSearchBar: (props) => ({
    '& .wrapper_project_search_bar': {
      width: '100%',
      height: '59px',
      backgroundColor: '#4f4f4f',
      display: 'flex',
      alignItems: 'center',
    },
    '& .project_search_bar_select_wrapper': {
      width: '55px',
    },
    '& .wrapper_project_search_bar .project_search_bar_select_wrapper': {
      marginLeft: '30px',
    },
    '& .project_search_bar_search_field_container': {
      width: '100%',
      position: 'relative',
      marginLeft: '22px',
    },
    '& .project_search_bar_search_field_container .magnifer': {
      position: 'absolute',
      left: '0',
      top: '0',
      width: '24px',
      height: '100%',
      background: 'url("https://time.wobbly.me/static/media/magnifying-glass.b1516c7d.svg") no-repeat center',
    },
    '& .project_search_bar_search_field_container input': {
      width: '94%',
      marginLeft: '46px',
      outline: '0',
      border: '0',
      backgroundColor: 'transparent',
      fontFamily: '"Open Sans", sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: 'normal',
      fontSize: '16px',
      color: '#ffffff',
    },
    '& .project_search_bar_button_container': {
      height: '100%',
      width: '208px',
    },
    '& .project_search_bar_button_container button': {
      width: '100%',
      height: '100%',
      backgroundColor: '#616161',
      color: 'white',
      fontFamily: 'Open Sans',
      fontStyle: 'normal',
      fontWeight: '300',
      lineHeight: 'normal',
      fontSize: '16px',
      cursor: 'pointer',
    },
    '& button': {
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
    },
  }),
};
