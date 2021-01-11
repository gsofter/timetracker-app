import React,{useState} from 'react';
import { Avatar, Badge, Row, Col, Tabs, Spin} from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { useAuth } from "../../../context";
import Identicon from "identicon.js";
import Base64 from "base-64";

function UserView ({ collapsed }) {
    const { user, loading }: any = useAuth();

    if (!user && loading) {
    return <Spin />;
    }

    if (!user || user.isTest || user.mock) {
    return null;
    }

    return (
    <span
        data-user={user.nickname}
        id={
        !user || user.isTest || user.mock ? `cde-user-placeholder` : "cde-user"
        }
    >
        <Avatar
        style={{ marginRight: !collapsed ? "7px" : 0 }}
        src={getImageUrl(user.picture)}
        >
        {user.nickname || "Guest"}
        </Avatar>{" "}
        {!collapsed && (
        <span className="cde-username"> {user.nickname || "Guest"}</span>
        )}
    </span>
    );
}

const getImageUrl = (picture) => {
    return (
        picture ||
        `data:image/png;base64,${new Identicon(
        Base64.encode("myawsomestringbebe"),
        420
        ).toString()}`
    );
};
const getAvatar = () => {
    return <UserView collapsed />;
    }

const TabPane = Tabs.TabPane;
function callback(key) {
  console.log(key);
}

  const NotificationTabs = () => {
      return(
        <>
            <div style={{backgroundColor: "#fff", right: '12%', position: 'absolute',  borderRadius: 4, zIndex: 1, padding: 20}} className="Notification-tabs">
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
                    <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                </Tabs>
            </div>
        </>
      );    
  }
  

export const TopBarCustom = () => {
    const [isVisible,setIsVisible] = useState(false)
    return(
        <div style={topBar}>
        <Row>
            <Col span={18}>

            </Col>
            <Col span={2}>
                <div style={{marginTop: 4, float: "right", paddingRight:20}} onClick={()=>{
                    setIsVisible(!isVisible)
                }}>
                    <span className="avatar-item">
                        <Badge count={10}>
                            <Avatar shape="circle" size="small" icon={<UserOutlined />} />
                        </Badge>
                    </span>
                </div>


            </Col>
            <Col span={4}>
                <span>
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> Username
                </span>
            </Col>
        </Row>
        <Row>
            {
                isVisible && <div>
                <NotificationTabs/>
            </div>
            }
            
        </Row>
        </div>
    )
}

const topBar = {
    backgroundColor: "#ffff"
}