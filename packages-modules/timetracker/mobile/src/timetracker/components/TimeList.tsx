import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Card, CardItem, Left, Right, Icon} from 'native-base'

import TagModal from "./TagModal"

const TimeList = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [tagName, setTagName] = useState(null)
    const [tag, setTag] = useState({
        showTag: false,
        tags: [],
    })

    const addTag = () => {
        setTag(ps => ({...ps, tags: [...tag.tags, tagName], showTag: true}))
    }

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
                        <TouchableHighlight
                            onPress={() => setModalVisible(true)}
                            style={styles.icon_press} 
                            underlayColor='#eff0f1'
                        >
                            <Icon style={styles.tag_icon} name="pricetag-outline" />
                        </TouchableHighlight>
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
            <TagModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setTagName={setTagName}
                addTag={addTag}
                tag={tag}
            />
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
    },
    icon_press: {
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default TimeList;