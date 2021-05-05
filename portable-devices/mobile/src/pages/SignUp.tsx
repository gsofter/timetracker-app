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
import { Button, Form, Item, Input, Spinner } from 'native-base';
import { Link, useHistory } from 'react-router-native';
import {Formik} from 'formik';
import { auth0, dbConnection } from "../lib/auth0";

const SignUp = () => {

  const history = useHistory()
  const[isLoading, setIsLoading] = useState(false)

   return (
        <View style={styles.container}>
          <Formik
          enableReinitialize
          initialValues = {{
            username: 'Muflah',
            email: 'johndoe@gmail.com',
            password: 'fighter',
            confirmPassword: ''
          }}
          onSubmit={(values: any, {setFieldError}) => {
            if(values.password === values.confirmPassword){
              setIsLoading(true)
              auth0.auth
                .createUser({
                  email: values.email,
                  username: values.username,
                  password: values.password,
                  connection: dbConnection,
                })
                .then((res) => {
                  setIsLoading(false)
                  history.replace('/org/timer')
                })
                .catch((error) => {
                  setIsLoading(false)
                  if(error.code === 'invalid_password'){
                    setFieldError('password', error.json.policy)
                  }
                  if(error.code === 'username_exists'){
                    setFieldError('username', error.message)
                  }
                  if(error.code === 'user_exists'){
                    setFieldError('email', error.message)
                  }
                });
            } else{
              setFieldError('confirmPassword', "Password didn't match")
            }
          }}
          >
            {({handleChange, handleSubmit, values, errors}: any) => (
              <Form style={{ justifyContent: 'center' }}>
                <Item last>
                  <Input
                  value={values.username}
                  onChange={handleChange('username')}
                  textContentType='name'
                  placeholder="Username" />
                </Item>
                {errors.username && <Text style={{ color: 'red' }}>{errors.username}</Text>}
                <Item last>
                  <Input 
                  value={values.email}
                  onChange={handleChange('email')}
                  textContentType='emailAddress'
                  keyboardType='email-address'
                  placeholder="Email" />
                </Item>
                {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                <Item last>
                  <Input 
                  secureTextEntry
                  value={values.password}
                  onChange={handleChange('password')}
                  textContentType='password' 
                  placeholder='Password' />
                </Item>
                <View>
                  {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
                </View>
                <Item last>
                  <Input 
                  secureTextEntry
                  value={values.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  textContentType='password' 
                  placeholder='Confirm Password' />
                </Item>
                {errors.confirmPassword && <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>}
                {isLoading ? (
                  <Spinner color='blue' />
                ): (
                  <Button onPress={handleSubmit} style={styles.marginTop20} info block>
                    <Text style={styles.colorWhite}>SignUp</Text>
                  </Button>
                )}
              </Form>
            )}
          </Formik>
          <View style={styles.direction_row}>
            <Text>
              Already have an account?{'  '}
            </Text>
            <Link to="/" underlayColor="#f0f4f7">
              <Text style={styles.linkColor}>SignIn</Text>
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

export default SignUp;