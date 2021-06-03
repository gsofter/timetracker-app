import React, {useEffect} from 'react'
import {View, Modal, Pressable, Alert, Text, StyleSheet} from 'react-native';
import {Form, Input, Icon, Button} from 'native-base'
import Grid from 'react-native-grid-component';

const TagModal = ({
    modalVisible,
    setModalVisible,
    setTagName,
    addTag,
    tag,
    updateTags,
    timeData,
    setTag,
}: any) => {

    useEffect(() => {
        if(timeData?.tags){
            setTag(ps => ({...ps, tags: timeData.tags, showTag: true}))
        }
    }, [timeData?.tags])

    const _renderItem = (data, index) => (
        <View style={styles.badge} key={`${index}`}>
            <Text style={styles.color}>{data}</Text>
        </View>
    );

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Form>
                    <View style={styles.flex_row}>
                        <Input 
                        onChangeText={(e) => {
                            setTagName(e)
                        }} 
                        placeholder="Enter tags here"
                        />
                        <Button bordered info transparent small onPress={() => {
                            addTag()
                        }}>
                            <Icon name="add-outline" />
                        </Button>
                    </View>
                    <View style={styles.divider}/>
                </Form>
                {tag.showTag && (
                    <Grid
                        style={{height: 'auto'}}
                        renderItem={_renderItem}
                        keyExtractor={(item, index) => index}
                        data={tag.tags}
                        numColumns={2}
                    />
                )}
                <View style={{flexDirection: 'row'}}>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonSave]}
                        onPress={() => {
                            if(timeData){
                                updateTags(timeData.id, timeData)
                            } else{
                                updateTags()
                            }
                        }}
                    >
                        <Text style={styles.textStyle}>Save Tags</Text>
                    </Pressable>
                </View>
            </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        height: 'auto',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        marginTop: 10
    },
    buttonClose: {
        backgroundColor: "red",
        marginRight: 10
    },
    buttonSave: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    divider: {
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    flex_row: {
        flexDirection: 'row', 
        width: '100%', 
    },
    badge: {
        backgroundColor: 'black',
        borderRadius: 10,
        padding: 5,
        marginLeft: 5,
        marginTop: 10,
        marginBottom: 10,
        height: 30
    },
    color: {
        color: 'white'
    }
})

export default TagModal