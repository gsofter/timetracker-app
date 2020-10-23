import * as React from "react";
import Scheduler, {
  SchedulerData,
  ViewTypes,
  DATE_FORMAT,
  DemoData
} from "@cdmbase/react-big-scheduler";
// import "@cdmbase/react-big-scheduler/lib/css/style.css";
import moment from "moment";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const Demo2 = ({ props }) => {
  let schedulerData = new SchedulerData(
    2027-12-18,
    ViewTypes.Week,
    false,
    false,
    {
      views: [
        {
          viewName: "Day(Agenda)",
          viewType: ViewTypes.Day,
          showAgenda: true,
          isEventPerspective: false,
        },
        {
          viewName: "Week",
          viewType: ViewTypes.Week,
          showAgenda: false,
          isEventPerspective: false,
        },
        {
          viewName: "Month(TaskView)",
          viewType: ViewTypes.Month,
          showAgenda: false,
          isEventPerspective: true,
        },
        {
          viewName: "Year",
          viewType: ViewTypes.Year,
          showAgenda: false,
          isEventPerspective: false,
        },
      ],
    }
  );

  console.log(DemoData,"demo")
  const [viewModel, setViewModel] = React.useState(schedulerData);
  React.useEffect(() => {
    viewModel.setResources(DemoData.resources);
    viewModel.setEvents(DemoData.events);
  }, []);

  const prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(DemoData.events);

    setViewModel(schedulerData);
  };
  const nextClick = (schedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(DemoData.events);
    setViewModel(schedulerData);
  };
  const onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(DemoData.events);
    setViewModel(schedulerData);
  };
  const onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    );
    schedulerData.setEvents(DemoData.events);
    setViewModel(schedulerData);
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

  const ops2 = (schedulerData, event) => {
    alert(
      `You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  const updateEventStart = (schedulerData, event, newStart) => {
    if (
      confirm(
        `Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`
      )
    ) {
      schedulerData.updateEventStart(event, newStart);
    }
    setViewModel(schedulerData);
  };

  const newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    if(confirm(`Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`)){

        let newFreshId = 0;
        schedulerData.events.forEach((item) => {
            if(item.id >= newFreshId)
                newFreshId = item.id + 1;
        });

        let newEvent = {
            id: newFreshId,
            title: 'New event you just created',
            start: start,
            end: end,
            resourceId: slotId,
            bgColor: 'purple'
        }
        schedulerData.addEvent(newEvent);
        setViewModel(schedulerData);
    }
}

  const updateEventEnd = (schedulerData, event, newEnd) => {
    if (
      confirm(
        `Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`
      )
    ) {
      schedulerData.updateEventEnd(event, newEnd);
    }
    setViewModel(schedulerData);
  };

  const moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    if (
      confirm(
        `Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`
      )
    ) {
      schedulerData.moveEvent(event, slotId, slotName, start, end);
      setViewModel(schedulerData);
    }
  };

  const toggleExpandFunc = (schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId);
    setViewModel(schedulerData);
  };

  const eventItemTemplateResolver = (
    schedulerData,
    event,
    bgColor,
    isStart,
    isEnd,
    mustAddCssClass,
    mustBeHeight,
    agendaMaxEventWidth
  ) => {
    let borderWidth = isStart ? "4" : "0";
    let borderColor = "rgba(0,139,236,1)",
      backgroundColor = "#80C5F6";
    let titleText = schedulerData.behaviors.getEventTextFunc(
      schedulerData,
      event
    );
    if (!!event.type) {
      borderColor =
        event.type == 1
          ? "rgba(0,139,236,1)"
          : event.type == 3
          ? "rgba(245,60,43,1)"
          : "#999";
      backgroundColor =
        event.type == 1 ? "#80C5F6" : event.type == 3 ? "#FA9E95" : "#D9D9D9";
    }
    let divStyle: any = {
      borderLeft: borderWidth + "px solid " + borderColor,
      backgroundColor: backgroundColor,
      height: mustBeHeight,
    };
    if (!!agendaMaxEventWidth)
      divStyle = {...divStyle , maxWidth: agendaMaxEventWidth};

      return (
        <div key={event.id} className={mustAddCssClass} style={divStyle}>
          <span style={{ marginLeft: "4px", lineHeight: `${mustBeHeight}px` }}>
            {titleText}
          </span>
        </div>
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
            eventItemTemplateResolver={eventItemTemplateResolver}
            toggleExpandFunc={toggleExpandFunc}
          />
        )}
      </DndProvider>
    </div>
  );
};
