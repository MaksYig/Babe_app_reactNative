import React, { useState } from 'react';
import {
  Text,
  Box,
  HStack,
  VStack,
  Image,
  Avatar,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Button,
  Center,
  AspectRatio,
  Stack,
  Pressable,
  Heading,
  Icon,
  IconButton,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { updateMe } from '../redux/actions/auth.js';
import CountryPickerModal from '../components/modals/CountryPickerModal/CountryPickerModal.js';

function UserProfile() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.user);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const handleCountryChange = (newValue) => {
    setFormData({ ...formData, country: newValue });
  };
  const handleSubmit = async () => {
    if (formData) {
      setLoading(true);
      await dispatch(updateMe(userData?.user?.id, formData, userData.token));
      setLoading(false);
    }
  };
  return (
    <ScrollView>
      <Box alignItems='center'>
        <Box
          width='95%'
          marginTop={'10px'}
          rounded='lg'
          overflow='hidden'
          borderColor='coolGray.200'
          borderWidth='1'
          _dark={{
            borderColor: 'coolGray.600',
            backgroundColor: 'gray.700',
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: 'gray.50',
          }}
        >
          <Heading size='md' textAlign={'center'} color={'gray.500'}>
            {userData?.profile?.f_name
              ? userData?.profile?.f_name
              : userData?.user?.username}{' '}
            profile information:
          </Heading>
          <HStack
            space={1}
            alignItems={'center'}
            justifyContent={'center'}
            paddingTop={'5px'}
          >
            <Pressable
              w='100%'
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              onPress={() => console.log('Press avatar')}
            >
              <AspectRatio w={'30%'} ratio={3 / 3}>
                <Image
                  source={{
                    uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                  }}
                  alt='image'
                />
              </AspectRatio>
            </Pressable>
          </HStack>
          <Stack p='4' space={3}>
            <Stack space={2}>
              <VStack space={1}>
                <HStack space={1}>
                  <FormControl mt='2' w={'50%'}>
                    <FormControl.Label>First Name:</FormControl.Label>
                    <Input
                      defaultValue={userData?.profile?.f_name}
                      value={formData.f_name}
                      size='md'
                      onChangeText={(newText) =>
                        setFormData({ ...formData, f_name: newText })
                      }
                    />
                  </FormControl>
                  <FormControl mt='2' w={'50%'}>
                    <FormControl.Label>Last Name:</FormControl.Label>
                    <Input
                      defaultValue={userData?.profile?.l_name}
                      value={formData.l_name}
                      size='md'
                      onChangeText={(newText) =>
                        setFormData({ ...formData, l_name: newText })
                      }
                    />
                  </FormControl>
                </HStack>
                <FormControl mt='2'>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input
                    defaultValue={userData?.user?.email}
                    value={formData.email}
                    keyboardType='email-address'
                    size='md'
                    onChangeText={(newText) =>
                      setFormData({ ...formData, email: newText })
                    }
                  />
                </FormControl>
                <FormControl mt='2'>
                  <FormControl.Label>Phone</FormControl.Label>
                  <Input
                    defaultValue={userData?.profile?.phone}
                    value={formData.phone}
                    size='md'
                    type='number'
                    keyboardType='number-pad'
                    onChangeText={(newText) =>
                      setFormData({
                        ...formData,
                        phone: `${newText}`,
                      })
                    }
                  />
                </FormControl>
                <FormControl mt='2' w={'100%'}>
                  <FormControl.Label>Country</FormControl.Label>
                  <Input
                    defaultValue={userData?.profile?.country}
                    value={formData.country}
                    isReadOnly
                    InputRightElement={
                      <CountryPickerModal
                        handleCountryChange={handleCountryChange}
                      />
                    }
                    size='md'
                    onChangeText={(newText) => console.log('formData')}
                  />
                </FormControl>
                <FormControl mt='2' w={'100%'}>
                  <FormControl.Label>City</FormControl.Label>
                  <Input
                    defaultValue={userData?.profile?.city}
                    value={formData.city}
                    size='md'
                    onChangeText={(newText) =>
                      setFormData({ ...formData, city: newText })
                    }
                  />
                </FormControl>
              </VStack>
            </Stack>
          </Stack>
          <HStack pb={5} justifyContent={'center'}>
            <Button
              isLoading={loading}
              isLoadingText='Updating...'
              onPress={handleSubmit}
            >
              Update User Information
            </Button>
          </HStack>
        </Box>
      </Box>
    </ScrollView>
  );
}

export default UserProfile;
