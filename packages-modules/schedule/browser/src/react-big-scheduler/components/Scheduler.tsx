import React, { useState } from "react";
import { Calendar, View, DateLocalizer } from "react-big-calendar";
import moment from "moment";

import { momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const allViews: View[] = ["agenda", "day", "week", "month"];

interface Props {
  localizer: DateLocalizer;
}

class CalendarEvent {
  title: string;
  allDay: boolean;
  start: Date;
  end: Date;
  desc: string;
  resourceId?: string;
  tooltip?: string;

  constructor(
    _title: string,
    _start: Date,
    _endDate: Date,
    _allDay?: boolean,
    _desc?: string,
    _resourceId?: string
  ) {
    this.title = _title;
    this.allDay = _allDay || false;
    this.start = _start;
    this.end = _endDate;
    this.desc = _desc || "";
    this.resourceId = _resourceId;
  }
}

function SelectableCalendar({ localizer }: Props) {
  const [events, setEvents] = useState([
    {
      title: "My event",
      allDay: true,
      start: moment().toDate(),
      end: moment()
        .add(4, "hours")
        .toDate(),
    },
  ] as CalendarEvent[]);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");

    if (title) {
      let newEvent = {} as CalendarEvent;
      newEvent.start = moment(start).toDate();
      newEvent.end = moment(end).toDate();
      newEvent.title = title;

      // Erroneous code
      // events.push(newEvent)
      // setEvents(events)
      setEvents([...events, newEvent]);
    }
  };

  return (
    <>
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        defaultView="month"
        views={allViews}
        defaultDate={new Date(2020, 4, 21)}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
      />
    </>
  );
}

export const Scheduler = (props) => {
  return (
    <div style={{ height: "70vh", width: "1030px" }}>
      <SelectableCalendar localizer={localizer} />
    </div>
  );
};
