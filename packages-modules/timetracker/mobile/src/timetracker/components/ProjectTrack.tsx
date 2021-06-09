import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Card, CardItem, Row, Col} from 'native-base'
import moment from 'moment'

import { formatDuration } from '@admin-layout/timetracker-module-browser/src/timetracker/services/timeRecordService'
import DayHeader from './DayHeader'

const ProjectTrack = ({data, projectsData}) => {
    const [selectProject, setSelectProject] = useState([])
    const [weekStart, setWeekStart] = useState(moment().clone().startOf('week'))
    const [time, setTime] = useState([])

    let days = [];
    for (let i = 0; i <= 6; i++) {
        days.push(moment(weekStart).add(i, 'days').format("ddd"));
    };

    useEffect(() => {
        const project = projectsData?.getProjects.filter(project => data?.getDurationTimeRecords.find(record => project.id === record.projectId))
        setSelectProject(project)
    }, [data, projectsData])

    const getTimeRecord = (project) => {
        let calTime = []
        if(data?.getDurationTimeRecords.length){
            const records = data?.getDurationTimeRecords.filter(record => record.projectId === project.id)
            const currentTime = records.filter(time => days.includes(moment(time.endTime).format('ddd')))
            const getTime = days.map(day => {
                return currentTime.map(time => {
                    if(day === moment(time.endTime).format('ddd')){
                        return(formatDuration(calcTotalTime(time.startTime, time.endTime), 'h:mm'))
                    } else{
                        return "0:00"
                    }
                })
            })
            calTime = getTime.map(time => {
                return addTime(time)
            })
        } else{
            calTime = days.map(day => '0:00')
        }
        return (
            <>
            <CardItem>
                <Row>
                    <Col>
                        <Text style={styles.title}>{project?.name}</Text>
                    </Col>
                    <Col style={{alignItems: 'flex-end'}}>
                        <Text style={{fontWeight: 'bold'}}>Total: {addTime(calTime)}</Text>
                    </Col>
                </Row>
            </CardItem>
            <CardItem>
                <DayHeader days={days} time={calTime} header={false} styles={styles}/>
            </CardItem>
            </>
        )
    }

    const addTime = (times) => {
        const sum = times.reduce((acc, time) => acc.add(moment.duration(time)), moment.duration());
        return ([Math.floor(sum.asHours()), sum.minutes(), sum.seconds()].join(':'))
    }

    const calcTotalTime = (startTime: string, endTime: string): number => {
        return Math.floor((moment(endTime).valueOf() - moment(startTime).valueOf()) / 1000);
    };

    return (
        <>
        {selectProject?.map(project => (
            <Card>
                {getTimeRecord(project)}
            </Card>
        ))}
        </>
    )
}

const styles = StyleSheet.create({
    title: {
        color: '#9400D3'
    },
    grey: {
        color: 'grey'
    }
})

export default ProjectTrack
