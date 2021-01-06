import moment from 'moment';

const DemoData = {
  resourceMap: [
    { id: 1, title: 'group 1' },
    { id: 2, title: 'group 2' },
    { id: 3, title: 'group 3' },
    { id: 4, title: 'group 4' },
    { id: 5, title: 'group 5' },
  ],
  items: [
    {
      id: 1,
      group: 1,
      title: 'item 1',
      start_time: new Date('Fri Nov 23 2020 04:00:00'),
      end_time: new Date('Fri Nov 23 2020 07:00:00'),
    },
    {
      id: 2,
      group: '2',
      title: 'item 2',
      start_time: new Date('Fri Nov 24 2020 15:00:00'),
      end_time: new Date('Tue Jan 5 2021 17:00:00'),
    },
    {
      id: 3,
      group: '3',
      title: 'item 3',
      start_time: new Date('Fri Nov 24 2020 02:00:00'),
      end_time: new Date('Fri Nov 24 2020 10:00:00'),
    },
    {
      id: 4,
      group: 5,
      title: 'item 4',
      start_time: new Date('Fri Nov 25 2020 18:00:00'),
      end_time: new Date('Fri Nov 25 2020 22:00:00'),
    },
    {
      id: 5,
      group: 5,
      title: 'item 5',
      start_time: new Date('Fri Nov 25 2020 15:00:00'),
      end_time: new Date('Fri Nov 25 2020 21:00:00'),
    },
  ],
};

export default DemoData;
