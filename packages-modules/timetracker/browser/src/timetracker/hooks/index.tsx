import React, { useEffect, useState } from 'react';
import { useSetting, usePermissionAutoFetch } from '@adminide-stack/react-shared-components';
import { useLocation } from 'react-router';
import { TimeRoundedType, TimeRoundingUpToValue } from '../constants';
import { IPermissionType } from '@adminide-stack/core'
import { IPreDefineAccountPermissions } from '../constants'
import * as _ from 'lodash';

const getQuoteWrappedString = (str: string) => {
  const startId = str.indexOf('"');
  const lastId = str.lastIndexOf('"');
  if (startId === -1 || lastId === -1) return null;
  return str.slice(startId + 1, lastId);
};

export const useTimeformat = () => {
  //   const [timeFormat, setTimeformat] = useState('HH:mm:ss');
  //   const [dateFormat, setDateformat] = useState('YYYY-MM-DD');
  const { data: timeFormatData, loading: loadingTimeFormat } = useSetting({
    configKey: 'timetracker.project.timeFormat',
  });
  const { data: dateFormatData, loading: loadingDateFormat } = useSetting({
    configKey: 'timetracker.project.dateFormat',
  });

  return {
    timeFormat:
      !timeFormatData || loadingDateFormat ? 'HH:mm:ss' : timeFormatData?.resolveConfiguration,
    dateFormat:
      !dateFormatData || loadingDateFormat ? 'YYYY-MM-DD' : dateFormatData?.resolveConfiguration,
  };
};

export function useLocationQuery() {
  return new URLSearchParams(useLocation().search);
}

export const useFirstWeekDay = () => {
  const { data, loading } = useSetting({
    configKey: 'timetracker.project.firstDayOfTheWeek',
  });

  let value = 0;
  if (data && data?.resolveConfiguration === 'Monday') value = 1;
  else if (data && data?.resolveConfiguration === 'Tuesday') value = 2;
  else if (data && data?.resolveConfiguration === 'Wednesday') value = 3;
  else if (data && data?.resolveConfiguration === 'Thursday') value = 4;
  else if (data && data?.resolveConfiguration === 'Friday') value = 5;
  else if (data && data?.resolveConfiguration === 'Saturday') value = 6;

  return {
    day: data?.resolveConfiguration || 'Sunday',
    value,
  };
};

export const useRound = () => {
  const { data: data, loading: loadingRoundData } = useSetting({
    configKey: 'timetracker.project.roundedToNearest',
  });
  const { data: typeData, loading: loadingRoundType } = useSetting({
    configKey: 'timetracker.project.roundedType',
  });

  const { data: roundedData, loading: loadingRounded, refetch: refetchRounded } = useSetting({
    configKey: 'timetracker.report.timeRoundingInReports',
  });

  const [roundType, setRoundType] = useState('ceil');
  const [roundValue, setRoundValue] = useState(TimeRoundingUpToValue.IN_MINUTES_1);
  const [rounded, setRounded] = useState(false);

  useEffect(() => {
    if (data && data?.resolveConfiguration) setRoundValue(data?.resolveConfiguration);
    if (typeData && typeData?.resolveConfiguration) {
      if (typeData?.resolveConfiguration === TimeRoundedType.ROUND_UP_TO) setRoundType('ceil');
      else if (typeData?.resolveConfiguration === TimeRoundedType.ROUND_TO_NEAREST)
        setRoundType('round');
      else if (typeData?.resolveConfiguration === TimeRoundedType.ROUND_DOWN_TO)
        setRoundType('floor');
    }
    setRounded(
      roundedData && roundedData?.resolveConfiguration !== undefined
        ? roundedData?.resolveConfiguration
        : false,
    );
  }, [loadingRoundData, loadingRoundType, loadingRounded]);

  useEffect(() => {
    setRounded(
      roundedData && roundedData?.resolveConfiguration !== undefined
        ? roundedData?.resolveConfiguration
        : false,
    );
  }, [loadingRounded, roundedData]);

  return {
    roundType,
    roundValue,
    rounded,
    refetchRounded,
  };
};

export const useViewPermissions = () => {
  const { data: selfData, loading: loadingSelf } = usePermissionAutoFetch({
    configKey: IPreDefineAccountPermissions.viewSelfTimeTracker,
  });

  const { data: othersData, loading: loadingOthers } = usePermissionAutoFetch({
    configKey: IPreDefineAccountPermissions.viewOthersTimeTracker,
  });

  const [selfPer, setSelfPer] = useState('');
  const [othersPer, setOthersPer] = useState('');

  useEffect(() => {
    setSelfPer(_.get(selfPer, 'resolveConfiguration', IPermissionType.NotSet));
  }, [selfPer, loadingSelf]);

  useEffect(() => {
    setOthersPer(_.get(othersPer, 'resolveConfiguration', IPermissionType.NotSet));
  }, [othersPer, loadingOthers]);

  return {
    self: selfPer,
    others: othersPer,
  }
}

