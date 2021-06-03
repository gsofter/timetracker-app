import React, {useState} from "react";
import {View, Text, Modal, Pressable, Alert, StyleSheet, ScrollView} from 'react-native'
import {List, ListItem} from "native-base"

import {
    ITimeRecordRequest,
  } from '@admin-layout/timetracker-core';
import moment from "moment";

const ProjectModal = ({
    setModalVisible,
    modalVisible,
    projectsData,
    setTimeRecord,
    updateTimeRecord,
    timeRecord,
    plData
}) => {
    const [selectedId, setSelectedId] = useState('');

    const updateProjectId = (projectId) => {
        const {id, ...rest} = timeRecord;
        const newTimeRecord: ITimeRecordRequest = {
          ...rest,
          projectId: projectId
        };
        setTimeRecord(newTimeRecord)
        updateTimeRecord(plData.getPlayingTimeRecord.id, newTimeRecord);
    };

    return (
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
                {projectsData?.getProjects.length === 0 ? (
                    <Text>No Projects Found</Text>
                ): 
                <ScrollView style={{height: 150}} scrollEnabled={true}>
                    <List>
                        {projectsData?.getProjects.map(project => (
                            <ListItem onPress={() => {
                                updateProjectId(project.id)
                                setSelectedId(project.id)
                            }}>
                                <Text style={selectedId === project.id && styles.selected}>{project.name}</Text>
                            </ListItem>
                        ))}
                    </List>
                </ScrollView>}
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

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: "50%",
        margin: 10,
        height: 'auto',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
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
    },
    selected: {
        fontWeight: 'bold',
    }
})

export default ProjectModal