import React, { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import { VStack } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import AddPetModal from '../components/modals/AddPet/AddPet.js';
import PetLine from '../components/PetLine/PetLine.js';

const MainScreen = (props) => {
  const userData = useSelector((state) => state?.user);
  const pets = userData?.profile?.owner_pets;
  return (
    <Fragment>
      <VStack paddingTop={3}>
        <AddPetModal user_id={userData?.user?.id} />
      </VStack>
      {pets &&
        pets?.length > 0 &&
        pets?.map((pet) => {
          return <PetLine pet={pet} key={pet.id} props={props} />;
        })}
    </Fragment>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default MainScreen;
