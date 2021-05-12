import React, { useCallback, useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import { useGetDurationTimeRecordsQuery, useGetProjectsQuery } from '../../../generated-models';
import { ITimeRecord, IProject_Output } from '@admin-layout/timetracker-core';
import { useFirstWeekDay } from '../../hooks';
import { useSetting } from '@adminide-stack/react-shared-components';
import * as _ from 'lodash';
import Reports from './Reports';

const ReportsPage = () => {
  const [weekStart, setWeekStart] = useState(moment().startOf('week'));
  const { data, loading, refetch, error } = useGetDurationTimeRecordsQuery({
    variables: {
      startTime: weekStart,
      endTime: moment(weekStart).add(1, 'week'),
    },
  });
  const { data: projectsData, loading: loadingProjects } = useGetProjectsQuery();
  const { value: dowValue } = useFirstWeekDay();
  useEffect(() => {
    moment.locale('en', {
      week: {
        dow: dowValue,
      },
    });

    setWeekStart(moment().startOf('week'));
  }, [dowValue]);

  const { updateConfiguration } = useSetting({
    configKey: 'timetracker.report.timeRoundingInReports',
  });

  const getRecords = useCallback((): Array<ITimeRecord> => (loading || !!!data ? [] : data.getDurationTimeRecords), [
    loading,
    data,
  ]);

  const getProjects = useCallback(
    (): Array<IProject_Output> => (loadingProjects || !!!projectsData ? [] : projectsData.getProjects),
    [loadingProjects, projectsData],
  );

  useEffect(() => {
    setWeekStart(moment().startOf('week'));
  }, []);

  useEffect(() => {
    refetch();
  }, [weekStart]);

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

export default ReportsPage;
