import React from 'react'
import {View, Text} from "react-native"
import {Row, Col} from 'native-base'

const DayHeader = ({
    styles,
    time,
    days
}) => {
    return(
        <View style={styles.dayHeader}>
            <Text style={styles.light_grey}>TOTAL BY DAY</Text>
            <Row>
                {days.map(day => (
                    <Col>
                        <Text style={styles.grey}>{day}</Text>
                    </Col>
                ))}
            </Row>
            <Row>
                {time.map(data => (
                    <Col>
                        <Text>{data}</Text>
                    </Col>
                ))}
            </Row>
        </View>
    )
}

export default DayHeader