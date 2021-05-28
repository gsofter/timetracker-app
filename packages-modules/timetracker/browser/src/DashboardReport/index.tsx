import * as React from 'react';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFela } from 'react-fela';
import { Card, Dropdown, Menu, Button, Divider, Checkbox } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { useSetting, useGetOrganizationMembersQuery, useGetUserAccountQuery } from '@adminide-stack/react-shared-components';
import { IProject_Output, ITimeRecord } from '@admin-layout/timetracker-core';
import { useFirstWeekDay } from '../timetracker/hooks';
import { useGetDurationTimeRecordsQuery, useGetProjectsQuery } from '../generated-models';
import { Reports } from './ReportComponent';

const FilterValues = [
  { value: 'Team', selected: true },
  { value: 'Client', selected: true },
  { value: 'Project', selected: true },
  { value: 'Task', selected: true },
  { value: 'Tag', selected: true },
  { value: 'Status', selected: true },
  { value: 'Description', selected: true },
];

const GetDurationTimeRecordsByUserIdQuery = ({ range, userId, recordsByUserId, setRecordsByUserId }) => {
  const [records, setRecords]: any = useState({});
  const { data, loading, refetch } = useGetDurationTimeRecordsQuery({
    variables: {
      startTime: range.start,
      endTime: range.end,
      userId: userId,
    },
  });
  const { data: { getUserAccount } = {} } = useGetUserAccountQuery({
    variables: { userId },
    skip: !userId,
  });

  const { data: billRateConfig } = useSetting({
    configKey: 'timetracker.user.payment.billRate',
    overrides: { overrideIdentifier: getUserAccount?.username },
  });

  const { data: payRateConfig } = useSetting({
    configKey: 'timetracker.user.payment.payRate',
    overrides: { overrideIdentifier: getUserAccount?.username },
  });
  const billRate = billRateConfig?.resolveConfiguration;
  const payRate = payRateConfig?.resolveConfiguration;

  useEffect(() => {
    refetch();
  }, [range, userId]);

  useEffect(() => {
    if (data && !loading) {
      setRecords({ data: data.getDurationTimeRecords });
    }
  }, [data, userId, range, loading]);

  useEffect(() => {
    if (records?.data) {
      setRecords({ ...records, payRate, billRate });
      setRecordsByUserId({ ...recordsByUserId, [userId]: { ...records, payRate, billRate } })
    }
  }, [payRate, billRate, records?.data]);

  return null;
}

const Report = () => {
  const [recordsByUserId, setRecordsByUserId] = useState({});
  const [visible, setVisible] = useState(false);
  const [filterValues, setFilterValues] = useState(FilterValues);
  const [filterValuesItem, setFilterValuesItem] = useState(FilterValues);
  const [range, setRange] = useState({ start: moment().startOf('week'), end: moment().endOf('week') });
  const { data: { getOrganizationMembers: orgMembers } = {} } = useGetOrganizationMembersQuery();
  const { data, loading, refetch } = useGetDurationTimeRecordsQuery({
    variables: {
      startTime: range.start,
      endTime: range.end,
    },
  });
  const { data: projectsData, loading: loadingProjects } = useGetProjectsQuery();

  const { updateConfiguration } = useSetting({
    configKey: 'timetracker.report.timeRoundingInReports',
  });
  const { value: dowValue } = useFirstWeekDay();
  const { css } = useFela();

  useEffect(() => {
    setRange({
      start: moment().startOf('week'),
      end: moment().endOf('week'),
    });
  }, []);

  useEffect(() => {
    refetch();
  }, [range]);

  useEffect(() => {
    moment.locale('en', {
      week: { dow: dowValue },
    });
    setRange({
      start: moment().startOf('week'),
      end: moment().endOf('week'),
    });
  }, [dowValue]);

  const getRecords = useCallback(
    (): Array<ITimeRecord> => (loading || !!!data ? [] : data.getDurationTimeRecords),
    [loading, data],
  );
  const getProjects = useCallback(
    (): Array<IProject_Output> => (loadingProjects || !!!projectsData ? [] : projectsData.getProjects),
    [loadingProjects, projectsData],
  );

  const onClickItem = ({ key }) => {
    const index = parseInt(key, 10);
    const updatedValue: any = { ...filterValuesItem[index], selected: !filterValuesItem[index].selected };
    let valuesArray = filterValuesItem.slice(0);
    valuesArray.splice(index, 1, updatedValue);
    setFilterValuesItem(valuesArray);
  }

  const handleVisibleChange = (value) => {
    setVisible(value);
    if (!value) {
      setFilterValues(filterValuesItem);
    }
  }

  const menu = (
      <Menu className={css(styles.dropdown)} onClick={onClickItem}>
        {
          filterValuesItem.map((data, i) => (
              <Menu.Item key={i}>
                <Checkbox className={css(styles.checkbox)} checked={data.selected}>{data.value}</Checkbox>
              </Menu.Item>
          ))
        }
      </Menu>
  )
  return useMemo(() => (
      <>
        {
          orgMembers?.map((member, index) => {
            return (
                <GetDurationTimeRecordsByUserIdQuery
                    key={index}
                    range={range}
                    userId={member.userId}
                    recordsByUserId={recordsByUserId}
                    setRecordsByUserId={setRecordsByUserId}
                />
            )
          })
        }
        <Card className={css(styles.card)} bordered={false}>
          <div className={css(styles.flex)}>
            <Dropdown overlay={menu} trigger={['click']} visible={visible} onVisibleChange={handleVisibleChange}>
              <div className={css(styles.m10, styles.flex)}>
                <div>Filter</div>
                <CaretDownOutlined className={css(styles.m4)}/>
              </div>
            </Dropdown>
            {filterValues.map((data, index) => {
              return (
                data.selected ? (
                  <div className={css(styles.flex)} key={index}>
                    <Divider className={css(styles.divider)} type={'vertical'}/>
                    <div className={css(styles.m10, styles.flex)}>
                      <div>{data.value}</div>
                      <CaretDownOutlined className={css(styles.m4)}/>
                    </div>
                  </div>
                ) : null
              )
            })}
            <Button className={css(styles.button)} size={'large'} type={'primary'}>APPLY FILTER</Button>
          </div>
        </Card>
        <Reports
            range={range}
            projects={getProjects()}
            records={getRecords()}
            setRange={setRange}
            updateConfiguration={updateConfiguration}
            recordsByUserId={recordsByUserId}
        />
      </>
  ), [range, data?.getDurationTimeRecords, projectsData?.getProjects, recordsByUserId, visible, filterValues, filterValuesItem]);
};

const styles = {
  card: () => ({
    marginBottom: '25px',
    '& .ant-card-body': {
      padding: '10px',
    },
  }),
  flex: () => ({
    display: 'flex',
  }),
  divider: () => ({
    height: '45px',
  }),
  m10: () => ({
    margin: '10px',
  }),
  m4: () => ({
    margin: '4px',
  }),
  button: () => ({
    marginRight: 0,
    marginLeft: 'auto',
    marginBottom: 'auto',
    marginTop: 'auto',
  }),
  dropdown: () => ({
    padding: '15px 0',
  }),
  checkbox: () => ({
    padding: '3px 10px',
    width: '100%',
  })
}
export default Report;
