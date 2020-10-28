import * as React from "react";
import Scheduler, {
  SchedulerData,
  ViewTypes,
  DATE_FORMAT,
  DemoData,
} from "@admin-layout/react-shared-components/lib/big_scheduler";
import moment from "moment";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useFela } from "react-fela";

export const Home = ({ props }) => {
  const { css } = useFela(props);
  let schedulerData = new SchedulerData(
    "2017-12-18",
    ViewTypes.Week,
    false,
    false,
    {
      // minuteStep: 15
    }
  );
  console.log({ schedulerData }, "schedular data");

  const schedularBeside = (schedulerData.config.besidesWidth = 290);
  const schedularWidth = (schedulerData.config.schedulerWidth = "100%");

  // const schedular = (schedulerData.documentWidth - schedularBeside) * schedularWidth
  moment.locale("en");

  moment.locale("en");

  const [viewModel, setViewModel] = React.useState(schedulerData);
  React.useEffect(() => {
    viewModel.setLocaleMoment(moment);
    viewModel.setResources(DemoData.resources);
    viewModel.setEvents(DemoData.events);
  }, []);

  const prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(DemoData.events);

    setViewModel(schedulerData);
    console.log(schedulerData, "prev click");
  };
  const nextClick = (schedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(DemoData.events);
    setViewModel(schedulerData);
    console.log(schedulerData, "next click");
  };
  const onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(DemoData.events);
    setViewModel(schedulerData);
    console.log(schedulerData, date);
  };
  const onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    );
    schedulerData.setEvents(DemoData.events);
    setViewModel(schedulerData);
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

      setViewModel(schedulerData);
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

  return (
    <div className={css(menuStyle.styles)}>
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
          />
        )}
      </DndProvider>
    </div>
  );
};

const menuStyle: any = {
  styles: (theme) => ({
    position: "relative",
    "& .header1-text": {
      fontSize: "25px",
      color: "#90CDF9",
      fontWeight: 500,
    },
    "& .header2-text": {
      fontSize: "14px",
      fontWeight: "500",
    },
    "& .header3-text": {
      fontSize: "12px",
      fontWeight: "500",
    },
    "& .base-text": {
      fontSize: "12px",
    },
    "& .help-text": {
      fontSize: "12px",
      color: "#999",
    },
    "& .disabled-text": {
      fontSize: "12px",
      color: "#ccc",
    },
    "& .scheduler": {
      margin: "20px auto",
      borderSpacing: 0,
    },
    "& .scheduler td": {
      padding: "0px",
    },
    "& .expander-space": {
      overflow: "hidden",
      display: "inline-block",
      width: "1em",
      height: "1em",
      lineHeight: "1em",
      fontSize: ".9em",
      verticalAlign: "middle",
      marginTop: "-1%",
    },
    "& .resource-view": {
      border: "1px solid #e9e9e9",
      overflow: "hidden",
    },
    "& .scheduler-view": {
      border: "1px solid #e9e9e9",
      margin: "0 0 0 -1px",
      padding: 0,
    },
    "& .scheduler-content": {
      position: "relative",
      zIndex: 2,
    },
    "& .scheduler-bg": {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
    },
    "& table .resource-table, table.scheduler-bg-table, table.scheduler-table": {
      width: "100%",
      margin: 0,
      padding: 0,
      borderSpacing: 0,
      textAlign: "center",
    },
    "& table .scheduler-table": {
      border: "1px solid #e9e9e9",
    },
    "& table .scheduler-content-table": {
      margin: "0",
      padding: "0",
      border: "0 solid #e9e9e9",
      borderSpacing: 0,
    },
    "& table .resource-table tr, table.scheduler-bg-table tr, table.scheduler-table tr": {
      borderBottom: "1px solid #e9e9e9",
    },
    "& table.resource-table th, table.scheduler-table th, table.resource-table td, table.scheduler-bg-table td, table.scheduler-table td": {
      borderRight: "1px solid #e9e9e9",
      borderBottom: "1px solid #e9e9e9",
    },
    "& table.scheduler-bg-table th": {
      borderRight: "1px solid #e9e9e9",
    },
    "& table.resource-table tr th:last-child, table.scheduler-table tr th:last-child": {
      borderRight: 0,
    },
    "& table.resource-table tr td:last-child, table.scheduler-table tr td:last-child": {
      borderRight: 0,
    },
    "& table.scheduler-table tr:last-child td": {
      borderBottom: 0,
    },
    "& .timeline-event": {
      position: "absolute",
    },
    "& .day-event": {
      position: "relative",
      display: "inline-block",
      margin: "0px 5px",
    },
    "& .day-event-container": {
      textAlign: "left",
      padding: "5px 5px 0 5px",
    },
    "& .round-all": {
      borderRadius: "14px",
    },
    "& .round-head": {
      borderRadius: "14px 0px 0px 14px",
    },
    "& .round-tail": {
      borderRadius: "0px 14px 14px 0px",
    },
    "& .round-none": {
      borderRadius: "0px",
    },
    "& .event-container": {
      position: "relative",
    },
    "& .event-item": {
      margin: "1px 0",
      width: "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      color: "#fff",
      paddingRight: "20px !important",
    },
    "& .overflow-text": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      paddingRight: "5px !important",
    },
    "& .status-dot": {
      width: "14px",
      height: "14px",
      borderRadius: "7px",
    },
    "& .ant-radio-button-wrapper-checked": {
      backgroundColor: "#108EE9",
      color: "#FFFFFF",
    },
    "& .icon-nav:hover": {
      color: "#1E90FF !important",
      boxShadow: "0 0 0px !important",
      cursor: "pointer",
    },
    "& .add-more-popover-overlay": {
      position: "absolute",
      zIndex: 5,
      border: "1px solid #e5e5e5",
      backgroundColor: "#fff",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.25)",
      padding: "10px",
    },
    "& .popover-calendar": {
      width: "300px",
    },
    "& .popover-calendar .ant-calendar": {
      boxShadow: "0 1px 6px rgba(0,0,0,0) !important",
    },
    "& .event-resizer": {
      position: "absolute",
      zIndex: 4,
      display: "block",
      width: "7px",
      top: "-1px",
      bottom: "-1px",
    },
    "& .event-start-resizer": {
      cursor: "w-resize",
      left: "-1px",
    },
    "& .event-end-resizer": {
      cursor: "e-resize",
      right: "-1px",
    },
    "& .selected-area": {
      position: "absolute",
    },
    "& .slot-cell": {
      paddingLeft: "4px",
      paddingRight: "4px",
    },
    "& .slot-text": {
      display: "inline-block",
      paddingLeft: "4px",
      paddingRight: "4px",
    },
  }),
};
