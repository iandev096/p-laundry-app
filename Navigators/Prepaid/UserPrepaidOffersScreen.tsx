import React from 'react';
import { View, Text } from 'react-native';
import { Screen } from '../../UIComponents/Screen';
import { Center } from '../../UIComponents/Center';
import { NormalText } from '../../UIComponents/NormalText';

interface UserPrepaidOffersScreenProps {

}

export const UserPrepaidOffersScreen: React.FC<UserPrepaidOffersScreenProps> = ({ }) => {
  return (
    <Screen>
      <Center>
        <NormalText>User Prepaid Offers Screen</NormalText>
      </Center>
    </Screen>
  );
}