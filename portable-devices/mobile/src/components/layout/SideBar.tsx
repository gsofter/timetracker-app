import React, { useState } from 'react';
import { Container, View, Text, List, ListItem, Left, Right, Icon, Drawer } from 'native-base';
import { Link } from 'react-router-native';
import {useHistory} from 'react-router-native'

const SideBar = ({ routes, matchUrl, onClose }: any) => {
    const [icon, setIcon] = useState('chevron-down-outline');
    const [isToggle, setToggle] = useState(false);
    const history = useHistory()

    const toggle = () => {
        if (isToggle) {
            setIcon('chevron-down-outline');
            setToggle(false);
        } else {
            setIcon('chevron-up-outline');
            setToggle(true)
        }
    }

    const isMenuExist = routes.length > 0;

    const openMenuItem = (url: string) => {
        history.push(url)
        onClose()
    }

    return (
        <Container style={{ backgroundColor: '#fff' }}>
            {isMenuExist && routes.map((menu: any) => (
                menu.routes ? (
                    <List>
                        <ListItem onPress={() => toggle()}>
                            <Left>
                                <Icon style={{ color: isToggle ? '#fff' : '#a1a1a1' }} name="document-outline" />
                                <Text style={{ color: isToggle ? '#fff' : '#a1a1a1' }}>{menu.name}</Text>
                            </Left>
                            <Right>
                                <Icon name={icon} />
                            </Right>
                        </ListItem>
                        {isToggle && (menu.routes.map((subMenu: any) => (
                            <List key={subMenu.key}>
                                <ListItem key={subMenu.key}>
                                    <Left>
                                        <Link to={subMenu.path} underlayColor="#f0f4f7">
                                            <Text style={{ color: '#a1a1a1' }}>{subMenu.name}</Text>
                                        </Link>
                                    </Left >
                                </ListItem >
                            </List >
                        )))}
                    </List>
                ) :
                    (<List key={menu.key}>
                        <ListItem onPress={() => openMenuItem(menu.path)}>
                            <Left>
                                <Text>{menu.name}</Text>
                            </Left>
                        </ListItem>
                    </List >)
            ))}
        </Container >
    )
}

export default SideBar;
