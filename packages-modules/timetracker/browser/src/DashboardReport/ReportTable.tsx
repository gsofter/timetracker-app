import * as React from 'react';
import { useFela } from 'react-fela';
import { Card, Table, Select } from 'antd';
import { GroupBy } from './ReportComponent';

const { Option } = Select;

interface IReportTable {
    groupBy: string;
    setGroupBy: Function;
    generateDatasource: Function;
    generateTableColumns: Function;
}

export const ReportTable = (props: IReportTable) => {
    const { setGroupBy, generateDatasource, generateTableColumns } = props;
    const { css } = useFela();

    const onchangeGroupBy = (value) => {
        setGroupBy(value);
    };

    const tableHeader = (
        <div style={{ display: 'flex' }}>
            <div className={css(styles.label)}>Group by:</div>
            <Select className={css(styles.capitalize)} defaultValue={GroupBy.PROJECT} onChange={onchangeGroupBy}>
                <Option className={css(styles.capitalize)} value={GroupBy.PROJECT}>{GroupBy.PROJECT}</Option>
                <Option className={css(styles.capitalize)} value={GroupBy.USER}>{GroupBy.USER}</Option>
                <Option className={css(styles.capitalize)} value={GroupBy.DESCRIPTION}>{GroupBy.DESCRIPTION}</Option>
                <Option className={css(styles.capitalize)} value={GroupBy.TAG}>{GroupBy.TAG}</Option>
            </Select>
        </div>
    );

    return (
        <Card className={css(styles.tableCard)} title={''} extra={tableHeader}>
            <Table
                rowKey="id"
                dataSource={generateDatasource()}
                columns={generateTableColumns()}
                pagination={{ defaultPageSize: 3 }}
            />
        </Card>
    );
}

const styles = {
    tableCard: () => ({
        '@media (min-width: 800px)': {
            width: '50%',
            marginRight: '25px',
        },
        '& .ant-card-extra': {
            padding: '12px 0',
        },
        marginTop: '25px',
    }),
    label: () => ({
        margin: 'auto',
        marginRight: '5px',
        color: '#696868',
    }),
    capitalize: () => ({
       textTransform: 'capitalize',
    }),
};
