import React from 'react'
import {View, Modal, Pressable, Alert, Text} from 'react-native';
import {Form, Input, Icon, Button} from 'native-base'
import Grid from 'react-native-grid-component';

const TagModal = ({
    modalVisible,
    setModalVisible,
    styles,
    setTagName,
    addTag,
    tag,
}) => {

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
                        onChangeText={(e) => setTagName(e)} 
                        placeholder="Enter tags here"
                        />
                        <Button bordered info transparent small onPress={() => addTag()}>
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
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={styles.textStyle}>Close Modal</Text>
                </Pressable>
            </View>
            </View>
        </Modal>
    )
}

export default TagModal