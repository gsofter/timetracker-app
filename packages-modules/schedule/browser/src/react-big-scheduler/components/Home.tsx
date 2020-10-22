import * as React from "react";
import Scheduler, {
  SchedulerData,
  ViewTypes,
  DATE_FORMAT,
} from "@cdmbase/react-big-scheduler";
// import "@cdmbase/react-big-scheduler/lib/css/style.css";
import moment from "moment";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const Home = ({ props }) => {
  let schedulerData = new SchedulerData(
    moment().format(DATE_FORMAT),
    ViewTypes.Week
  );
  console.log({ schedulerData }, "schedular data");

  moment.locale("en");

  let resources = [
    {
      id: "r0",
      name: "Resource0",
      groupOnly: true,
    },
    {
      id: "r1",
      name: "Resource1",
    },
    {
      id: "r2",
      name: "Resource2",
      parentId: "r0",
    },
    {
      id: "r3",
      name: "Resource3",
      parentId: "r4",
    },
    {
      id: "r4",
      name: "Resource4",
      parentId: "r2",
    },
    {
      id: "r5",
      name: "Resource5",
      parentId: "r2",
    },
  ];

  //set events here or later,
  //the event array should be sorted in ascending order by event.start property, otherwise there will be some rendering errors
  let events = [
    {
      id: 1,
      start: "2017-12-18 09:30:00",
      end: "2017-12-19 23:30:00",
      resourceId: "r1",
      title: "I am finished",
      bgColor: "#D9D9D9",
    },
    {
      id: 2,
      start: "2017-12-18 12:30:00",
      end: "2017-12-26 23:30:00",
      resourceId: "r2",
      title: "I am not resizable",
      resizable: false,
    },
    {
      id: 3,
      start: "2017-12-19 12:30:00",
      end: "2017-12-20 23:30:00",
      resourceId: "r3",
      title: "I am not movable",
      movable: false,
    },
    {
      id: 4,
      start: "2017-12-19 14:30:00",
      end: "2017-12-20 23:30:00",
      resourceId: "r1",
      title: "I am not start-resizable",
      startResizable: false,
    },
    {
      id: 5,
      start: "2017-12-19 15:30:00",
      end: "2017-12-20 23:30:00",
      resourceId: "r2",
      title: "R2 has recurring tasks every week on Tuesday, Friday",
      rrule: "FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR",
      bgColor: "#f759ab",
    },
  ];

  const [viewModel, setViewModel] = React.useState(schedulerData);
  React.useEffect(() => {
    viewModel.setLocaleMoment(moment);
    viewModel.setResources(resources);
    viewModel.setEvents(events);
  }, []);

  const prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(events);

    setViewModel(
        schedulerData
      )
    console.log(schedulerData, "prev click");
  };
  const nextClick = (schedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(events);
    setViewModel(
        schedulerData
      )
    console.log(schedulerData, "next click");
  };
  const onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(events);
    setViewModel(
        schedulerData
      )
    console.log(schedulerData, date);
  };
  const onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    );
    schedulerData.setEvents(events);
    setViewModel(
        schedulerData
      )
    console.log(schedulerData, view);
  };
  const eventClicked = (schedulerData, event) => {
    alert(
      `You just clicked an event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  const ops1 = (schedulerData, event) => {
    alert(
      `You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  // alert(
  //   `You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`
  // );
  const ops2 = (schedulerData, event) => {};

  const updateEventStart = (schedulerData, event, newStart) => {
    if (
      confirm(
        `Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`
      )
    ) {
      schedulerData.updateEventStart(event, newStart);
    }
    setViewModel(
      schedulerData
    )
  };

  const newEvent = (
    schedulerData,
    slotId,
    slotName,
    start,
    end,
    type,
    item
  ) => {
    if (
      confirm(
        `Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`
      )
    ) {
      let newFreshId = 0;
      schedulerData.events.forEach((item) => {
        if (item.id >= newFreshId) newFreshId = item.id + 1;
      });

      let newEvent = {
        id: newFreshId,
        title: "New event you just created",
        start: start,
        end: end,
        resourceId: slotId,
        bgColor: "purple",
      };
      schedulerData.addEvent(newEvent);
      
      setViewModel(
        schedulerData
      )
    }
  };

  const updateEventEnd = (schedulerData, event, newEnd) => {
    if (
      confirm(
        `Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`
      )
    ) {
      schedulerData.updateEventEnd(event, newEnd);
    }
    setViewModel(
        schedulerData
      )
  };

  const moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    if (
      confirm(
        `Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`
      )
    ) {
      schedulerData.moveEvent(event, slotId, slotName, start, end);
      setViewModel(
        schedulerData
      )
    }
  };

  const onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.next();
      schedulerData.setEvents(schedulerData.events);
      setViewModel(
        schedulerData
      )

      schedulerContent.scrollLeft = maxScrollLeft - 10;
    }
  };

  const onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.prev();
      schedulerData.setEvents(schedulerData.events);
      setViewModel(
        schedulerData
      )

      schedulerContent.scrollLeft = 10;
    }
  };

  const onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log("onScrollTop");
  };

  const onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log("onScrollBottom");
  };

  const toggleExpandFunc = (schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId);
    setViewModel(
        schedulerData
      );
  };
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        {schedulerData.setEvents && (
          <Scheduler
            schedulerData={viewModel}
            prevClick={prevClick}
            nextClick={nextClick}
            onSelectDate={onSelectDate}
            onViewChange={onViewChange}
            eventItemClick={eventClicked}
            viewEventClick={ops1}
            viewEventText="Ops 1"
            viewEvent2Text="Ops 2"
            viewEvent2Click={ops2}
            updateEventStart={updateEventStart}
            updateEventEnd={updateEventEnd}
            moveEvent={moveEvent}
            newEvent={newEvent}
            onScrollLeft={onScrollLeft}
            onScrollRight={onScrollRight}
            onScrollTop={onScrollTop}
            onScrollBottom={onScrollBottom}
            toggleExpandFunc={toggleExpandFunc}
          />
        )}
      </DndProvider>
    </div>
  );
};
