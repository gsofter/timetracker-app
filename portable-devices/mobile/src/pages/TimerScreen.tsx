/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Item, Input, Row, Col, Button, Icon } from 'native-base';

const TimerScreen = () => {
  const [isToggle, setIsToggle] = useState(false);

  const toggleProject = () => {
    setIsToggle(!isToggle);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text>Timer Screen</Text>
        </View>
      </ScrollView>
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
        <Row style={styles.row}>
          <Col>
            <Button small transparent>
              <Icon name="pricetag-outline" />
            </Button>
          </Col>
          <Col>
            <Icon type="AntDesign" name="DollarCircleOutlined" />
          </Col>
          <Col>
            <Text>00:00:00</Text>
          </Col>
          <Col>
            <Button info>
              <Text>Start</Text>
            </Button>
          </Col>
        </Row>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
  },
  footer: {
    borderTopColor: '#1f1f1f',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    paddingRight: 40,
    backgroundColor: 'white',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 40,
    alignItems: 'center',
  },
  row_2: {
    display: 'flex',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 40,
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
    cursor: 'pointer',
  },
});
export default TimerScreen;
