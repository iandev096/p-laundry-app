import React, { useContext, useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { ThemeContext } from 'react-native-elements';
import { HomeBottomTabsParamList } from './home.types';
import { StartScreen } from './StartScreen';
import { OrderTopTabs } from '../Orders/OrderTopTabs';
import { PrepaidTopTabs } from '../Prepaid/PrepaidTopTabs';
import { PricesScreen } from '../Prices/PricesScreen';
import { AccountScreen } from '../Account/AccountScreen';
import { HelpScreen } from '../Help/HelpScreen';
import { AppNavigationProp, AppRouteProp } from '../App/app.types';
import { AuthContext } from '../../store/contexts/Auth/AuthProvider';
import { HeaderRightButton } from '../../UIComponents/HeaderRightButton';

interface HomeBottomTabsProps {
  navigation: AppNavigationProp<'Home'>
  route: AppRouteProp<'Home'>
}

const BottomTabs = createBottomTabNavigator<HomeBottomTabsParamList>();

type HeaderTitle = 'Home' | 'Orders' | 'Prepaid' | 'Prices' | 'Account' | 'Help';
export const HomeBottomTabs: React.FC<HomeBottomTabsProps> = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);
  const [header, setHeader] = useState<HeaderTitle>('Home');

  useEffect(() => {
    let headerRight: ((props: {
      tintColor?: string | undefined;
    }) => React.ReactNode) | undefined;

    if (header === 'Account') {
      headerRight = () => (<HeaderRightButton
        title='LOGOUT'
        color={theme.colors?.error}
        onPress={() => logout()}
      />);
    }
    navigation.setOptions({
      headerTitle: header,
      headerRight
    });
  }, [header])

  return (
    <BottomTabs.Navigator
      tabBarOptions={{
        activeTintColor: theme.colors?.primary,
        inactiveTintColor: theme.colors?.grey3,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName!: string;

          if (route.name === 'Start') iconName = 'home';
          else if (route.name === 'Orders') iconName = 'list';
          else if (route.name === 'Prepaid') iconName = 'credit-card';
          else if (route.name === 'Prices') iconName = 'tags';
          else if (route.name === 'Account') iconName = 'user-circle';
          else if (route.name === 'Help') iconName = 'comment-o'

          return <FontAwesome name={iconName} size={size} color={color} />
        }
      })}
    >
      <BottomTabs.Screen listeners={
        ({ route, navigation }) => ({
          focus: e => setHeader('Home')
        })}
        name='Start' component={StartScreen}
      />
      <BottomTabs.Screen listeners={
        ({ route, navigation }) => ({
          focus: e => setHeader('Orders')
        })}
        name='Orders' component={OrderTopTabs}
      />
      <BottomTabs.Screen listeners={
        ({ route, navigation }) => ({
          focus: e => setHeader('Prepaid')
        })}
        name='Prepaid' component={PrepaidTopTabs}
      />
      <BottomTabs.Screen listeners={
        ({ route, navigation }) => ({
          focus: e => setHeader('Prices')
        })}
        name='Prices' component={PricesScreen}
      />
      <BottomTabs.Screen listeners={
        ({ route, navigation }) => ({
          focus: e => setHeader('Account')
        })}
        name='Account' component={AccountScreen}
      />
      <BottomTabs.Screen listeners={
        ({ route, navigation }) => ({
          focus: e => setHeader('Help')
        })}
        name='Help'
        component={HelpScreen}
      />
    </BottomTabs.Navigator>
  );
}