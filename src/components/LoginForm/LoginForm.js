import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import {
  Center,
  Heading,
  Box,
  HStack,
  FormControl,
  Input,
  Link,
  Button,
  VStack,
  Text,
  Toast,
  Pressable,
  Icon,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { login, signup } from '../../redux/actions/auth.js';
import { setAlert } from '../../redux/actions/alerts.js';
const LoginForm = ({ props }) => {
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);
  const [Login, SetLogin] = useState(true);
  const [isLoading, SetIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const userData = useSelector((state) => state?.user);
  console.log(userData);
  useEffect(() => {
    if (userData?.loggedIn) {
      SetIsLoading(false);
      props.navigation.replace('AllNavigation', {
        screen: 'Main',
      });
    }
  }, [userData?.loggedIn]);

  const toggleFunction = () => {
    SetLogin(!Login);
    setFormData({});
  };
  const handleSubmit = async () => {
    if (Login) {
      SetIsLoading(true);
      if (formData.username && formData.password) {
        await dispatch(login(formData));
        SetIsLoading(false);
      } else {
        SetIsLoading(false);
        Toast.show({
          title: 'Attention ❗❗❗',
          placement: 'bottom',
          variant: 'solid',
          description: 'Check that you fill all fields 🤷‍♀️',
          duration: 5000,
        });
      }
    }
    if (!Login) {
      const mailformat = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
      if (formData.password !== formData.re_password) {
        SetIsLoading(false);
        Toast.show({
          title: 'Attention ❗❗❗',
          placement: 'bottom',
          variant: 'solid',
          description: 'Your password do not match 🤷‍♀️',
          duration: 5000,
        });
      } else if (mailformat.test(formData.email) === false) {
        SetIsLoading(false);
        Toast.show({
          title: 'Attention ❗❗❗',
          placement: 'bottom',
          variant: 'solid',
          description: 'Please enter a valid email adress 🤷‍♀️',
          duration: 5000,
        });
      } else if (!formData.username) {
        SetIsLoading(false);
        Toast.show({
          title: 'Attention ❗❗❗',
          placement: 'bottom',
          variant: 'solid',
          description:
            'Please fill username field. It should be more than 4 characters 🤷‍♀️',
          duration: 5000,
        });
      } else if (!formData.password) {
        SetIsLoading(false);
        Toast.show({
          title: 'Attention ❗❗❗',
          placement: 'bottom',
          variant: 'solid',
          description:
            'Please fill password field. It should be more than 8 characters 🤷‍♀️',
          duration: 5000,
        });
      } else {
        SetIsLoading(true);
        await dispatch(signup(formData));
        SetIsLoading(false);
      }
    }
  };

  return (
    <Center w='100%'>
      <Box safeArea p='2' py='8' w='90%' maxW='290'>
        <Heading
          size='lg'
          fontWeight='600'
          color='coolGray.800'
          _dark={{
            color: 'warmGray.50',
          }}
        >
          Welcome to BABE
        </Heading>
        <Heading
          mt='1'
          _dark={{
            color: 'warmGray.200',
          }}
          color='coolGray.600'
          fontWeight='medium'
          size='xs'
        >
          {Login ? 'Sign in to continue!' : 'Register to continue!'}
        </Heading>

        <VStack space={3} mt='5'>
          <FormControl>
            <FormControl.Label>User Name</FormControl.Label>
            <Input
              onChangeText={(newText) =>
                setFormData({ ...formData, username: newText })
              }
              value={formData.username}
            />
          </FormControl>
          {!Login && (
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                onChangeText={(newText) =>
                  setFormData({ ...formData, email: newText })
                }
                keyboardType={'email-address'}
              />
            </FormControl>
          )}
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type={show ? 'text' : 'password'}
              onChangeText={(newText) =>
                setFormData({ ...formData, password: newText })
              }
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? 'visibility' : 'visibility-off'}
                      />
                    }
                    size={5}
                    mr='2'
                    color='muted.400'
                  />
                </Pressable>
              }
            />
            {Login && (
              <Link
                _text={{
                  fontSize: 'xs',
                  fontWeight: '500',
                  color: 'indigo.500',
                }}
                alignSelf='flex-end'
                mt='1'
              >
                Forget Password?
              </Link>
            )}
          </FormControl>
          {!Login && (
            <FormControl>
              <FormControl.Label>Comfirm Password</FormControl.Label>
              <Input
                type={show ? 'text' : 'password'}
                onChangeText={(newText) =>
                  setFormData({ ...formData, re_password: newText })
                }
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon
                      as={
                        <MaterialIcons
                          name={show ? 'visibility' : 'visibility-off'}
                        />
                      }
                      size={5}
                      mr='2'
                      color='muted.400'
                    />
                  </Pressable>
                }
              />
            </FormControl>
          )}
          <Button
            isLoading={isLoading}
            isLoadingText={Login ? 'Signing IN...' : 'Signing UP...'}
            spinnerPlacement='end'
            mt='2'
            colorScheme='indigo'
            onPress={() => handleSubmit()}
          >
            {Login ? 'Sign In' : 'Sign Up'}
          </Button>
          <HStack mt='6' justifyContent='center'>
            <Text
              fontSize='sm'
              color='coolGray.600'
              marginTop={2}
              _dark={{
                color: 'warmGray.200',
              }}
            >
              {Login ? 'I am a new user' : ' Already have an account'}
            </Text>
            <Button
              onPress={toggleFunction}
              size='sm'
              variant='link'
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
            >
              {Login ? 'Sign Up' : 'Sign In'}
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default LoginForm;
