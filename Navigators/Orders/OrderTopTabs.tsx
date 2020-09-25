import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { OrderTabsParamList } from './order.types';
import { OrdersScreen } from './OrdersScreenFactory';
import { ThemeContext } from 'react-native-elements';

interface OrderTopTabsProps {

}

const TopTabs = createMaterialTopTabNavigator<OrderTabsParamList>();

export const OrderTopTabs: React.FC<OrderTopTabsProps> = ({ }) => {
  const {theme} = useContext(ThemeContext);

  return (
    <TopTabs.Navigator
      tabBarOptions={{
        activeTintColor: theme.colors?.primary,
        inactiveTintColor: theme.colors?.grey3,
        indicatorStyle: { backgroundColor: theme.colors?.primary }
      }}
    >
      <TopTabs.Screen
        options={{ title: 'Active Orders' }}
        initialParams={{mode: 'active'}}
        name='ActiveOrders'
        component={OrdersScreen}
        // component={OrdersScreen('active')}
      />
      <TopTabs.Screen
        options={{ title: 'Completed Orders' }}
        initialParams={{mode: 'completed'}}
        name='CompletedOrders'
        component={OrdersScreen}
        // component={OrdersScreen('completed')} 
        />
        <TopTabs.Screen
          options={{ title: 'Cancelled Orders' }}
          initialParams={{mode: 'cancelled'}}
          name='CancelledOrders'
          component={OrdersScreen}
          // component={OrdersScreen('completed')} 
          />
    </TopTabs.Navigator>
  );
}