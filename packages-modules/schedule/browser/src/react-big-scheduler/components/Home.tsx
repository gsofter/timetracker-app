import * as React from 'react';
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from '@cdmbase/react-big-scheduler'
import '@cdmbase/react-big-scheduler/lib/css/style.css'
import moment from 'moment'


//2. create the view model, put it in the props obj

let schedulerData = new SchedulerData(moment().format(DATE_FORMAT), ViewTypes.Week)


//set locale moment to the schedulerData, if your locale isn't English. By default, Scheduler comes with English(en, United States).
moment.locale('zh-cn');

//set resources here or later
let resources = [
    {
       id: 'r0',
       name: 'Resource0',
       groupOnly: true
    },
    {
       id: 'r1',
       name: 'Resource1'
    },
    {
       id: 'r2',
       name: 'Resource2',
       parentId: 'r0'
    },
    {
       id: 'r3',
       name: 'Resource3',
       parentId: 'r4'
    },
    {
       id: 'r4',
       name: 'Resource4',
       parentId: 'r2'
    },
];

//set events here or later,
//the event array should be sorted in ascending order by event.start property, otherwise there will be some rendering errors
let events = [
    {
         id: 1,
         start: '2017-12-18 09:30:00',
         end: '2017-12-19 23:30:00',
         resourceId: 'r1',
         title: 'I am finished',
         bgColor: '#D9D9D9'
     },
     {
         id: 2,
         start: '2017-12-18 12:30:00',
         end: '2017-12-26 23:30:00',
         resourceId: 'r2',
         title: 'I am not resizable',
         resizable: false
     },
     {
         id: 3,
         start: '2017-12-19 12:30:00',
         end: '2017-12-20 23:30:00',
         resourceId: 'r3',
         title: 'I am not movable',
         movable: false
     },
     {
         id: 4,
         start: '2017-12-19 14:30:00',
         end: '2017-12-20 23:30:00',
         resourceId: 'r1',
         title: 'I am not start-resizable',
         startResizable: false
     },
     {
         id: 5,
         start: '2017-12-19 15:30:00',
         end: '2017-12-20 23:30:00',
         resourceId: 'r2',
         title: 'R2 has recurring tasks every week on Tuesday, Friday',
         rrule: 'FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR',
         bgColor: '#f759ab'
     }
 ];

export type ScheduleProps = {
  }

export const Home = (props) => {

    // const [mySchedulerData, setMySchedulerData] = React.useState(schedulerData)
    // React.useEffect(() => {
    schedulerData.setLocaleMoment(moment);
    schedulerData.setResources(resources);
    schedulerData.setEvents(events);
    // }, [mySchedulerData, setMySchedulerData])
    const prevClick = (schedulerData) => {
        console.log(schedulerData)   
    }
    const nextClick = (schedulerData) => {
        console.log(schedulerData)
    }
    const onSelectDate = (schedulerData, date) => {
        console.log(schedulerData, date)
    }
    const onViewChange = (schedulerData, date) => {
        console.log(schedulerData, date)
    }
    const eventClicked = () => {
        console.log("event clicked")
    }

    console.log({schedulerData})
    return (
        <div>
            hello
  {schedulerData.setEvents &&       <Scheduler schedulerData={schedulerData} 
            prevClick={prevClick}
            nextClick={nextClick}
            onSelectDate={onSelectDate}
            onViewChange={onViewChange}
            eventItemClick={eventClicked}
/>}
    </div>
)
};
