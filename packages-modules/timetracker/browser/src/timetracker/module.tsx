import { Feature } from '@common-stack/client-react';
import { filteredRoutes } from './compute';
import { RegisterContribution } from './register-contribution';

export default new Feature({
  routeConfig: filteredRoutes,
  clientStateParams: {
    // resolvers,
    // defaults
  },
  componentFillPlugins: [
    {
      name: 'register-contribution',
      render: RegisterContribution,
    },
  ],
  stylesInsert: [
    'react-big-calendar/lib/addons/dragAndDrop/styles.css',
    'react-big-calendar/lib/css/react-big-calendar.css'
  ]
  
});
