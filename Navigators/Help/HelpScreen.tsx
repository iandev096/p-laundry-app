import React from 'react';
import { View } from 'react-native';
import { Screen } from '../../UIComponents/Screen';
import { Center } from '../../UIComponents/Center';
import { NormalText } from '../../UIComponents/NormalText';

interface HelpScreenProps {

}

export const HelpScreen: React.FC<HelpScreenProps> = ({}) => {
  return (
    <Screen>
      <Center>
        <NormalText>Help Screen</NormalText>
      </Center>
    </Screen>
  );
}