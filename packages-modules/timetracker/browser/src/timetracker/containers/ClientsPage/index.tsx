import React, { useState } from 'react';
import classNames from 'classnames';
import { useFela } from 'react-fela';
import { CustomScrollbar } from '../../components/CustomScrollbar';
import PageHeader from '../../components/PageHeader';
import { BlankListComponent } from '../../components/BlankListcomponent';
import v from '../../en';
import { styleSheet } from './styles';

const ClientsPage = (props) => {
  const { css } = useFela(props);
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [editedClient, setEditedClient] = useState(null);
  const [clientsList, setClientsList] = useState([]);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const { vocabulary, isMobile, currentTeam, isInitialFetching } = props;

  const searchClient = async () => {
    let afterSearch = clientsList.filter(
      (obj) =>
        obj.company_name
          .toLowerCase()
          .indexOf(searchValue.toLowerCase().trim()) !== -1
    );
    setClientsList(afterSearch);
  };

  return (
    <div className={css(styleSheet.clientsPageStyles)}>
      <CustomScrollbar>
        <div
          className={classNames('wrapper_clients_page', {
            'wrapper_clients_page--mobile': isMobile,
          })}>
          {showModal && (
            // <ClientModal
            // closeModal={closeModal}
            // addNewClient={addNewClient}
            // toEditClient={editClient}
            // deleteClient={deleteClient}
            // editedClient={editedClient}
            // vocabulary={vocabulary}
            // />
            <p>Here is</p>
          )}
          <div className="data_container_clients_page">
            <PageHeader title={v.v_clients}>
              <button
                className="header-wrapper__child-button"
                // onClick={() => setState({ showModal: true })}
              >
                {v.v_add_new_client}
              </button>
            </PageHeader>

            <div className="wrapper_clients_search_bar">
              <div className="clients_search_bar_search_field_container">
                <i className="magnifer" />
                <input
                  // onChange={handleChange}
                  type="text"
                  value={searchValue}
                  onKeyUp={(e) => (e.keyCode === 13 ? searchClient() : null)}
                  className="clients_search_bar_search_field"
                />
              </div>
              <div className="clients_search_bar_button_container">
                <button
                  className="clients_search_bar_button"
                  onClick={searchClient}>
                  {v.v_apply}
                </button>
              </div>
            </div>
            <div className={classNames('clients_list_container')}>
              {clientsList &&
                clientsList.length === 0 &&
                BlankListComponent(v.v_no_clients, null, null)}
              {/* {clientsList.map((item, index) => (
                <ClientComponent
                client={item}
                vocabulary={vocabulary}
                index={index}
                editClient={editClient}
                key={index}
                />
              ))} */}
            </div>
          </div>
        </div>
      </CustomScrollbar>
    </div>
  );
};

export default ClientsPage;
