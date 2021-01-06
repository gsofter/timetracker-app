import React, {useEffect} from 'react'
import TimesheetComponent from './Timesheet'
import { useAddScheduleMutation, useGetScheduleEventsQuery } from '../../../generated-models'
import { IScheduleCreateRequest } from '@admin-layout/schedule-module-core'
import { message } from 'antd'

const Timesheet = (props) => {
    const [addMutation] = useAddScheduleMutation()
    const handleAddSchedule = (request: IScheduleCreateRequest) => {
        addMutation({ variables: { request } }).then(() => {
            message.success('A new event has been created!')
        }).catch(err => {
            console.log(err.message)
            message.error('Event creation failed!')
        })
    }

    const { data, loading, error, refetch } = useGetScheduleEventsQuery();
    useEffect(() => {
        refetch()
    }, [refetch])

    return !data && loading ? null : <TimesheetComponent handleAddSchedule={handleAddSchedule} events={data.getScheduleEvents}/>
}

export default Timesheet