import * as React from 'react';
import { useFela } from 'react-fela';
import { useState } from 'react';
import { Badge, Checkbox, Dropdown, Input, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { styles } from './styles';

interface IStatusDropdown {
    title: string;
}

export const DescriptionDropdown = (props: IStatusDropdown) => {
    const { title } = props;
    const [visible, setVisible] = useState(false);
    const [count, setCount] = useState(0);
    const [description, setDescription] = useState('');
    const { css } = useFela();

    const handleVisibleChange = (value) => {
        if(!value) {
            let tempCount = 0;
            if (description?.trim()) {
                tempCount += 1;
            }
            setCount(tempCount);
        }
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
                <Checkbox className={css(styles.checkbox)}>{'Without description'}</Checkbox>
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
            <Badge count={count} style={{ background: '#2a90fe' }}>
                <div className={css(styles.flex, styles.m5)}>
                    <div>{title}</div>
                    <CaretDownOutlined className={css(styles.m4)}/>
                </div>
            </Badge>
        </Dropdown>
    );
}
