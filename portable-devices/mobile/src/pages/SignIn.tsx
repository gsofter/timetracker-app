/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Form, Item, Input } from 'native-base';
import { Link } from 'react-router-native';
import * as AuthSession from 'expo-auth-session';
import { auth0, AUTH0_DOMAIN, CLIENT_ID } from "../lib/auth0"

const SignIn = () => {

   return (
        <View style={styles.container}>
          <Form>
            <Item last>
              <Input 
              textContentType='emailAddress' 
              keyboardType='email-address' 
              placeholder="Email" />
            </Item>
            <Item last>
              <Input 
              textContentType='password' 
              keyboardType='visible-password' 
              placeholder='Password' />
            </Item>
            <Button style={styles.marginTop20} info block>
              <Text style={styles.colorWhite}>SignIn</Text>
            </Button>
          </Form>
          <View style={styles.direction_row}>
            <Text>
              Don't have an account?{'  '}
            </Text>
            <Link to="/sign-up" underlayColor="#f0f4f7">
              <Text>SignUp</Text>
            </Link>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20
    },
    marginTop20: {
      marginTop: 20
    },
    colorWhite: {
      color: 'white'
    },
    direction_row: {
      flexDirection: 'row',
      alignItems: 'center'
    }
})

export default SignIn;