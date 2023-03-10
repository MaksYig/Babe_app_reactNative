import React from 'react';
import {
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
  MaterialIcons,
} from '@expo/vector-icons';
import { Box, HStack, Pressable, Center, Icon, Text } from 'native-base';

const Footer = (props) => {
  const [selected, setSelected] = React.useState(0);
  const MainNav = () => {
    setSelected(0);
    props.navigation.navigate('Main');
  };
  const ProfNav = () => {
    setSelected(3);
    props.navigation.navigate('Profile');
  };
  return (
    <Box bg='white' safeAreaTop width='100%' alignSelf='center'>
      <HStack bg='indigo.600' alignItems='center' safeAreaBottom shadow={6}>
        <Pressable
          cursor='pointer'
          opacity={selected === 0 ? 1 : 0.5}
          py='3'
          flex={1}
          onPress={MainNav}
        >
          <Center>
            <Icon
              mb='1'
              as={
                <MaterialCommunityIcons
                  name={selected === 0 ? 'home' : 'home-outline'}
                />
              }
              color='white'
              size='sm'
            />
            <Text color='white' fontSize='12'>
              Home
            </Text>
          </Center>
        </Pressable>
        {/* <Pressable
          cursor='pointer'
          opacity={selected === 1 ? 1 : 0.5}
          py='2'
          flex={1}
          onPress={() => props.navigation.navigate('Main')}
        >
          <Center>
            <Icon
              mb='1'
              as={<MaterialIcons name='map' />}
              color='white'
              size='sm'
            />
            <Text color='white' fontSize='12'>
              Map
            </Text>
          </Center>
        </Pressable> */}
        {/* <Pressable
          cursor='pointer'
          opacity={selected === 2 ? 1 : 0.6}
          py='2'
          flex={1}
          onPress={() => setSelected(2)}
        >
          <Center>
            <Icon
              mb='1'
              as={
                <MaterialCommunityIcons
                  name={selected === 2 ? 'cart' : 'cart-outline'}
                />
              }
              color='white'
              size='sm'
            />
            <Text color='white' fontSize='12'>
              Cart
            </Text>
          </Center>
        </Pressable> */}
        <Pressable
          cursor='pointer'
          opacity={selected === 3 ? 1 : 0.5}
          py='2'
          flex={1}
          onPress={ProfNav}
        >
          <Center>
            <Icon
              mb='1'
              as={
                <MaterialCommunityIcons
                  name={selected === 3 ? 'account' : 'account-outline'}
                />
              }
              color='white'
              size='sm'
            />
            <Text color='white' fontSize='12'>
              Profile
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  );
};

export default Footer;
