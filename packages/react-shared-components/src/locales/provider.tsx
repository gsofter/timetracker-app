import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import { LOCALES } from './constants';
import getLocale from './getLocale';

const Provider = ({ children, locale }) => (
  <IntlProvider
    textComponent={Fragment}
    locale={locale}
    messages={getLocale[locale].default}
  >
    {children}
  </IntlProvider>
);

Provider.displayName = 'I18nProvider';

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  locale: PropTypes.oneOf(Object.values(LOCALES)),
};

Provider.defaultProps = {
  locale: LOCALES.EN_US,
};

export default Provider;
