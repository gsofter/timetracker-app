import * as React from 'react';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useSetting } from '@adminide-stack/react-shared-components';
import { IProject_Output, ITimeRecord } from '@admin-layout/timetracker-core';
import { useFirstWeekDay } from '../timetracker/hooks';
import { useGetDurationTimeRecordsQuery, useGetProjectsQuery } from '../generated-models';
import { Reports } from './ReportComponent';

const Report = () => {
  const [weekStart, setWeekStart] = useState(moment().startOf('week'));

  const { data, loading, refetch, error } = useGetDurationTimeRecordsQuery({
    variables: {
      startTime: weekStart,
      endTime: moment(weekStart).add(1, 'week'),
    },
  });
  const { data: projectsData, loading: loadingProjects } = useGetProjectsQuery();

  const { updateConfiguration } = useSetting({
    configKey: 'timetracker.report.timeRoundingInReports',
  });
  const { value: dowValue } = useFirstWeekDay();

  useEffect(() => {
    setWeekStart(moment().startOf('week'));
  }, []);

  useEffect(() => {
    refetch();
  }, [weekStart]);

  useEffect(() => {
    moment.locale('en', {
      week: { dow: dowValue },
    });
    setWeekStart(moment().startOf('week'));
  }, [dowValue]);

  const getRecords = useCallback((): Array<ITimeRecord> => (loading || !!!data ? [] : data.getDurationTimeRecords), [
    loading,
    data,
  ]);
  const getProjects = useCallback(
    (): Array<IProject_Output> => (loadingProjects || !!!projectsData ? [] : projectsData.getProjects),
    [loadingProjects, projectsData],
  );

  return (
    <Reports
      weekStart={weekStart}
      projects={getProjects()}
      records={getRecords()}
      setWeekStart={setWeekStart}
      updateConfiguration={updateConfiguration}
    />
  );
};
export default Report;
