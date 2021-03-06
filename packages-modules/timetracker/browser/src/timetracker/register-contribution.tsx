import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { EditTwoTone } from '@ant-design/icons';
import { generateContributionId, CONTRIBUTION_ACTION_TYPES } from '@adminide-stack/extension-api';
import { Payments } from './components/Payments';
import { Limits } from './components/Limits';
import HeaderTimerHandler from './components/HeaderTimerHandler';

const EditableComponent = (props) => {
  return (
    <div>
      <div style={{ float: 'left' }}>-</div>
      <EditTwoTone style={{ float: 'right', margin: '5px' }}/>
    </div>
  );
};

export const RegisterContribution = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const id = generateContributionId();
    const teamsContribution = {
      [id]: {
        tables: {
          'member/table': [
            {
              id: 'payment',
              title: 'Payment',
              accessor: 'actions',
              width: 150,
              position: 3,
              cell: Payments,
            },
            {
              id: 'limits',
              title: 'Limits',
              accessor: 'actions',
              width: 100,
              position: 3,
              cell: Limits,
            },
            {
              id: 'timeTracking',
              title: 'Time Tracking',
              accessor: 'timeTracking',
              width: 100,
              position: 3,
              cell: EditableComponent,
            },
          ],
        },
        pageNavBar: [
          { name: 'header-timer', position: 'right', priority: 1, component: () => <HeaderTimerHandler/> },
        ],
      },
    };
    // register contribution
    dispatch({
      type: CONTRIBUTION_ACTION_TYPES.REGISTER_CONTRIBUTIONS,
      payload: teamsContribution,
    });
  }, []);

  return null;
};
