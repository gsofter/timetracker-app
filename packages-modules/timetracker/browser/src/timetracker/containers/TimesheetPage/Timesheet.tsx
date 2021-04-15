import React, { useCallback, useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment, { Moment } from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { Row, Col, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useFela } from 'react-fela';
import {
  ITimeRecord,
  IProjects as IProject,
  ITask,
  IOrgMember as IMember,
  ITimeRecordRequest,
} from '@admin-layout/timetracker-core';
import TimesheetModal from './TimesheetModal';

const DnDCalendar: any = withDragAndDrop(Calendar as any);
const allViews: string[] = ['day', 'week', 'month'];

enum VIEW_MODE {
  CALENDAR_VIEW,
  TABULAR_VIEW,
}

interface ITimesheetProps {
  userId: string;
  form: any;
  events: [ITimeRecord];
  isShowModal: boolean;
  selectedProject: string;
  selectedTask: string;
  selectedUser: any;
  selectedEvent: ITimeRecord;
  loading: boolean;
  projects: Array<IProject>;
  tasks: Array<ITask>;
  members: Array<IMember>;
  localizer: any;
  weekStart: Moment;
  setSelectedEvent: Function;
  setPathWeekStart: Function;
  handleAddTimeRecordEvent: (request: ITimeRecordRequest) => void;
  handleUpdateTimeRecordEvent: (recordId: string, request: ITimeRecordRequest) => void;
  handleRemoveTimeRecordEvent: () => void;
  handleOpenNewTimeModal: () => void;
  handleCloseTimeModal: () => void;
  handleSelectSlot: (any) => void;
  handleSelectEvent: (any) => void;
  handleChangeProject: (any) => void;
  handleChangeTask: (any) => void;
  handleChangeUser: (any) => void;
}

function SelectableCalendar({
  userId,
  events,
  projects,
  members,
  form,
  isShowModal,
  loading,
  selectedEvent,
  handleAddTimeRecordEvent,
  handleUpdateTimeRecordEvent,
  handleRemoveTimeRecordEvent,
  handleCloseTimeModal,
  handleSelectSlot,
  handleSelectEvent,
  handleOpenNewTimeModal,
  localizer,
  weekStart,
  setPathWeekStart,
}: ITimesheetProps) {
  const resetModal = (e: any) => {
    e.preventDefault();
    form.resetFields();
  };

  const onEventDrop = ({ event, start, end, allDay }) => {
    const updateRequest = { startTime: moment(start), endTime: moment(end) };
    handleUpdateTimeRecordEvent(event.id, updateRequest);
  };

  const onEventResize = ({ event, start, end }) => {
    const updateRequest = { startTime: moment(start), endTime: moment(end) };
    handleUpdateTimeRecordEvent(event.id, updateRequest);
  };

  const EventComponent = ({ start, end, title }) => {
    return (
      <>
        <p>{title}</p>
        <p>{start}</p>
        <p>{end}</p>
      </>
    );
  };

  const EventAgenda = ({ event }) => {
    return (
      <>
        <span>
          <em style={{ color: 'magenta' }}>{event.title}</em>
          <p>{event.desc}</p>
        </span>
      </>
    );
  };

  const handleNavigate = date => {
    setPathWeekStart(moment(date));
  };
  return (
    <>
      <TimesheetModal
        userId={userId}
        event={selectedEvent}
        isShowModal={isShowModal}
        members={members}
        projects={projects}
        loading={loading}
        handleAddTimeRecordEvent={handleAddTimeRecordEvent}
        handleUpdateTimeRecordEvent={handleUpdateTimeRecordEvent}
        handleRemoveTimeRecordEvent={handleRemoveTimeRecordEvent}
        handleCloseTimeModal={handleCloseTimeModal}
      />

      <Row style={{ marginBottom: '20px' }}>
        <Col xs={24}>
          <Button type="primary" onClick={handleOpenNewTimeModal}>
            <PlusOutlined /> Add timesheet
          </Button>
        </Col>
      </Row>

      <DnDCalendar
        selectable={true}
        localizer={localizer}
        events={events}
        defaultView="week"
        views={allViews}
        defaultDate={moment(weekStart).toDate()}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        startAccessor="startTime"
        endAccessor="endTime"
        titleAccessor="taskName"
        toolbar={true}
        resizable={true}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        components={{
          event: EventComponent,
          agenda: {
            event: EventAgenda,
          },
        }}
        onNavigate={handleNavigate}
        // resources={isViewGroup ? resourceMap : undefined}
        // resourceIdAccessor={isViewGroup ? 'projectId' : undefined}
        // resourceTitleAccessor={isViewGroup ? 'projectTitle' : undefined}
      />
    </>
  );
}

const stylesheet: any = {
  styles: theme => ({
    position: 'relative',
    width: '100%',
    // Default height for the Timesheet Calender view
    '& .rbc-calendar': {
      height: '100vh',
    },
    '& .sm-screen-size': {
      '@media (max-width: 768px)': {
        width: '100% !important',
      },
    },
    '& ul.jsx-4179805763': {
      zIndex: 1050,
      webkitBoxSizing: 'border-box',
      boxSizing: 'border-box',
      padding: '4px 0',
      fontSize: '13px',
      maxHeight: '100px',
      fontVariant: 'initial',
      backgroundColor: '#fff',
      borderRadius: '2px',
      outline: 'none',
      webkitBoxShadow:
        '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
      boxShadow:
        '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
    },
    '& div.jsx-4179805763': {
      marginTop: '8px',
      width: '100%',
    },
    '& .rbc-day-slot': {
      position: 'relative',
    },
    '& .rbc-day-slot .rbc-events-container': {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      marginRight: '10px',
      top: 0,
    },
    '& .rbc-day-slot .rbc-events-container.rbc-rtl': {
      left: '10px',
      right: 0,
    },
    '& .rbc-day-slot .rbc-event': {
      border: '1px solid #265985',
      display: 'flex',
      maxHeight: '100%',
      minHeight: '20px',
      flexFlow: 'column wrap',
      alignItems: 'flex-start',
      overflow: 'hidden',
      position: 'absolute',
    },
    '& .rbc-event': {
      border: 'none',
      boxShadow: 'none',
      margin: 0,
      padding: '2px 5px',
      backgroundColor: '#3174ad',
      borderRadius: '5px',
      color: '#fff',
      cursor: 'pointer',
      width: '100%',
      textAlign: 'left',
    },
  }),

  form: props => ({
    display: 'block',
    '& .footer': {
      display: 'flex',
      flexDirection: 'row',
    },
  }),
};

export default (props: ITimesheetProps) => {
  const { css } = useFela();
  return (
    <div className={css(stylesheet.styles)}>
      <div className="calender-width">
        <SelectableCalendar {...props} />
      </div>
    </div>
  );
};
