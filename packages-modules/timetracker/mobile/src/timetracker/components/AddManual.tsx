import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Header, Left, Body, Icon, Card, CardItem, Container, Content } from 'native-base';
import { useHistory } from 'react-router-native'
import moment from 'moment'
const AddManual = () => {
    const history = useHistory();
    return(
        <Container>
            <Header style={{ backgroundColor: '#1f1f1f' }}>
                <Left>
                    <Icon onPress={() => history.goBack()} style={styles.color} name='arrow-back-outline'/>
                </Left>
                <Body>
                    <Text style={styles.color}>Time Entry Details</Text>
                </Body>
            </Header>
            <Content>
                <Card>
                    <CardItem>
                        <TouchableOpacity style={styles.blue_box}>
                            <Text style={styles.head_Text}>START</Text>
                            <Text style={styles.color}>{moment().format('DDDD, MMM DD')}</Text>
                            <Text style={styles.color}>{moment().format('h:mm A')}</Text>
                        </TouchableOpacity>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    color: {
        color: 'white'
    },
    blue_box: {
        backgroundColor: '#01a9f4',
        padding: 15,
        borderRadius: 5,
    },
    head_Text: {
        color: '#6cccf6'
    },
})

export default AddManual;