export const useCreatePermissions = () => {
  const { data: selfData, loading: loadingSelf } = usePermissionAutoFetch({
    configKey: IPreDefineAccountPermissions.createSelfTimeTracker,
  });

  const { data: othersData, loading: loadingOthers } = usePermissionAutoFetch({
    configKey: IPreDefineAccountPermissions.createOthersTimeTracker,
  });

  const [selfPer, setSelfPer] = useState('');
  const [othersPer, setOthersPer] = useState('');

  useEffect(() => {
    setSelfPer(_.get(selfPer, 'resolveConfiguration', IPermissionType.NotSet));
  }, [selfPer, loadingSelf]);

  useEffect(() => {
    setOthersPer(_.get(othersPer, 'resolveConfiguration', IPermissionType.NotSet));
  }, [othersPer, loadingOthers]);

  return {
    self: selfPer,
    others: othersPer,
  }
}

export const useEditPermissions = () => {
  const { data: selfData, loading: loadingSelf } = usePermissionAutoFetch({
    configKey: IPreDefineAccountPermissions.editSelfTimeTracker,
  });

  const { data: othersData, loading: loadingOthers } = usePermissionAutoFetch({
    configKey: IPreDefineAccountPermissions.editOthersTimeTracker,
  });

  const [selfPer, setSelfPer] = useState('');
  const [othersPer, setOthersPer] = useState('');

  useEffect(() => {
    setSelfPer(_.get(selfPer, 'resolveConfiguration', IPermissionType.NotSet));
  }, [selfPer, loadingSelf]);

  useEffect(() => {
    setOthersPer(_.get(othersPer, 'resolveConfiguration', IPermissionType.NotSet));
  }, [othersPer, loadingOthers]);

  return {
    self: selfPer,
    others: othersPer,
  }
}

export const useManagePermissions = () => {
  const { data: selfData, loading: loadingSelf } = usePermissionAutoFetch({
    configKey: IPreDefineAccountPermissions.manageSelfTimeTracker,
  });

  const { data: othersData, loading: loadingOthers } = usePermissionAutoFetch({
    configKey: IPreDefineAccountPermissions.manageOthersTimeTracker,
  });

  const [selfPer, setSelfPer] = useState('');
  const [othersPer, setOthersPer] = useState('');

  useEffect(() => {
    setSelfPer(_.get(selfPer, 'resolveConfiguration', IPermissionType.NotSet));
  }, [selfPer, loadingSelf]);

  useEffect(() => {
    setOthersPer(_.get(othersPer, 'resolveConfiguration', IPermissionType.NotSet));
  }, [othersPer, loadingOthers]);

  return {
    self: selfPer,
    others: othersPer,
  }
}

export const useDeletePermissions = () => {
  const { data: selfData, loading: loadingSelf } = usePermissionAutoFetch({
    configKey: IPreDefineAccountPermissions.deleteSelfTimeTracker,
  });

  const { data: othersData, loading: loadingOthers } = usePermissionAutoFetch({
    configKey: IPreDefineAccountPermissions.deleteOthersTimeTracker,
  });

  const [selfPer, setSelfPer] = useState('');
  const [othersPer, setOthersPer] = useState('');

  useEffect(() => {
    setSelfPer(_.get(selfPer, 'resolveConfiguration', IPermissionType.NotSet));
  }, [selfPer, loadingSelf]);

  useEffect(() => {
    setOthersPer(_.get(othersPer, 'resolveConfiguration', IPermissionType.NotSet));
  }, [othersPer, loadingOthers]);

  return {
    self: selfPer,
    others: othersPer,
  }
}


export const usePermissions = () => {
  const { data: viewPermission, loading: loadingView } = usePermissionAutoFetch({
    configKey: IPreDefineAccountPermissions.editSelfTimeTracker,
  });

  const { data: managePermission, loading: loadingManage } = usePermissionAutoFetch({
    configKey: 'organization.timetracker.manage',
  });

  const [viewPer, setViewPer] = useState('');
  const [managePer, setManagePer] = useState('');

  useEffect(() => {
    setViewPer(_.get(viewPermission, 'resolveConfiguration', IPermissionType.NotSet));
  }, [viewPermission, loadingView]);

  useEffect(() => {
    setManagePer(_.get(managePermission, 'resolveConfiguration', IPermissionType.NotSet));
  }, [managePermission, loadingManage]);

  return {
    viewPermission: viewPer,
    managePermission: managePer,
  }
};
