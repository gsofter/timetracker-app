import * as React from 'react';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useSetting } from '@adminide-stack/react-shared-components';
import { IProject_Output, ITimeRecord } from '@admin-layout/timetracker-core';
import { useFirstWeekDay } from '../timetracker/hooks';
import { useGetDurationTimeRecordsQuery, useGetProjectsQuery } from '../generated-models';
import { Reports } from './ReportComponent';

const Report = () => {
  const [range, setRange] = useState({ start: moment().startOf('week'), end: moment().endOf('week') });

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

  return (
    <Reports
      range={range}
      projects={getProjects()}
      records={getRecords()}
      setRange={setRange}
      updateConfiguration={updateConfiguration}
    />
  );
};
export default Report;
