import React, { useCallback, useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import { useGetDurationTimeRecordsQuery, useGetProjectsQuery } from '../../../generated-models';
import { ITimeRecord, IProject_Output } from '@admin-layout/timetracker-core';
import { useFirstWeekDay } from '../../hooks';
import { useSetting } from '@adminide-stack/react-shared-components';
import * as _ from 'lodash';
import Reports from './Reports';

const ReportsPage = () => {
  const [range, setRange] = useState({ start: moment().startOf('week'), end: moment().endOf('week') });
  const { data, loading, refetch, error } = useGetDurationTimeRecordsQuery({
    variables: {
      startTime: range.start,
      endTime: range.end,
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
    setRange({
      start: moment().startOf('week'),
      end: moment().endOf('week'),
    });
  }, [dowValue]);

  const { updateConfiguration } = useSetting({
    configKey: 'timetracker.report.timeRoundingInReports',
  });

  const getRecords = useCallback(
    (): Array<ITimeRecord> => (loading || !!!data ? [] : data.getDurationTimeRecords),
    [loading, data],
  );

  const getProjects = useCallback(
    (): Array<IProject_Output> => (loadingProjects || !!!projectsData ? [] : projectsData.getProjects),
    [loadingProjects, projectsData],
  );

  useEffect(() => {
    setRange({
      start: moment().startOf('week'),
      end: moment().endOf('week'),
    });
  }, []);

  useEffect(() => {
    refetch();
  }, [range]);

  return (
    <> Reports </>
    // <Reports
    //   range={range}
    //   projects={getProjects()}
    //   records={getRecords()}
    //   setRange={setRange}
    //   updateConfiguration={updateConfiguration}
    // />
  );
};

export default ReportsPage;
