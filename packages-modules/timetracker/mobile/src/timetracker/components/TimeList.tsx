import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, CardItem, Left, Right, Icon} from 'native-base'

const TimeList = () => {
    return(
        <View style={styles.container}>
            <Card>
                <CardItem style={styles.header} header>
                    <Left>
                        <Text>Title</Text>
                    </Left>
                    <Right>
                        <Text>Time</Text>
                    </Right>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text style={styles.title}>Time List Screen</Text>
                    </Left>
                    <Right style={styles.row}>
                        <Icon type="FontAwesome" name="dollar" />
                        <Icon style={styles.tag_icon} name="pricetag-outline" />
                    </Right>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text style={styles.grey}>(No Description)</Text>
                    </Left>
                    <Right>
                        <Text>Time</Text>
                    </Right>
                </CardItem>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    header: {
        backgroundColor: '#e5eaee'
    },
    grey: {
        color: '#e5eaee'
    },
    title: {
        color: '#07988b'
    },
    row: {
        flexDirection: 'row',
        justifyContent: "flex-end"        
    },
    tag_icon: {
        color: 'black',
        marginLeft: 10
    }
})

export default TimeList;