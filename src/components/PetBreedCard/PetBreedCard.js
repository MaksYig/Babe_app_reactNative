import React from 'react';
import {
  Text,
  Center,
  Image,
  Pressable,
  HStack,
  VStack,
  ZStack,
  AspectRatio,
} from 'native-base';

function PetBreedCard({ breed, img, handleValueChange, onCloseModule }) {
  const handlePress = () => {
    handleValueChange(breed);
    onCloseModule();
  };

  return (
    <Center margin={'5px'}>
      <Pressable
        onPress={handlePress}
        rounded='2'
        overflow='hidden'
        borderWidth='1'
        borderColor='coolGray.300'
        width='110px'
        height='120px'
        shadow='3'
        bg='coolGray.100'
      >
        <HStack alignItems='center'>
          <Image
            source={{
              uri: img,
            }}
            alt={breed}
            size='xl'
          />
        </HStack>
      </Pressable>
      <Text fontSize='xs' italic>
        {breed}
      </Text>
    </Center>
  );
}

export default PetBreedCard;
