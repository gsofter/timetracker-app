import React from 'react'
import {View, Text} from "react-native"
import {Row, Col} from 'native-base'
import moment from 'moment'

const DayHeader = ({
    styles,
    current, 
    total
}) => {
    return(
        <View style={styles.dayHeader}>
            <Text style={styles.light_grey}>TOTAL BY DAY</Text>
            <Row>
                <Col>
                    <Text style={styles.grey}>Mon</Text>
                </Col>
                <Col>
                    <Text style={styles.grey}>Tue</Text>
                </Col>
                <Col>
                    <Text style={styles.grey}>Wed</Text>
                </Col>
                <Col>
                    <Text style={styles.grey}>Thu</Text>
                </Col>
                <Col>
                    <Text style={styles.grey}>Fri</Text>
                </Col>
                <Col>
                    <Text style={styles.grey}>Sat</Text>
                </Col>
                <Col>
                    <Text style={styles.grey}>Sun</Text>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Text>{moment(current?.endTime).format('ddd') === 'Mon' ? total : '0:00'}</Text>
                </Col>
                <Col>
                    <Text>{moment(current?.endTime).format('ddd') === 'Tue' ? total : '0:00'}</Text>
                </Col>
                <Col>
                    <Text>{moment(current?.endTime).format('ddd') === 'Wed' ? total : '0:00'}</Text>
                </Col>
                <Col>
                    <Text>{moment(current?.endTime).format('ddd') === 'Thu' ? total : '0:00'}</Text>
                </Col>
                <Col>
                    <Text>{moment(current?.endTime).format('ddd') === 'Fri' ? total : '0:00'}</Text>
                </Col>
                <Col>
                    <Text>{moment(current?.endTime).format('ddd') === 'Sat' ? total : '0:00'}</Text>
                </Col>
                <Col>
                    <Text>{moment(current?.endTime).format('ddd') === 'Sun' ? total : '0:00'}</Text>
                </Col>
            </Row>
        </View>
    )
}

export default DayHeader