import React, { useState } from 'react';
import {
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
  MaterialIcons,
} from '@expo/vector-icons';
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
  Icon,
  Center,
  NativeBaseProvider,
} from 'native-base';
import moment from 'moment';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';

const DatePickerModule = ({ handleValueChange }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [calendar, setCalendar] = useState(false);

  const handleClose = () => {
    const date = moment(selectedDate, 'YYYY-MM-DD');
    const newDate = moment(date).format('YYYY-MM-DD');
    handleValueChange(newDate);
    setModalVisible(false);
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
          {/*           <Modal.CloseButton /> */}
          <Modal.Body>
            <DatePicker
              mode='calendar'
              onSelectedChange={(newValue) => setSelectedDate(newValue)}
              on
            />
          </Modal.Body>
          <Modal.Footer>
            <Button flex='1' onPress={handleClose}>
              ADD DATE
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <VStack space={8} alignItems='center'>
        <IconButton
          icon={<Icon as={Entypo} name='calendar' />}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        />
      </VStack>
    </>
  );
};

export default DatePickerModule;
