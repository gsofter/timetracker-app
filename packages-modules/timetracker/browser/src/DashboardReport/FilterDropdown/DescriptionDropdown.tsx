import * as React from 'react';
import { useFela } from 'react-fela';
import { useState } from 'react';
import { Badge, Checkbox, Dropdown, Input, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { styles } from './styles';
import { FilterName, WITHOUT } from '../ReportFilter';

interface IStatusDropdown {
    title: string;
    filteredData: any;
    setFilteredData: Function;
}

export const DescriptionDropdown = (props: IStatusDropdown) => {
    const { title, filteredData, setFilteredData } = props;
    const [visible, setVisible] = useState(false);
    const [count, setCount] = useState(0);
    const [description, setDescription] = useState('');
    const [without, setWithout] = useState(false);
    const { css } = useFela();

    const handleVisibleChange = (value) => {
        if(!value) {
            let tempCount = 0;
            if (description?.trim()) {
                tempCount += 1;
            }
            if (without) {
                tempCount += 1;
            }
            setFilteredData({
                ...filteredData,
                [FilterName.DESCRIPTION]: {
                    input: description,
                    isWithout: without,
                },
            });
            setCount(tempCount);
        }
        setVisible(value);
    };
    const onChangeInput = (e) => {
        setDescription(e.target.value);
    }
    const onChangeWithout = (e) => {
        setWithout(e.target.checked);
    }

    const content = (
        <Menu>
            <Menu.Item disabled={true}>
                <Input onChange={onChangeInput} placeholder={'Enter description...'}/>
            </Menu.Item>
            <Menu.Divider className={css(styles.divider)}/>
            <Menu.Item key={WITHOUT} className={css(styles.item)}>
                <Checkbox className={css(styles.checkbox)} checked={without} onChange={onChangeWithout}>{'Without description'}</Checkbox>
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
                    <div className={css(styles.capitalize)}>{title}</div>
                    <CaretDownOutlined className={css(styles.m4)}/>
                </div>
            </Badge>
        </Dropdown>
    );
}
