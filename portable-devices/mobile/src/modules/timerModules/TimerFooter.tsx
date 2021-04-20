/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Icon, Item, Input, Row, Col, Button } from 'native-base';
import { View, StyleSheet, Text } from 'react-native';

const TimerFooter = ({ billable, toggleBillable, toggleProject, isToggle }: any) => {

    return (
        <View style={styles.footer}>
        <View style={styles.row}>
          <Item regular style={{ width: '80%', height: 40 }}>
            <Input style={{ height: 40 }} placeholder="What are you working on?" />
          </Item>
          <View style={styles.row_button}>
            <View style={styles.button}>
              <Icon style={{ color: '#62b1f6' }} name="add-circle-outline" />
              <Text style={{ color: '#62b1f6' }} onPress={() => toggleProject()}>
                Projects
              </Text>
            </View>
            {isToggle && (
              <View>
                <Text>Project List</Text>
              </View>
            )}
          </View>
        </View>
        <Row style={styles.row_2}>
            <>
                <Col>
                    <Button small transparent>
                        <Icon name="pricetag-outline" style={styles.icon_tag} />
                    </Button>
                </Col>
                <Col>
                    <Icon
                    onPress={() => toggleBillable()}
                    type="FontAwesome"
                    name="dollar"
                    style={[styles.icon_dollar, { color: billable ? '#1890ff' : 'grey' }]}
                    />
                </Col>
                <Col>
                    <Text>00:00:00</Text>
                </Col>
                <Col>
                    <Button info block>
                        <Text style={{ color: 'white' }}>Start</Text>
                    </Button>
                </Col>
            </>
          <Col>
            <Icon name="time-outline" style={{ alignSelf: 'center' }} />
            <Icon name="list-outline" style={{ alignSelf: 'center' }} />
          </Col>
        </Row>
      </View>
    )
}

const styles = StyleSheet.create({
    footer: {
      borderTopColor: '#1f1f1f',
      width: '100%',
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'white',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      paddingLeft: 10,
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 40,
      alignItems: 'center',
    },
    row_2: {
      display: 'flex',
      paddingLeft: 10,
      paddingTop: 10,
      paddingBottom: 10,
      alignItems: 'center',
    },
    row_button: {
      width: '30%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon_tag: {
      color: 'black',
    },
    icon_dollar: {
      fontSize: 18,
    },
});

export default TimerFooter;