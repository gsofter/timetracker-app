import React,{useState} from 'react';
import { Avatar, Badge, Row, Col, Tabs} from 'antd';
import { UserOutlined } from '@ant-design/icons';


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