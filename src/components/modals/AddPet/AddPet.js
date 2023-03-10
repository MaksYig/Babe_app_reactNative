import React, { useState, useEffect } from 'react';
import {
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
  MaterialIcons,
} from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import {
  Modal,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  FormControl,
  IconButton,
  Toast,
  Icon,
  Center,
  NativeBaseProvider,
} from 'native-base';
import DatePickerModule from '../../../components/DatePicker/DatePicker.js';
import PetBreed from '../Pet_Breed/PetBreeds.js';
import { createPet } from '../../../redux/actions/pet.js';

const AddPetModal = ({ user_id }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.user);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [formData, setFormData] = useState({});
  const [calendar, setCalendar] = useState(false);

  const handleValueChange = (newValue) => {
    setFormData({ ...formData, dob: newValue });
  };
  const handleBreedChange = (newValue) => {
    setFormData({ ...formData, pet_breed: newValue });
  };
  console.log(formData);
  useEffect(() => {
    setFormData({ ...formData, owner: user_id });
  }, [modalVisible]);
  const handleSubmit = () => {
    if (formData.owner && formData.dob && formData.pet_breed && formData.name) {
      dispatch(createPet(formData, userData?.token));
      setFormData({});
      setModalVisible(false);
    } else {
      Toast.show({
        title: 'Attention ❗❗❗',
        placement: 'bottom',
        variant: 'solid',
        description: 'Check that you fill all fields 🤷‍♀️',
        duration: 5000,
      });
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
          <Modal.Header>Add new Pet?!</Modal.Header>
          <Modal.Body>
            <FormControl mt='3'>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                isRequired
                onChangeText={(newText) =>
                  setFormData({ ...formData, name: newText })
                }
              />
            </FormControl>
            <FormControl mt='3'>
              <FormControl.Label>Date of birth</FormControl.Label>
              <Input
                isRequired
                isReadOnly={true}
                value={formData.dob}
                InputRightElement={
                  <DatePickerModule handleValueChange={handleValueChange} />
                }
              />
            </FormControl>
            <FormControl mt='3'>
              <FormControl.Label>Breed</FormControl.Label>
              <Input
                isRequired
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
          </Modal.Body>
          <Modal.Footer>
            <Button flex='1' onPress={handleSubmit}>
              ADD NEW PET
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <VStack space={8} alignItems='center'>
        <Button
          w='100%'
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          Add new Pet
        </Button>
      </VStack>
    </>
  );
};

export default AddPetModal;

const styles = StyleSheet.create({
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});
