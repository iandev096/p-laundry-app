import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { PrepaidTabsParamList } from './prepaid.types';
import { PrepaidOffersScreen } from './PrepaidOffersScreen';
import { UserPrepaidOffersScreen } from './UserPrepaidOffersScreen';
import theme from '../../constants/theme';

interface PrepaidTopTabsProps {

}

const TopTabs = createMaterialTopTabNavigator<PrepaidTabsParamList>();

export const PrepaidTopTabs: React.FC<PrepaidTopTabsProps> = ({ }) => {
  return (
    <TopTabs.Navigator
      tabBarOptions={{
        activeTintColor: theme.colors?.primary,
        inactiveTintColor: theme.colors?.grey3,
        indicatorStyle: { backgroundColor: theme.colors?.primary }
      }}
    >
      <TopTabs.Screen
        options={{ title: 'Prepaid Offers' }}
        name='PrepaidOffers' component={PrepaidOffersScreen}
      />
      <TopTabs.Screen
        options={{ title: 'My Prepaid Items' }}
        name='UserPrepaidOffers' component={UserPrepaidOffersScreen}
      />
    </TopTabs.Navigator>
  );
}