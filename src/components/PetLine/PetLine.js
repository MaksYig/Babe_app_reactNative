import React, { useState } from 'react';
import {
  VStack,
  Center,
  Button,
  Avatar,
  HStack,
  Flex,
  Text,
  Icon,
} from 'native-base';
import {
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
  MaterialIcons,
  Ionicons,
} from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import UpdatePet from '../modals/UpdatePet/UpdatePet.js';
import { deletPet, getPetInfo } from '../../redux/actions/pet.js';

function PetLine(props) {
  const pet = props.pet;
  const navigation = props.props.navigation;
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.user);
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    dispatch(deletPet(pet.id, userData?.token));
  };

  return (
    <VStack space={3} alignItems='center' paddingTop={7}>
      <Center w='95%' bg='indigo.300' rounded='md' shadow={3} flexShrink={1}>
        <Flex
          direction='row'
          mb='2.5'
          mt='1.5'
          space={1}
          width='100%'
          flexShrink={1}
          justifyContent='space-around'
        >
          <HStack
            justifyContent={'flex-start'}
            marginLeft={5}
            alignItems={'center'}
          >
            <Avatar
              bg='green.500'
              size='lg'
              source={{
                uri: pet?.pet_image1,
              }}
            >
              {'PET'}
            </Avatar>
          </HStack>
          <VStack
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'column'}
          >
            <Text fontSize='md' fontWeight={'semibold'} textAlign={'center'}>
              {pet.name}
            </Text>
            <Text italic fontSize='xs' textAlign={'center'}>
              {pet.pet_breed}
            </Text>
            <Text fontSize='xs' fontWeight={'light'} textAlign={'center'}>
              Age: {pet.age} weeks
            </Text>
          </VStack>
        </Flex>
      </Center>
      <Center w='95%' bg='indigo.200' rounded='md' shadow={3}>
        <HStack justifyContent={'flex-end'}>
          <Button.Group
            space={'2'}
            alignItems={'center'}
            paddingBottom={'5px'}
            paddingTop={'5px'}
          >
            <UpdatePet pet={pet} />
            <Button
              size='xs'
              variant='subtle'
              colorScheme='primary'
              onPress={() =>
                navigation.navigate('Info_page', { pet_id: pet.id })
              }
            >
              INFORMATION
            </Button>
            <Button
              size='xs'
              variant='subtle'
              colorScheme='primary'
              onPress={() => navigation.navigate('Med_page', { pet: pet })}
              leftIcon={<Icon as={Ionicons} name='medkit' size='xs' />}
            >
              MEDECINE
            </Button>
            <Button
              size='xs'
              variant='subtle'
              colorScheme='secondary'
              onPress={handleDelete}
              leftIcon={<Icon as={Ionicons} name='trash' size='xs' />}
            >
              DELETE
            </Button>
          </Button.Group>
        </HStack>
      </Center>
    </VStack>
  );
}

export default PetLine;
