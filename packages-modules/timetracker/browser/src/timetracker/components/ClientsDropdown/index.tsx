import React, { useState, useRef } from 'react';
import { useFela } from 'react-fela';

export const ClientsDropdown = (props) => {
  const { css } = useFela(props);
  const [clientsList, setClientsList] = useState([]);
  const [showList, setShowList] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const searchClientInput = useRef(null);

  const removeSelectedClient = (event) => {
    event.stopPropagation();
    setSelectedItem(null);
    props.clientSelect(null);
  };
  const searchClient = (e) => {
    let targetValue = e.target.value;
    let afterSearch = props.clientsList.filter(
      (obj) =>
        obj.name.toLowerCase().indexOf(targetValue.toLowerCase().trim()) !== -1
    );
    setClientsList(afterSearch);
    setInputValue(targetValue);
  };
  const clientSelect = (name, id) => {
    // setInputValue({ inputValue: '', showList: false, selectedItem: { name, id } });
    props.clientSelect({ name, id });
  };

  return (
    <div className={css(styleSheet.ClientsDropdownStyle)}>
      <div
        className="clients_list_wrapper"
        // data-label="v_select_client"
        onClick={(event) => event.stopPropagation()}>
        <div
          className="clients_list_select-title"
          onClick={(e) => setShowList(!showList)}>
          <span>
            {selectedItem ? (
              selectedItem.name
            ) : (
              <span className="clients-select-placeholder">Clients...</span>
            )}
          </span>
          <span>
            {selectedItem ? (
              <i className="client-remove" onClick={removeSelectedClient} />
            ) : null}
          </span>
        </div>
        <i className="clients-vector" onClick={(e) => setShowList(!showList)} />
        {showList && (
          <div className="clients_list_dropdown">
            <input
              ref={searchClientInput}
              className="clients_list_input"
              placeholder="Find..."
              type="text"
              value={inputValue}
              onChange={searchClient}
            />
            <div className="clients_list">
              {clientsList.length === 0 && (
                <div className="empty-list">Is empty</div>
              )}
              {clientsList.map((client) => {
                return (
                  <div
                    key={client.id}
                    className="clients_list_item"
                    onClick={(e) => clientSelect(client.name, client.id)}>
                    <div className="clients_list_item_name">{client.name}</div>
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
  ClientsDropdownStyle: (props) => ({
    position: 'relative',
    width: '100%',
    '& .clients_list_wrapper': {
      borderRadius: '0.4rem',
      position: 'relative',
      zIndex: '1',
      display: 'flex',
      flexDirection: 'column',
      top: '110%',
      left: '0',
      width: '100%',
      marginTop: '35px',
      background: '#ffffff',
    },
    '& .clients_list_wrapper .clients_list_select-title': {
      paddingLeft: '16px',
      flexGrow: '1',
      height: '47px',
      border: '1px solid #828282',
      borderRadius: '4px',
      textTransform: 'none',
      fontFamily: '"Open Sans", sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      lineHeight: '47px',
      fontSize: '16px',
      color: '#4f4f4f',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
    },
    '& .clients_list_wrapper .clients-select-placeholder': {
      fontSize: '14px',
    },
    '& .clients_list_wrapper .clients_list_input': {
      fontFamily: '"Open Sans", sans-serif',
      outline: 'none',
      padding: '0.5rem',
      border: '1px solid #bdbdbd',
      margin: '0',
      width: '100%',
      marginBottom: '10px',
    },
    '& .clients_list_wrapper .clients_list_dropdown': {
      flexGrow: '1',
      position: 'absolute',
      width: '100%',
      background: 'white',
      fontSize: '14px',
      border: '1px solid grey',
      borderRadius: '4px',
      top: '110%',
      padding: '10px',
      boxShadow: '0px 4px 24px rgba(0,0,0,0.25)',
    },
    '& .clients_list_wrapper .clients_list': {
      height: '18.5rem',
      overflow: 'auto',
    },
    '& .clients_list_wrapper .empty-list': {
      padding: '0.3rem 0.5rem',
      color: '#4f4f4f',
    },
    '& .clients_list_wrapper .clients_list_item': {
      display: 'flex',
      alignItems: 'center',
      margin: '0 0 0.5rem 0',
      padding: '0.3rem 0.5rem',
      borderRadius: '0.4rem',
      cursor: 'pointer',
    },
    '& .clients_list_wrapper .clients_list_item:hover': {
      backgroundColor: '#e0e0e0',
    },
    '& .clients_list_wrapper .clients_list_item:last-child': {
      margin: '0',
    },
    '& .clients_list_wrapper .clients-vector': {
      position: 'absolute',
      width: '24px',
      height: '24px',
      background:
        'url("https://time.wobbly.me/static/media/close_black.ee636d80.svg") no-repeat center',
      right: '5px',
      top: '50%',
      transform: 'translateY(-50%)',
    },
    '& .clients_list_wrapper .client-remove': {
      width: '30px',
      height: '30px',
      background:
        'url("https://time.wobbly.me/static/media/close_black.ee636d80.svg") no-repeat center',
      backgroundSize: '35%',
    },
    '& .clients_list_wrapper::before': {
      content: 'attr(data-label)',
      position: 'absolute',
      fontFamily: '"Open Sans", sans-serif',
      color: '#4f4f4f',
      fontSize: '14px',
      top: '-25px',
    },
    '& .clients_list_item_name': {
      color: 'black',
    },
  }),
};
