import * as React from 'react';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSetting, useGetOrganizationMembersQuery, useGetUserAccountQuery } from '@adminide-stack/react-shared-components';
import { IProject_Output, ITimeRecord } from '@admin-layout/timetracker-core';
import { useFirstWeekDay } from '../timetracker/hooks';
import { useGetDurationTimeRecordsQuery, useGetProjectsQuery } from '../generated-models';
import { Reports } from './ReportComponent';

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
  const [range, setRange] = useState({ start: moment().startOf('week'), end: moment().endOf('week') });
  const { data: { getOrganizationMembers: orgMembers } = {} } = useGetOrganizationMembersQuery();
  const { data, loading, refetch, error } = useGetDurationTimeRecordsQuery({
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
        <Reports
            range={range}
            projects={getProjects()}
            records={getRecords()}
            setRange={setRange}
            updateConfiguration={updateConfiguration}
            recordsByUserId={recordsByUserId}
        />
      </>
  ), [range, data?.getDurationTimeRecords, projectsData?.getProjects, recordsByUserId]);
};
export default Report;
