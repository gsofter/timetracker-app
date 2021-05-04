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
import { Formik } from 'formik'
import { auth0, dbConnection } from "../lib/auth0"

const SignIn = () => {

   return (
        <View style={styles.container}>
          <Formik 
          initialValues={{
            email: '',
            password: ''
          }}
          onSubmit={(values: any) => {
            auth0.auth
              .passwordRealm({
                username: values.email,
                password: values.password,
                realm: dbConnection,
              })
              .then(console.log)
              .catch(console.error);
          }}
          >
            {({handleChange, handleSubmit, values}: any) => (
              <Form>
                <Item last>
                  <Input 
                  value={values.email}
                  onChange={handleChange('email')}
                  textContentType='emailAddress' 
                  keyboardType='email-address' 
                  placeholder="Email" />
                </Item>
                <Item last>
                  <Input 
                  secureTextEntry
                  value={values.password}
                  onChange={handleChange('password')}
                  textContentType='password' 
                  keyboardType='visible-password' 
                  placeholder='Password' />
                </Item>
                <Button onPress={handleSubmit} style={styles.marginTop20} info block>
                  <Text style={styles.colorWhite}>SignIn</Text>
                </Button>
              </Form>
            )}
          </Formik>
          <View style={styles.direction_row}>
            <Text>
              Don't have an account?{'  '}
            </Text>
            <Link to="/sign-up" underlayColor="#f0f4f7">
              <Text style={styles.linkColor}>SignUp</Text>
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
      justifyContent: 'center'
    },
    linkColor: {
      color: '#62b1f6'
    }
})

export default SignIn;