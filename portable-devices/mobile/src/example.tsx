import React from "react";
import {View, Text} from "react-native"
import { NativeRouter, Route, Link } from "react-router-native";
import { CalendarScreen, Hello } from "./pages";

const Example = () => {
    return(
        <View>
            <View>
                <Link to="/" underlayColor="#f0f4f7">
                    <Text>Home</Text>
                </Link>
                <Link to="/calendar" underlayColor="#f0f4f7">
                    <Text>Calendar</Text>
                </Link>
                </View>
            <Route exact path="/" component={Hello} />
            <Route path="/calendar" component={CalendarScreen} />
        </View>
    )
}

export default Example