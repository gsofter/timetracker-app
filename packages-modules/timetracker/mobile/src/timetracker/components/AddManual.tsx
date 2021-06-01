import React, { useState, useEffect } from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Switch,
    ScrollView
} from 'react-native';
import { 
    Header, 
    Left, 
    Body, 
    Icon, 
    Card, 
    List, 
    Right, 
    Container, 
    Content, 
    ListItem, 
    Input,
    Button,
    Badge 
} from 'native-base';
import { useHistory } from 'react-router-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment'
import {projects, tasks} from "../../constants/data"

const AddManual = () => {
    const history = useHistory();
    const [show, setShow] = useState(false)
    const [isEnd, setIsEnd] = useState(false)
    const [startDate, setStartDate] = useState(new Date(1598051730000));
    const [endDate, setEndDate] = useState(new Date(1598051730000));
    const [dates, setDates] = useState({
        startDate: moment('2017-08-30T00:00:00'),
        endDate: moment('2017-08-30T00:00:00'),
        totalDate: moment('2017-08-30T00:00:00')
    })
    const [isEnabled, setIsEnabled] = useState(false);
    const [listOpen, setListOpen] = useState({
        project: false,
        task: false,
        projectIcon: 'chevron-forward-outline',
        taskIcon: 'chevron-forward-outline',
        projectName: null,
        taskName: null
    })
    const [list, setList] = useState({
        project: projects,
        task: tasks
    })
    const [projectOpen, setProjectOpen] = useState(false);
    const [projectValue, setProjectValue] = useState(null);
    const [taskOpen, setTaskOpen] = useState(false);
    const [taskValue, setTaskValue] = useState(null);
    const [tag, setTag] = useState({
        showTag: false,
        btnText: 'Edit Tags',
        tags: [],
    })
    const [tagName, setTagName] = useState(null)
    
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {
        var start = moment(dates.startDate, 'HH:mm');
        var end = moment(dates.endDate, 'HH:mm');
        var minutes = end.diff(start, 'minutes');
        var interval = moment().hour(0).minute(minutes);
        setDates(ps => ({...ps, totalDate: interval}))
    }, [dates.startDate, dates.endDate])

    useEffect(() => {
        const data = projects.find(project => project.value === projectValue)
        if(data){
            setListOpen(ps => ({...ps, projectName: data?.label}))
        }
    }, [projectValue])

    const handleStartConfirm = (selectedDate) => {
        const currentDate = selectedDate || startDate;
        setStartDate(currentDate);
        setDates(ps => ({...ps, startDate: moment(currentDate)}))
        handleStartCancel()
    };

    const handleStartCancel = () => {
        setShow(false)
    }
    const handleEndConfirm = (selectedDate) => {
        const currentDate = selectedDate || endDate;
        setEndDate(currentDate);
        setDates(ps => ({...ps, endDate: moment(currentDate)}))
        handleEndCancel()
    };

    const handleEndCancel = () => {
        setIsEnd(false)
    }
    
    const tagHandler = () => {
        if(tag.showTag){
            setTag(ps => ({...ps, showTag: false, btnText: 'Edit Tags'}))
        } else {
            setTag(ps => ({...ps, showTag: true, btnText: 'Save Tags'}))
        }
    }

    const addTag = () => {
        setTag(ps => ({...ps, tags: [...tag.tags, tagName]}))
    }

    return(
        <Container>
            <Header style={{ backgroundColor: '#fff' }}>
                <Left>
                    <Icon onPress={() => history.goBack()} name='arrow-back-outline'/>
                </Left>
                <Body>
                    <Text>Time Entry Details</Text>
                </Body>
            </Header>
            <Content>
                <Card>
                    <List>
                        <ListItem>
                            <View style={styles.flex_row}>
                                <TouchableOpacity style={styles.blue_box} onPress={() => setShow(true)}>
                                    <Text style={styles.head_Text}>START</Text>
                                    <Text style={styles.color}>{dates.startDate.format('ddd')}, {dates.startDate.format('MMM DD')}</Text>
                                    <Text style={styles.color}>{dates.startDate.format('h:mm A')}</Text>
                                </TouchableOpacity>
                                <View style={styles.justify_center}>
                                    <Text style={styles.head_Text_total}>TOTAL</Text>
                                    <Text>{dates.totalDate.format('h:mm')}</Text>
                                    <Text>00</Text>
                                </View>
                                <TouchableOpacity style={styles.blue_box_end} onPress={() => setIsEnd(true)}>
                                    <Text style={styles.head_Text}>END</Text>
                                    <Text style={styles.color}>{dates.endDate.format('ddd')}, {dates.endDate.format('MMM DD')}</Text>
                                    <Text style={styles.color}>{dates.endDate.format('h:mm A')}</Text>
                                </TouchableOpacity>
                            </View>
                            <DateTimePickerModal
                            isVisible={show}
                            testID="dateTimePicker"
                            date={startDate}
                            mode={'datetime'}
                            is24Hour={false}
                            display="default"
                            onConfirm={handleStartConfirm}
                            onCancel={handleStartCancel}
                            />
                            <DateTimePickerModal
                            isVisible={isEnd}
                            testID="dateTimePicker"
                            date={endDate}
                            mode={'datetime'}
                            is24Hour={false}
                            display="default"
                            onConfirm={handleEndConfirm}
                            onCancel={handleEndCancel}
                            />
                        </ListItem>
                        <ListItem style={styles.flex_col}>
                            <Text style={{ fontSize: 16 }}>Description</Text>
                            <Input placeholder='What have you worked on?'/>
                        </ListItem>
                        <DropDownPicker
                            disableBorderRadius={true}
                            open={projectOpen}
                            style={styles.dropdownStyle}
                            dropDownDirection='TOP'
                            dropDownContainerStyle={styles.dropdownContainerStyle}
                            placeholder="Select a Project"
                            mode="BADGE"
                            maxHeight={120}
                            zIndex={1000}
                            value={projectValue}
                            items={projects}
                            setOpen={setProjectOpen}
                            setValue={setProjectValue}
                            setItems={(data) => console.log(data)}
                        /> 
                        <View
                        style={styles.divider}
                        />
                        <View>
                            <DropDownPicker
                                disableBorderRadius={true}
                                open={taskOpen}
                                dropDownDirection='TOP'
                                placeholder="Select a Task"
                                style={styles.dropdownStyle}
                                dropDownContainerStyle={styles.dropdownContainerStyle}
                                mode="BADGE" 
                                zIndex={1}
                                maxHeight={120}
                                value={taskValue}
                                items={tasks}
                                setOpen={setTaskOpen}
                                setValue={setTaskValue}
                                setItems={(data) => console.log(data)}
                            />
                        </View>
                        <View
                        style={styles.divider}
                        />
                        <ListItem>
                            <Left>
                                <Text>Billable</Text>
                            </Left>
                            <Right>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isEnabled ? "black" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
                            </Right>
                        </ListItem>
                        <ListItem style={styles.flex_row}>
                            <Text>Tags</Text>
                            <Button block info small onPress={() => tagHandler()}>
                                <Text style={[styles.color, styles.left_right]}>{tag.btnText}</Text>
                            </Button>
                        </ListItem>
                        {tag.showTag && (
                            <ListItem style={{ flexDirection: 'column' }}>
                                <View style={{flexDirection: 'row'}}>
                                    <Input 
                                        onChangeText={(e) => setTagName(e)} 
                                        placeholder='Enter Tag Title' 
                                    />
                                    <Button bordered info transparent onPress={() => addTag()}>
                                        <Icon color='#1890ff' name='add-outline' />
                                    </Button>
                                </View>
                                <View style={styles.flex_row}>
                                    {tag.tags.map((data, index) => (
                                        <View style={styles.badge} key={index}>
                                            <Text style={styles.color}>{data}</Text>
                                        </View>
                                    ))}
                                </View>
                            </ListItem>
                        )}
                    </List>
                    <Button block info style={{marginTop: 20}}>
                        <Text style={[styles.color]}>Submit</Text>
                    </Button>
                </Card>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    color: {
        color: 'white'
    },
    grey: {
        color: 'grey'
    },
    blue_box: {
        flex: 1,
        backgroundColor: '#01a9f4',
        padding: 12,
        borderRadius: 5,
    },
    blue_box_end: {
        flex: 1,
        backgroundColor: '#01a9f4',
        padding: 12,
        borderRadius: 5,
        alignItems: 'flex-end'
    },
    head_Text: {
        color: '#6cccf6',
        paddingBottom: 10
    },
    head_Text_total: {
        color: 'grey',
        paddingBottom: 10
    },
    flex_row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    justify_center: {
        flex: 1,
        alignItems: 'center'
    },
    flex_col: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'column'
    },
    left_right: {
        paddingLeft: 5,
        paddingRight: 5
    },
    badge: {
        backgroundColor: 'black',
        borderRadius: 10,
        padding: 5,
        marginLeft: 5
    },
    dropdownStyle: {
        borderRadius: 0,
        borderColor: '#ff000000',
        marginLeft: 5,
        marginRight: 30
    },
    dropdownContainerStyle:{
        borderRadius: 0,
        borderColor: 'grey'
    },
    divider: {
        borderBottomColor: '#dcdcdc',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginLeft: 18
    }
})

export default AddManual;
