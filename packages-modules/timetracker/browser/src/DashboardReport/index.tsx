import * as React from 'react';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetOrganizationMembersQuery, useGetUserAccountQuery } from '@adminide-stack/account-api-client';
import { useSetting } from '@adminide-stack/platform-browser/lib/components'
import { IProject_Output, ITimeRecord } from '@admin-layout/timetracker-core';
import { useFirstWeekDay } from '../timetracker/hooks';
import { useGetDurationTimeRecordsQuery, useGetProjectsQuery } from '../generated-models';
import { Reports } from './ReportComponent';
import { ReportFilter } from './ReportFilter';

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
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
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

  useEffect(() => {
    if (data) {
      setRecords(getRecords());
      setFilteredRecords(getRecords());
    }
  }, [data]);

  useEffect(() => {
    if (projectsData) {
      setProjects(getProjects());
      setFilteredProjects(getProjects());
    }
  }, [projectsData]);


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
        <ReportFilter
            projects={projects}
            setFilteredProjects={setFilteredProjects}
            records={records}
            setFilteredRecords={setFilteredRecords}
        />
        <Reports
            range={range}
            users={orgMembers}
            projects={filteredProjects}
            records={filteredRecords}
            setRange={setRange}
            updateConfiguration={updateConfiguration}
            recordsByUserId={recordsByUserId}
        />
      </>
  ), [range, projects, filteredProjects, records, filteredRecords, recordsByUserId, orgMembers]);
};

export default Report;
