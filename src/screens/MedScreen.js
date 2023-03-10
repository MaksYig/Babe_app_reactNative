import React, { useState, useEffect } from 'react';
import {
  Text,
  HStack,
  VStack,
  Button,
  Box,
  Icon,
  Spacer,
  Switch,
  Input,
  FormControl,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { ScrollView } from 'react-native';
import DatePickerModule from '../components/DatePicker/DatePicker.js';
import { useDispatch, useSelector } from 'react-redux';
import { updateMedPetInfo } from '../redux/actions/pet.js';
import { getUserProfile } from '../redux/actions/auth.js';

const MedScreen = (props) => {
  const dispatch = useDispatch();
  const med = props.route.params.med;
  const age = props.route.params.pet.age;
  const pet_id = props.route.params.pet.id;
  const token = useSelector((state) => state?.user?.token);
  const userId = useSelector((state) => state?.user?.user?.id);
  const pet_med = useSelector((state) => state?.user?.profile?.owner_pets);
  const [formData, setFormData] = useState({
    id: med.id,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({ id: med.id });
  }, []);

  const handleValueChange = (newValue) => {
    setFormData({ ...formData, last_shot: newValue });
  };

  const handleSubmit = async () => {
    setLoading(true);
    await dispatch(updateMedPetInfo(formData.id, formData, token));
    await dispatch(getUserProfile(userId, token));
    setLoading(false);
    setFormData({ id: med.id });
  };

  return (
    <ScrollView>
      <Box alignItems='center'>
        <Box
          bg={'coolGray.300'}
          p='5'
          w={'97%'}
          rounded='8'
          shadow={3}
          borderWidth='1'
          borderColor='coolGray.300'
        >
          <Text color='coolGray.800' mt='3' fontWeight='medium' fontSize='xl'>
            {med.name}
          </Text>
          <Text mt='2' italic underline fontSize={'9px'}>
            Description:
          </Text>
          <Text fontSize='sm' color='coolGray.500'>
            {med.dscription}
          </Text>
          <Text mt='2' italic underline fontSize={'9px'}>
            Symptoms:
          </Text>
          <Text fontSize='sm' color='coolGray.500'>
            {med.symptoms}
          </Text>
          <VStack>
            <Text mt='2' italic underline fontSize={'9px'}>
              Shot durations:
            </Text>
            {med.name !== 'Rabies' && (
              <HStack space={3} justifyContent='center' mt={'5px'}>
                <VStack alignItems={'center'}>
                  <Text italic fontSize={'12px'} bold>
                    8 weeks
                  </Text>
                  <Icon
                    as={Ionicons}
                    name='checkmark-circle'
                    color={age < 8 ? 'green.800' : 'gray.800'}
                    size={'md'}
                  />
                </VStack>
                <VStack alignItems={'center'}>
                  <Text italic fontSize={'12px'} bold>
                    12 weeks
                  </Text>
                  <Icon
                    as={Ionicons}
                    name='checkmark-circle'
                    color={age < 12 ? 'green.800' : 'gray.800'}
                    size={'md'}
                  />
                </VStack>
                <VStack alignItems={'center'}>
                  <Text italic fontSize={'12px'} bold>
                    1 year
                  </Text>
                  <Icon
                    as={Ionicons}
                    name='checkmark-circle'
                    color={age < 52 ? 'green.800' : 'gray.800'}
                    size={'md'}
                  />
                </VStack>
                {age && age >= 52 && med.shot_duration && (
                  <VStack alignItems={'center'}>
                    <Text italic fontSize={'12px'} bold>
                      Every {med.shot_duration / 52} year's
                    </Text>
                    <Icon
                      as={Ionicons}
                      name='checkmark-circle'
                      color='green.800'
                      size={'md'}
                    />
                  </VStack>
                )}
              </HStack>
            )}
            {med.name === 'Rabies' && (
              <HStack space={3} justifyContent='center' mt={'5px'}>
                <VStack alignItems={'center'}>
                  <Text italic fontSize={'12px'} bold>
                    12 weeks
                  </Text>
                  <Icon
                    as={Ionicons}
                    name='checkmark-circle'
                    color={age < 12 ? 'green.800' : 'gray.800'}
                    size={'md'}
                  />
                </VStack>
                <VStack alignItems={'center'}>
                  <Text italic fontSize={'12px'} bold>
                    3 year's
                  </Text>
                  <Icon
                    as={Ionicons}
                    name='checkmark-circle'
                    color={age < 52 ? 'green.800' : 'gray.800'}
                    size={'md'}
                  />
                </VStack>
              </HStack>
            )}
          </VStack>
        </Box>
        <Box bg={'coolGray.200'} p='5' w={'97%'} rounded='8' shadow={3}>
          <HStack alignItems='center'>
            <Spacer />
          </HStack>
          <Text color='coolGray.800' mt='3' fontWeight='medium' fontSize='12px'>
            Suggested shot of this Vaccine for your pet (according to your pet
            age) suppose to be around:{' '}
            <Text color='coolGray.800' bold fontWeight='medium' fontSize='10px'>
              {moment(med.suggest_shot).format('DD/MM/YYYY')}
            </Text>
          </Text>
          <HStack space={1}>
            <HStack w='50%'>
              <FormControl mt='3'>
                <FormControl.Label>Last Shot:</FormControl.Label>
                <Input
                  isReadOnly={true}
                  defaultValue={med.last_shot}
                  value={formData.last_shot}
                  InputRightElement={
                    <DatePickerModule handleValueChange={handleValueChange} />
                  }
                />
              </FormControl>
            </HStack>
            <HStack w='50%'>
              <FormControl mt='3'>
                <FormControl.Label>Next Shot will be on:</FormControl.Label>
                <Input
                  isReadOnly={true}
                  defaultValue={med.next_shot}
                  value={med.next_shot}
                />
              </FormControl>
            </HStack>
          </HStack>
          <HStack mt={2} alignItems={'center'} justifyContent='center'>
            <Text>
              {formData.notification
                ? 'Notification added:'
                : 'Add notification:'}
            </Text>
            <Switch
              offTrackColor='indigo.100'
              onTrackColor='indigo.200'
              onThumbColor='indigo.500'
              offThumbColor='indigo.50'
              size={'lg'}
              onToggle={() =>
                setFormData({
                  ...formData,
                  notification: !formData?.notification,
                })
              }
              isChecked={formData?.notification}
              defaultIsChecked={med?.notification}
            />
          </HStack>
          <HStack mt={5} pb={5} justifyContent={'center'} w={'100%'}>
            <Button
              isLoading={loading}
              isLoadingText='Updating'
              w={'100%'}
              onPress={handleSubmit}
            >
              Update
            </Button>
          </HStack>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default MedScreen;
