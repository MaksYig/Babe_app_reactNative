import React, { useState } from 'react';
import {
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
  MaterialIcons,
  Ionicons,
} from '@expo/vector-icons';
import { StyleSheet, PermissionsAndroid } from 'react-native';
import {
  Modal,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  Avatar,
  FormControl,
  IconButton,
  TextArea,
  Radio,
  Stack,
  Icon,
  Center,
  Pressable,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { updatePet } from '../../../redux/actions/pet.js';
import DatePickerModule from '../../../components/DatePicker/DatePicker.js';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import PetBreed from '../Pet_Breed/PetBreeds.js';

const UpdatePet = ({ pet }) => {
  const userData = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [formData, setFormData] = useState({});
  const [singleFile, setSingleFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const options = {};

  const handleIMG = async () => {
    const result = await launchCamera(options, (result) => console.log(result));
    console.log(result);
  };

  const handleBreedChange = (newValue) => {
    setFormData({ ...formData, pet_breed: newValue });
  };
  const handleValueChange = (newValue) => {
    setFormData({ ...formData, dob: newValue });
  };
  const handleSubmit = async () => {
    if (formData) {
      setLoading(true);
      await dispatch(updatePet(pet.id, formData, userData?.token));
      setFormData({});
      setModalVisible(false);
      setLoading(false);
    }
  };
  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        avoidKeyboard
        justifyContent='center'
        bottom='4'
        size='lg'
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Update your Pet</Modal.Header>
          <Modal.Body>
            <Text textAlign={'center'}>Update {pet.name}'s information'</Text>
            <Text textAlign={'center'} fontSize='xs' fontWeight={'light'}>
              {pet.name}'s age is: {pet.age} weeks
            </Text>
            <FormControl mt='3'>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                defaultValue={pet.name}
                size='md'
                onChangeText={(newText) =>
                  setFormData({ ...formData, name: newText })
                }
              />
            </FormControl>
            <FormControl mt='3'>
              <FormControl.Label>Date of birth</FormControl.Label>
              <Input
                isReadOnly={true}
                defaultValue={pet.dob}
                value={formData.dob}
                InputRightElement={
                  <DatePickerModule handleValueChange={handleValueChange} />
                }
              />
            </FormControl>
            <FormControl mt='3'>
              <FormControl.Label>Breed</FormControl.Label>
              <Input
                defaultValue={pet.pet_breed}
                isReadOnly={true}
                value={formData.pet_breed}
                InputRightElement={
                  <PetBreed handleBreedChange={handleBreedChange} />
                }
                onChangeText={(newText) =>
                  setFormData({ ...formData, pet_breed: newText })
                }
              />
            </FormControl>
            <FormControl mt='3'>
              <FormControl.Label>Color</FormControl.Label>
              <Input
                defaultValue={pet.pet_color}
                size='md'
                onChangeText={(newText) =>
                  setFormData({ ...formData, pet_color: newText })
                }
              />
            </FormControl>
            <FormControl mt='3'>
              <FormControl.Label>Chip Number</FormControl.Label>
              <Input
                size='md'
                defaultValue={pet.chip_num}
                onChangeText={(newText) =>
                  setFormData({ ...formData, chip_num: newText })
                }
              />
            </FormControl>
            <FormControl mt='3'>
              <FormControl.Label>Pet Description</FormControl.Label>
              <TextArea
                defaultValue={pet.pet_disc}
                onChangeText={(text) =>
                  setFormData({ ...formData, pet_disc: text })
                }
                w='100%'
              />
            </FormControl>
            <FormControl mt='3'>
              <FormControl.Label>Gender</FormControl.Label>
              <Radio.Group
                name='exampleGroup'
                defaultValue={pet.pet_gender}
                accessibilityLabel='pick a size'
                onChange={(value) =>
                  setFormData({ ...formData, pet_gender: value })
                }
              >
                <Stack
                  direction={{
                    base: 'row',
                    md: 'row',
                  }}
                  alignItems={{
                    base: 'center',
                    md: 'center',
                  }}
                  justifyContent={'center'}
                  space={8}
                  w='100%'
                >
                  <Radio
                    value='male'
                    colorScheme='blue'
                    size='lg'
                    my={1}
                    icon={
                      <Icon
                        as={<MaterialCommunityIcons name='gender-male' />}
                      />
                    }
                  >
                    Male
                  </Radio>
                  <Radio
                    value='female'
                    colorScheme='yellow'
                    size='lg'
                    my={1}
                    icon={
                      <Icon
                        as={<MaterialCommunityIcons name='gender-female' />}
                      />
                    }
                  >
                    Female
                  </Radio>
                </Stack>
              </Radio.Group>
              ;
            </FormControl>
            <FormControl mt='3'>
              <FormControl.Label>Upload Images</FormControl.Label>
              <HStack padding={1} justifyContent={'space-between'}>
                <Pressable
                  onPress={handleIMG}
                  justifyContent='center'
                  alignItems={'center'}
                  display={'flex'}
                >
                  <Avatar
                    bg='cyan.500'
                    alignSelf='center'
                    size='md'
                    source={{
                      uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                    }}
                  >
                    HS
                  </Avatar>
                  <Icon as={Ionicons} name={'cloud-upload'} size='7' />
                </Pressable>
                <Pressable
                  onPress={() => console.log('Pressed on Avatar 2')}
                  justifyContent='center'
                  alignItems={'center'}
                  display={'flex'}
                  uploadButton
                >
                  <Avatar
                    bg='cyan.500'
                    alignSelf='center'
                    size='md'
                    source={{
                      uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                    }}
                  >
                    HS
                  </Avatar>
                  <Icon as={Ionicons} name={'cloud-upload'} size='7' />
                </Pressable>
                <Pressable
                  onPress={() => console.log('Pressed on Avatar 3')}
                  justifyContent='center'
                  alignItems={'center'}
                  display={'flex'}
                >
                  <Avatar
                    bg='cyan.500'
                    alignSelf='center'
                    size='md'
                    source={{
                      uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                    }}
                  >
                    HS
                  </Avatar>
                  <Icon as={Ionicons} name={'cloud-upload'} size='7' />
                </Pressable>
              </HStack>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button
              flex='1'
              onPress={handleSubmit}
              isLoading={loading}
              isLoadingText='Updating...'
            >
              UPDATE PET
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <VStack space={8} alignItems='center'>
        <Button
          size='xs'
          variant='subtle'
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          UPDATE
        </Button>
      </VStack>
    </>
  );
};

export default UpdatePet;

const styles = StyleSheet.create({
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});
