import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppStackParamList } from './app.types';
import { HomeBottomTabs } from '../Home/HomeBottomTabs';
import { ThemeContext } from 'react-native-elements';
import { ServicesStack } from '../Services/ServicesStack';
import { EditContactDetailsScreen } from '../Account/EditContactDetailsScreen';
import { EditAddressScreen } from '../Account/EditAddressScreen';
import { EditPaymentMethodsScreen } from '../Account/EditPaymentMethodsScreen';
import { AccountContextProvider } from '../../store/contexts/Account/AccountContext';
import { PrepaidContextProvider } from '../../store/contexts/Prepaid/PrepaidContext';
import { OrdersContextProvider } from '../../store/contexts/Orders/OrdersContext';

interface AppStackProps {
}

const Stack = createStackNavigator<AppStackParamList>();

export const AppStack: React.FC<AppStackProps> = ({ }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <AccountContextProvider>
      <PrepaidContextProvider>
        <OrdersContextProvider>
          <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
              headerTitleAlign: 'center',
              headerTintColor: theme.colors?.primary,
            }}>
            <Stack.Screen name='Home' component={HomeBottomTabs} />
            <Stack.Screen name='Services' component={ServicesStack} />
            <Stack.Screen name='EditContact' options={{ headerTitle: 'Edit Contact Details' }} component={EditContactDetailsScreen} />
            <Stack.Screen name='EditAddress' component={EditAddressScreen} />
            <Stack.Screen name='EditPaymentMethods' component={EditPaymentMethodsScreen} />
          </Stack.Navigator>
        </OrdersContextProvider>
      </PrepaidContextProvider>
    </AccountContextProvider>
  );
}