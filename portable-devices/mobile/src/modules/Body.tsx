/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React from "react";
import {Text, Container} from "native-base";
import {StyleSheet} from "react-native";
import MainHeader from "./Header";

const Body = ({ match }: any) => {
    return (
        <Container>
            <Text style={styles.topic}>{match.params.topicId}</Text>
        </Container>
    )
}

const styles = StyleSheet.create({
    topic:{
        textAlign: 'center',
        fontSize: 15,
    }
})

export default Body;