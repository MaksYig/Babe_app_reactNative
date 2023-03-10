import React, { useState, useEffect } from 'react';
import {
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
  MaterialIcons,
} from '@expo/vector-icons';
import PetBreedCard from '../../PetBreedCard/PetBreedCard.js';
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
  Flex,
} from 'native-base';
import dog_breeds from '../../../../assets/Data/dogs_breeds.json';
const PetBreed = ({ handleBreedChange }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [formData, setFormData] = useState({});
  const [calendar, setCalendar] = useState(false);

  const handleValueChange = (newValue) => {
    handleBreedChange(newValue);
  };
  const onCloseModule = () => {
    setModalVisible(false);
  };

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
          <Modal.Header>Choose your Pet Breed</Modal.Header>
          <Modal.Body>
            <HStack
              space={3}
              justifyContent='center'
              flexWrap={'wrap'}
              flexShrink={1}
            >
              {dog_breeds.map((dog, index) => (
                <PetBreedCard
                  key={index}
                  breed={dog.dog_breed}
                  img={dog.dog_breed_img}
                  handleValueChange={handleValueChange}
                  onCloseModule={onCloseModule}
                />
              ))}
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      <VStack space={8} alignItems='center'>
        <Button
          size={'xs'}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          Choose
        </Button>
      </VStack>
    </>
  );
};

export default PetBreed;

const styles = StyleSheet.create({
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});
