/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Link } from 'react-router-native';

const Dashboard = () => {
   return (
        <View>
          <Text style={styles.text}>Dashboard Screen</Text>
          <Link to="/org/hello" underlayColor="#f0f4f7">
            <Text style={styles.link}>Click here to go to Menu</Text>
          </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        paddingTop: 30,
        textAlign: 'center',
    },
    link: {
        textAlign: 'center',
        color: 'red',
    },
})

export default Dashboard;
