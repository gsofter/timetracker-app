import React from 'react'
import SchedulerComponent from './Scheduler'
import { useAddScheduleMutation } from '../../../generated-models'
import { IScheduleCreateRequest } from '@admin-layout/schedule-module-core'
import { message } from 'antd'

const Scheduler = (props) => {
    const [addMutation] = useAddScheduleMutation()
    const handleAddSchedule = (request: IScheduleCreateRequest) => {
        addMutation({ variables: { request } }).then(() => {
            message.success('A new event has been created!')
        }).catch(err => {
            console.log(err.message)
            message.error('Event creation failed!')
        })
    }
    return <SchedulerComponent handleAddSchedule={handleAddSchedule}/>
}

export default Scheduler