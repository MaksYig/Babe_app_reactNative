import React from 'react';
import { Text, VStack } from 'native-base';
import { ScrollView } from 'react-native';
import MedCard from '../components/MedCard/MedCard';

function General_Pet_Med_Screen(props) {
  const pet = props.route.params.pet;

  return (
    <ScrollView>
      <VStack space={2}>
        {pet.pet_med
          .filter((type) => type.med_type == 'vaccination')
          .map((med, index) => (
            <MedCard key={index} med={med} pet={pet} {...props} />
          ))}
      </VStack>
    </ScrollView>
  );
}

export default General_Pet_Med_Screen;
