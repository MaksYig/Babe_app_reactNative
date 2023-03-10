import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  Text,
  Stack,
  Heading,
  Center,
  IconButton,
  Icon,
  Box,
  HStack,
  AspectRatio,
  Image,
  VStack,
} from 'native-base';
import moment from 'moment';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPetInfo } from '../redux/actions/pet.js';

function InfoPage(props) {
  const dispatch = useDispatch();
  const pet_id = props.route.params.pet_id;
  const petData = useSelector((state) => state.pet?.pet_info);

  useEffect(() => {
    dispatch(getPetInfo(pet_id));
  }, [pet_id]);

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
          <HStack
            justifyContent={'space-between'}
            padding={'5px'}
            alignItems={'center'}
          >
            <HStack w={'50%'} space={1}>
              <Text fontSize='8' fontWeight={'200'}>
                Last Update:
              </Text>
              <Text fontSize='8' fontWeight={'300'}>
                {moment(petData?.last_updated).format('MM/DD/YYYY-HH:mm')}
              </Text>
            </HStack>
            <HStack w={'50%'} justifyContent={'flex-end'} space={1}>
              <IconButton
                icon={<Icon as={Ionicons} name='share' />}
                _icon={{
                  color: 'violet.400',
                  size: 'sm',
                }}
              />
              <IconButton
                icon={<Icon as={Ionicons} name='save' />}
                _icon={{
                  color: 'violet.400',
                  size: 'sm',
                }}
              />
            </HStack>
          </HStack>
          <HStack
            space={1}
            alignItems={'center'}
            justifyContent={'center'}
            paddingTop={'5px'}
          >
            <AspectRatio w={'30%'} ratio={3 / 3}>
              <Image
                source={{
                  uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                }}
                alt='image'
              />
            </AspectRatio>

            <AspectRatio w='30%' ratio={3 / 3}>
              <Image
                source={{
                  uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                }}
                alt='image'
              />
            </AspectRatio>
            <AspectRatio w='30%' ratio={3 / 3}>
              <Image
                source={{
                  uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                }}
                alt='image'
              />
            </AspectRatio>
          </HStack>
          <Stack p='4' space={3}>
            <Stack space={2}>
              <Heading size='md' textAlign={'center'} color={'gray.500'}>
                {petData?.name}'s' Information:
              </Heading>
              <VStack>
                <HStack w={'90%'} justifyContent={'flex-start'}>
                  <Text
                    fontSize='10px'
                    _light={{
                      color: 'violet.600',
                    }}
                    _dark={{
                      color: 'violet.400',
                    }}
                    fontWeight='300'
                    ml='-0.5'
                    mt='0.5'
                  >
                    Pet's Breed:
                  </Text>
                  <Text
                    fontSize='xs'
                    _light={{
                      color: 'violet.500',
                    }}
                    _dark={{
                      color: 'violet.400',
                    }}
                    fontWeight='500'
                    ml='1.5'
                    mt='0'
                  >
                    {petData?.pet_breed}
                  </Text>
                </HStack>
                <HStack w={'90%'} justifyContent={'flex-start'}>
                  <Text
                    fontSize='10px'
                    _light={{
                      color: 'violet.600',
                    }}
                    _dark={{
                      color: 'violet.400',
                    }}
                    fontWeight='300'
                    ml='-0.5'
                    mt='0.5'
                  >
                    Pet's Age:
                  </Text>
                  <Text
                    fontSize='xs'
                    _light={{
                      color: 'violet.500',
                    }}
                    _dark={{
                      color: 'violet.400',
                    }}
                    fontWeight='500'
                    ml='1.5'
                    mt='0'
                  >
                    {petData?.age}
                  </Text>
                </HStack>
                <HStack w={'90%'} justifyContent={'flex-start'}>
                  <Text
                    fontSize='10px'
                    _light={{
                      color: 'violet.600',
                    }}
                    _dark={{
                      color: 'violet.400',
                    }}
                    fontWeight='300'
                    ml='-0.5'
                    mt='0.5'
                  >
                    Pet's Color:
                  </Text>
                  <Text
                    fontSize='xs'
                    _light={{
                      color: 'violet.500',
                    }}
                    _dark={{
                      color: 'violet.400',
                    }}
                    fontWeight='500'
                    ml='1.5'
                    mt='0'
                  >
                    {petData?.pet_color}
                  </Text>
                </HStack>
                <HStack w={'90%'} justifyContent={'flex-start'}>
                  <Text
                    fontSize='10px'
                    _light={{
                      color: 'violet.600',
                    }}
                    _dark={{
                      color: 'violet.400',
                    }}
                    fontWeight='300'
                    ml='-0.5'
                    mt='0.5'
                  >
                    Pet's Gender:
                  </Text>
                  <Text
                    fontSize='xs'
                    _light={{
                      color: 'violet.500',
                    }}
                    _dark={{
                      color: 'violet.400',
                    }}
                    fontWeight='500'
                    ml='1.5'
                    mt='0'
                  >
                    {petData?.pet_gender?.toUpperCase()}
                  </Text>
                </HStack>
                <HStack w={'90%'} justifyContent={'flex-start'}>
                  <Text
                    fontSize='10px'
                    _light={{
                      color: 'violet.600',
                    }}
                    _dark={{
                      color: 'violet.400',
                    }}
                    fontWeight='300'
                    ml='-0.5'
                    mt='0.5'
                  >
                    Pet's Chip Number:
                  </Text>
                  <Text
                    fontSize='xs'
                    _light={{
                      color: 'violet.500',
                    }}
                    _dark={{
                      color: 'violet.400',
                    }}
                    fontWeight='500'
                    ml='1.5'
                    mt='0'
                  >
                    {petData?.chip_num}
                  </Text>
                </HStack>
                <HStack
                  w={'100%'}
                  justifyContent={'flex-start'}
                  flexWrap='wrap'
                >
                  <Text
                    fontSize='10px'
                    _light={{
                      color: 'violet.600',
                    }}
                    _dark={{
                      color: 'violet.400',
                    }}
                    fontWeight='300'
                    ml='-0.5'
                    mt='0.5'
                  >
                    Pet's Description:
                  </Text>
                  <Text
                    fontSize='11'
                    _light={{
                      color: 'violet.500',
                    }}
                    _dark={{
                      color: 'violet.500',
                    }}
                    fontWeight='500'
                    ml='1.5'
                    mt='0'
                  >
                    {petData?.pet_disc}
                  </Text>
                </HStack>
              </VStack>
              <Heading size='md' color={'gray.500'} textAlign={'center'}>
                {petData?.name}'s' owner Information:
              </Heading>
              <VStack space={1}>
                <HStack w={'90%'} justifyContent={'flex-start'}>
                  <Text
                    fontSize='10px'
                    _light={{
                      color: 'violet.600',
                    }}
                    _dark={{
                      color: 'violet.400',
                    }}
                    fontWeight='300'
                    ml='-0.5'
                    mt='0.5'
                  >
                    Owner Name:
                  </Text>
                  <Text
                    fontSize='xs'
                    _light={{
                      color: 'violet.500',
                    }}
                    _dark={{
                      color: 'violet.400',
                    }}
                    fontWeight='500'
                    ml='1.5'
                    mt='0'
                  >
                    {petData?.owner?.f_name} {petData?.owner?.l_name}
                  </Text>
                </HStack>
                <HStack w={'90%'} justifyContent={'flex-start'}>
                  <Text
                    fontSize='10px'
                    _light={{
                      color: 'violet.600',
                    }}
                    _dark={{
                      color: 'violet.400',
                    }}
                    fontWeight='300'
                    ml='-0.5'
                    mt='0.5'
                  >
                    Phone:
                  </Text>
                  <Text
                    fontSize='xs'
                    _light={{
                      color: 'violet.500',
                    }}
                    _dark={{
                      color: 'violet.400',
                    }}
                    fontWeight='500'
                    ml='1.5'
                    mt='0'
                  >
                    {petData?.owner?.phone}
                  </Text>
                </HStack>
                <HStack w={'90%'} justifyContent={'flex-start'}>
                  <Text
                    fontSize='10px'
                    _light={{
                      color: 'violet.600',
                    }}
                    _dark={{
                      color: 'violet.400',
                    }}
                    fontWeight='300'
                    ml='-0.5'
                    mt='0.5'
                  >
                    Email:
                  </Text>
                  <Text
                    fontSize='xs'
                    _light={{
                      color: 'violet.500',
                    }}
                    _dark={{
                      color: 'violet.400',
                    }}
                    fontWeight='500'
                    ml='1.5'
                    mt='0'
                  >
                    Yigal Maksimov
                  </Text>
                </HStack>
                <HStack>
                  <HStack w={'50%'} justifyContent={'flex-start'}>
                    <Text
                      fontSize='10px'
                      _light={{
                        color: 'violet.600',
                      }}
                      _dark={{
                        color: 'violet.400',
                      }}
                      fontWeight='300'
                      ml='-0.5'
                      mt='0.5'
                    >
                      Country:
                    </Text>
                    <Text
                      fontSize='xs'
                      _light={{
                        color: 'violet.500',
                      }}
                      _dark={{
                        color: 'violet.400',
                      }}
                      fontWeight='500'
                      ml='1.5'
                      mt='0'
                    >
                      {petData?.owner?.country}
                    </Text>
                  </HStack>
                  <HStack w={'50%'} justifyContent={'flex-start'}>
                    <Text
                      fontSize='10px'
                      _light={{
                        color: 'violet.600',
                      }}
                      _dark={{
                        color: 'violet.400',
                      }}
                      fontWeight='300'
                      ml='-0.5'
                      mt='0.5'
                    >
                      City:
                    </Text>
                    <Text
                      fontSize='xs'
                      _light={{
                        color: 'violet.500',
                      }}
                      _dark={{
                        color: 'violet.400',
                      }}
                      fontWeight='500'
                      ml='1.5'
                      mt='0'
                    >
                      {petData?.owner?.city}
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </ScrollView>
  );
}

export default InfoPage;
