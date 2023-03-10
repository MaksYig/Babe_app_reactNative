import React, { useEffect } from 'react';
import {
  HStack,
  Text,
  Menu,
  Center,
  Pressable,
  Box,
  StatusBar,
  Avatar,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../redux/actions/auth.js';

const Header = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.user);

  useEffect(() => {
    if (!userData?.loggedIn) {
      props.navigation.navigate('Home');
    }
  }, [userData?.loggedIn]);

  const handleSignOut = () => {
    dispatch(signout(userData?.token));
  };
  return (
    <Center>
      <StatusBar bg='#3700B3' barStyle='light-content' />
      <Box safeAreaTop bg='violet.600' />
      <HStack
        bg='violet.800'
        px='1'
        py='3'
        justifyContent='space-between'
        alignItems='center'
        w='100%'
      >
        <HStack alignItems='center'>
          <Text color='white' fontSize='20' fontWeight='bold' marginLeft={5}>
            BABE App
          </Text>
        </HStack>
        <HStack alignItems='center'>
          <Text color='white' fontSize='20' fontWeight='bold' padding={3}>
            {userData?.user?.username}
          </Text>
          <Menu
            w='190'
            trigger={(triggerProps) => {
              return (
                <Pressable
                  accessibilityLabel='More options menu'
                  {...triggerProps}
                >
                  <Avatar
                    bg='amber.500'
                    source={{
                      uri: userData?.profile?.profile_picture,
                    }}
                    size='md'
                  >
                    {userData?.user?.username}
                  </Avatar>
                </Pressable>
              );
            }}
          >
            <Menu.Item>Profile</Menu.Item>
            <Menu.Item onPress={handleSignOut}>SignOut</Menu.Item>
          </Menu>
        </HStack>
      </HStack>
    </Center>
  );
};

export default Header;
