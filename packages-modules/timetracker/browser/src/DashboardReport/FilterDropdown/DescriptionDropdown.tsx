import * as React from 'react';
import { useFela } from 'react-fela';
import { useState } from 'react';
import { Checkbox, Dropdown, Input, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { styles } from './styles';

interface IStatusDropdown {
    title: string;
}

export const DescriptionDropdown = (props: IStatusDropdown) => {
    const { title } = props;
    const [visible, setVisible] = useState(false);
    const [description, setDescription] = useState('');
    const { css } = useFela();

    const handleVisibleChange = (value) => {
        setVisible(value);
    };
    const onChangeInput = (e) => {
        setDescription(e.target.value);
    }

    const content = (
        <Menu>
            <Menu.Item disabled={true}>
                <Input onChange={onChangeInput} placeholder={'Enter description...'}/>
            </Menu.Item>
            <Menu.Divider className={css(styles.divider)}/>
            <Menu.Item key={'without'} className={css(styles.item)}>
                <Checkbox value={'without'} className={css(styles.checkbox)}>{'Without description'}</Checkbox>
            </Menu.Item>
        </Menu>
    )
    return (
        <Dropdown
            overlay={content}
            trigger={['click']}
            placement="bottomLeft"
            visible={visible}
            onVisibleChange={handleVisibleChange}
        >
            <div className={css(styles.flex)}>
                <div>{title}</div>
                <CaretDownOutlined className={css(styles.m4)}/>
            </div>
        </Dropdown>
    );
}
