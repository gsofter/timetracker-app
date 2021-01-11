const DemoData = {
  // timeEntriesList: [
  //   {
  //     end_datetime: '2020-12-08T12:02:12+00:00',
  //     id: '4f154429-5366-400c-ae88-aa41c3d78537',
  //     issue: 'Test project',
  //     start_datetime: '2020-12-08T12:02:02+00:00',
  //     sync_jira_status: false,
  //     project: {
  //       id: 'e3180114-d88f-40fc-a4fb-3c6a8e4a0dc8',
  //       name: 'any',
  //       project_color: {
  //         name: 'green',
  //       },
  //     },
  //     client: {
  //       name: 'test client',
  //     },
  //     totalTime: '10',
  //   },
  //   {
  //     end_datetime: '2020-12-08T12:02:12+00:00',
  //     id: '4f154429-5366-400c-ae88-aa41c3d78538',
  //     issue: 'project2',
  //     start_datetime: '2020-12-08T12:02:02+00:00',
  //     sync_jira_status: false,
  //     project: {
  //       id: 'e3180114-d88f-40fc-a4fb-3c6a8e4a0dc9',
  //       name: 'test1',
  //       project_color: {
  //         name: 'blue',
  //       },
  //     },
  //     client: {
  //       name: 'test client',
  //     },
  //     totalTime: '10',
  //   },
  // ],
  selectColors: [
    {
      id: 'a642f337-9082-4f64-8ace-1d0e99fa7258',
      name: 'green',
    },
    {
      id: 'a642f337-9082-4f64-8ace-1d0e99fa7259',
      name: 'red',
    },
    {
      id: 'a642f337-9082-4f64-8ace-1d0e99fa7210',
      name: 'pink',
    },
    {
      id: 'a642f337-9082-4f64-8ace-1d0e99fa7211',
      name: 'green',
    },
    {
      id: 'a642f337-9082-4f64-8ace-1d0e99fa7212',
      name: 'blue',
    },
  ],
  timer_v2: [
    {
      id: 'f2a34a50-ba78-4e51-a6f0-1e1aeb4972e4',
      start_datetime: '2020-12-25T12:28:36+00:00',
      end_datetime: '2020-12-25T12:28:41+00:00',
      issue: 'fixed issue',
      sync_jira_status: false,
      project: {
        name: 'test',
        id: '2a497a9c-3523-4c48-8157-133451821cc8',
        project_color: { name: 'blue' },
      },
    },
    {
      id: '28ccded6-5354-4516-946d-a8c162fd9759',
      start_datetime: '2020-12-25T12:28:19+00:00',
      end_datetime: '2020-12-25T12:28:25+00:00',
      issue: 'fixed issue',
      sync_jira_status: false,
      project: {
        name: 'test',
        id: '2a497a9c-3523-4c48-8157-133451821cc8',
        project_color: { name: 'blue' },
      },
    },
    {
      id: '7a9c96f2-9ee6-4145-a389-0e1bda7ddf29',
      start_datetime: '2020-12-24T07:17:28+00:00',
      end_datetime: '2020-12-24T07:17:35+00:00',
      issue: 'test10',
      sync_jira_status: false,
      project: {
        name: 'test',
        id: '2a497a9c-3523-4c48-8157-133451821cc8',
        project_color: { name: 'blue' },
      },
    },
    {
      id: '8d155b7c-dd14-4ae0-8eff-ed156c815574',
      start_datetime: '2020-12-23T11:09:51+00:00',
      end_datetime: '2020-12-23T11:10:06+00:00',
      issue: 'testing',
      sync_jira_status: false,
      project: {
        name: 'test1 today',
        id: '03637823-d301-4ad5-a336-ea6af4b1d726',
        project_color: { name: 'green' },
      },
    },
    {
      id: 'b54bfa4c-19d1-493e-843e-01016a592b38',
      start_datetime: '2020-12-23T11:09:47+00:00',
      end_datetime: '2020-12-23T11:09:51+00:00',
      issue: 'testing',
      sync_jira_status: false,
      project: {
        name: 'test1 today',
        id: '03637823-d301-4ad5-a336-ea6af4b1d726',
        project_color: { name: 'green' },
      },
    },
    {
      id: 'ccf5cb13-cae0-4a08-b099-27985e9b922e',
      start_datetime: '2020-12-23T11:09:25+00:00',
      end_datetime: '2020-12-23T11:09:39+00:00',
      issue: 'testing',
      sync_jira_status: false,
      project: {
        name: 'test1 today',
        id: '03637823-d301-4ad5-a336-ea6af4b1d726',
        project_color: { name: 'green' },
      },
    },
    {
      id: '1754d731-cefc-4483-82a2-5997effcd296',
      start_datetime: '2020-12-13T16:06:39+00:00',
      end_datetime: '2020-12-13T16:07:48+00:00',
      issue: 'repo task',
      sync_jira_status: false,
      project: {
        name: 'test',
        id: '2a497a9c-3523-4c48-8157-133451821cc8',
        project_color: { name: 'blue' },
      },
    },
    {
      id: '50c35ce1-8379-48b9-99ec-d6659f302d3d',
      start_datetime: '2020-12-13T16:03:43+00:00',
      end_datetime: '2020-12-13T16:03:51+00:00',
      issue: 'timeee pro',
      sync_jira_status: false,
      project: {
        name: 'any',
        id: 'e3180114-d88f-40fc-a4fb-3c6a8e4a0dc8',
        project_color: { name: 'green' },
      },
    },
    {
      id: '36050f7b-4f71-42e0-aa01-84d3ac16f0de',
      start_datetime: '2020-12-10T11:51:42+00:00',
      end_datetime: '2020-12-10T11:51:49+00:00',
      issue: 'timeee pro',
      sync_jira_status: false,
      project: {
        name: 'any',
        id: 'e3180114-d88f-40fc-a4fb-3c6a8e4a0dc8',
        project_color: { name: 'green' },
      },
    },
    {
      id: '8bf3725b-e6a8-4231-b10d-6eeb75695d63',
      start_datetime: '2020-12-10T06:25:20+00:00',
      end_datetime: '2020-12-10T06:34:53+00:00',
      issue: 'timeee pro',
      sync_jira_status: false,
      project: {
        name: 'any',
        id: 'e3180114-d88f-40fc-a4fb-3c6a8e4a0dc8',
        project_color: { name: 'green' },
      },
    },
    {
      id: '4f154429-5366-400c-ae88-aa41c3d78537',
      start_datetime: '2020-12-08T12:02:02+00:00',
      end_datetime: '2020-12-08T12:02:12+00:00',
      issue: 'timeee pro',
      sync_jira_status: false,
      project: {
        name: 'any',
        id: 'e3180114-d88f-40fc-a4fb-3c6a8e4a0dc8',
        project_color: { name: 'green' },
      },
    },
    {
      id: 'e0732c73-ef6c-4386-87a6-b98d85b0c170',
      start_datetime: '2020-12-08T11:56:38+00:00',
      end_datetime: '2020-12-08T11:56:41+00:00',
      issue: 'test project',
      sync_jira_status: false,
      project: {
        name: 'any',
        id: 'e3180114-d88f-40fc-a4fb-3c6a8e4a0dc8',
        project_color: { name: 'green' },
      },
    },
  ],
};

export default DemoData;
