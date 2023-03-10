import React from 'react';
import {
  Text,
  Center,
  HStack,
  VStack,
  Box,
  Heading,
  Stack,
  Badge,
  Spacer,
  Flex,
  Pressable,
} from 'native-base';

function MedCard(props) {
  return (
    <Box alignItems='center'>
      <Pressable
        w='95%'
        onPress={() =>
          props.navigation.navigate('Med_screen', {
            med: props.med,
            pet: props.pet,
          })
        }
      >
        {({ isHovered, isFocused, isPressed }) => {
          return (
            <Box
              bg={
                isPressed
                  ? 'coolGray.200'
                  : isHovered
                  ? 'coolGray.200'
                  : 'coolGray.100'
              }
              style={{
                transform: [
                  {
                    scale: isPressed ? 0.96 : 1,
                  },
                ],
              }}
              p='5'
              rounded='8'
              shadow={3}
              borderWidth='1'
              borderColor='coolGray.300'
            >
              <HStack alignItems='center'>
                <Badge
                  colorScheme='darkBlue'
                  _text={{
                    color: 'white',
                  }}
                  variant='solid'
                  rounded='4'
                >
                  {props.med.med_type}
                </Badge>
                <Spacer />
                <Text fontSize={10} color='coolGray.800'>
                  Every year
                </Text>
              </HStack>
              <Text
                color='coolGray.800'
                mt='3'
                fontWeight='medium'
                fontSize='xl'
              >
                {props.med.name}
              </Text>
              <Text mt='2' fontSize='sm' color='coolGray.700' numberOfLines={3}>
                {props.med.dscription}
              </Text>
            </Box>
          );
        }}
      </Pressable>
    </Box>
  );
}

export default MedCard;
