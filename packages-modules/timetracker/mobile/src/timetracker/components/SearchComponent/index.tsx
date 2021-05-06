import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

export const SearchComponent = ({ value, setValue, handleSearch, handleReset, vocabulary }) => {
  return (
    <div>
      <Input
        value={value}
        placeholder="Search"
        onChange={event => setValue(event.target.value)}
        prefix={<SearchOutlined onClick={() => handleSearch()} />}
      />
    </div>
  );
};
