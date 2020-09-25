import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ServicesParamList } from './services.type';
import { SelectServicesScreen } from './SelectServicesScreen';
import { AppNavigationProp } from '../App/app.types';

interface ServicesStackProps {
  navigation: AppNavigationProp<'Services'>
}

const Stack = createStackNavigator<ServicesParamList>();

export const ServicesStack: React.FC<ServicesStackProps> = ({ navigation }) => {
  
  return (
    <Stack.Navigator
      initialRouteName='SelectServices'
      headerMode='none'
    >
      <Stack.Screen
        name='SelectServices'
        component={SelectServicesScreen}
      />
    </Stack.Navigator>

  );
}