import React from 'react';
import {
  Center,
  Button,
  VStack,
  useToast,
  HStack,
  Text,
  Alert,
  AlertDialog,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';

const AlertMsg = ({ title, type, msg }) => {
  const toast = useToast();
  const alerts = useSelector((state) => state?.alerts);

  const ToastDetails = {
    title: 'Something went wrong',
    status: 'success',
    description: 'Please create a support ticket from the support page',
  };
  return (
    <AlertDialog
      isOpen
      maxWidth='100%'
      alignSelf='center'
      flexDirection='row'
      status={type ? type : 'error'}
      variant='subtle'
    >
      <VStack space={1} flexShrink={1} w='100%'>
        <HStack
          flexShrink={1}
          alignItems='center'
          justifyContent='space-between'
        >
          <HStack space={2} flexShrink={1} alignItems='center'>
            <Alert.Icon />
            <Text
              fontSize='md'
              fontWeight='medium'
              flexShrink={1}
              color='darkText'
            >
              {title}
            </Text>
          </HStack>
        </HStack>
        <Text px='6' color={'darkText'}>
          {msg}
        </Text>
      </VStack>
    </AlertDialog>
  );
};

export default AlertMsg;
