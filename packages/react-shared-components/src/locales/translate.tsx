import React from 'react';
import { FormattedMessage } from 'react-intl';

export const Translate = (id, value = {}) => <FormattedMessage id={id} values={{ ...value }} />;
