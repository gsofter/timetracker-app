import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Header, Left, Body, Icon, Card, CardItem, Container, Content } from 'native-base';
import { useHistory } from 'react-router-native'
const AddManual = () => {
    const history = useHistory();
    return(
        <Container>
            <Header>
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
                        <Text>Hello world</Text>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    color: {
        color: 'white'
    }
})

export default AddManual;