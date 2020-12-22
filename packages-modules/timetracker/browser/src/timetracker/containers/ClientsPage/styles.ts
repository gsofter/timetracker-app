import { Property, Properties } from 'csstype';

export const styleSheet: { [key: string]: (obj) => Properties } = {
  clientsPageStyles: ({ theme }) => {
    const { primaryColor, name: themeName } = theme;
    return {
      height: '100vh',
      width: '-webkit-fill-available',
      backgroundColor: '#333333',
      '& .wrapper_clients_page': {
        fontFamily: '"Open Sans", sans-serif',
        color: '#ffffff',
        fontSize: '14px',
      },
      '& .wrapper_clients_page .data_container_clients_page': {
        padding: '25px 40px 0',
      },
      '& .wrapper_clients_page .wrapper_clients_search_bar': {
        width: '100%',
        height: '59px',
        backgroundColor: '#4f4f4f',
        display: 'flex',
        alignItems: 'center',
      },
      '& .wrapper_clients_page .clients_search_bar_select_wrapper': {
        width: '55px',
      },
      '& .wrapper_clients_page .wrapper_clients_search_bar .clients_search_bar_select_wrapper': {
        marginLeft: '30px',
      },
      '& .wrapper_clients_page .clients_search_bar_search_field_container': {
        width: '100%',
        position: 'relative',
        marginLeft: '22px',
      },
      '& .wrapper_clients_page .clients_search_bar_search_field_container .magnifer': {
        position: 'absolute',
        left: '0',
        top: '0',
        width: '24px',
        height: '100%',
        background:
          'url("https://time.wobbly.me/static/media/magnifying-glass.b1516c7d.svg") no-repeat center',
      },
      '& .wrapper_clients_page .clients_search_bar_search_field_container input': {
        width: '94%',
        marginLeft: '46px',
        outline: '0',
        border: '0',
        backgroundColor: 'transparent',
        fontFamily: '"Open Sans", sans-serif',
        fontStyle: 'normal',
        fontWeight: 'normal',
        lineHeight: 'normal',
        color: '#ffffff',
      },
      '& .wrapper_clients_page .clients_search_bar_button_container': {
        height: '100%',
        width: '208px',
      },
      '& .wrapper_clients_page .clients_search_bar_button_container button': {
        width: '100%',
        height: '100%',
        backgroundColor: '#616161',
        color: 'white',
        fontFamily: 'Open Sans',
        fontStyle: 'normal',
        fontWeight: '300',
        lineHeight: 'normal',
        cursor: 'pointer',
      },
      '& .wrapper_clients_page .clients_list_container': {
        marginTop: '53px',
        borderTop: '1px solid #4a4a4a',
      },
      '& .wrapper_clients_page .borderOf': {
        borderTop: 'none',
      },
      '& .wrapper_clients_page .animation_cat': {
        width: '430px',
        height: '420px',
      },
      '& .wrapper_clients_page--mobile .data_container_clients_page': {
        padding: '1rem',
      },
      '@media screen and (max-width: 894px)': {
        '& .wrapper_clients_page--mobile .clients_page_header': {
          flexDirection: 'column',
          paddingBottom: '30px',
        },
        '& .wrapper_clients_page--mobile .add_client_button': {
          marginTop: '20px',
        },
        '& .wrapper_clients_page--mobile .wrapper_clients_search_bar': {
          height: '40px',
        },
        '& .wrapper_clients_page--mobile .clients_search_bar_search_field_container': {
          marginLeft: '10px',
        },
        '& .wrapper_clients_page--mobile .clients_search_bar_search_field_container input': {
          marginLeft: '25px',
          width: '80%',
        },
        '& .wrapper_clients_page--mobile .clients_list_container': {
          marginTop: '30px',
          borderTop: '1px solid #4a4a4a',
        },
        '& .wrapper_clients_page--mobile .clients_list_item.list-header': {
          display: 'none',
        },
        '& .wrapper_clients_page--mobile .clients_list_item': {
          flexDirection: 'column',
          alignItems: 'initial',
          position: 'relative',
        },
        '& .wrapper_clients_page--mobile .client_time::before': {
          content: 'attr(data-label)',
          fontFamily: '"Open Sans", sans-serif',
          fontSize: '13px',
          color: '#bdbdbd',
        },
        '&.wrapper_clients_page--mobile .client_list_item_right_container': {
          marginTop: '25px',
        },
      },
      '@media (max-width: 680px)': {
        '& .wrapper_clients_page': {
          fontSize: '12px',
        },
      },
      '& button': {
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
      },
    };
  },
};
