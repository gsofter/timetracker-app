/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'native-base';
import { Link } from 'react-router-native';
import * as AuthSession from 'expo-auth-session';
import { AUTH0_DOMAIN, CLIENT_ID } from "../lib/auth0"

const Dashboard = () => {

  const handleLogin = async () => {
    const redirectUrl = AuthSession.getRedirectUrl();
    const authUrl =
      `${AUTH0_DOMAIN}/authorize${ 
      toQueryString({
        client_id: CLIENT_ID,
        response_type: 'token',
        scope: 'openid name',
        redirect_uri: redirectUrl,
      })}`;
    const result = await AuthSession.startAsync({ authUrl })
  }

   return (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.text}>Dashboard Screen</Text>
          <Link to="/org/timer" underlayColor="#f0f4f7">
            <Text style={styles.link}>Click here to go to Menu</Text>
          </Link>
          <Button info style={{ alignSelf: 'center' }} onPress={() => handleLogin()}>
            <Text style={styles.button_text}>Login</Text>
          </Button>
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
    button_text:{
      paddingLeft: 10,
      paddingRight: 10,
      color: 'white'
    },
})

export default Dashboard;
function toQueryString(params: any) {
  return (
    '?' +
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&')
  );
}