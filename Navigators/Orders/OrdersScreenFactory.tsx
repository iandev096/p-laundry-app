import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Screen } from '../../UIComponents/Screen';
import { Container } from '../../UIComponents/Container';
import { ListItem } from 'react-native-elements';
import { OrderRouteProp, OrderNavigationProp } from './order.types';
import { OrdersContext } from '../../store/contexts/Orders/OrdersContext';
import { Order } from '../../store/contexts/Orders/orders.types';

interface OrdersScreenProps {
  route: OrderRouteProp<'ActiveOrders' | 'CancelledOrders' | 'CompletedOrders'>,
  navigation: OrderNavigationProp
}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({ route, navigation }) => {
  const [mode, setMode] = useState<'active' | 'completed' | 'cancelled'>();
  useEffect(() => {
    if (route.name === 'ActiveOrders'){
      setMode('active');
    } else if (route.name === 'CompletedOrders') {
      setMode('completed');
    } else {
      setMode('cancelled');
    }
  }, [route.name]);

  const { orders } = useContext(OrdersContext);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>();
  useEffect(() => {
    if (mode === 'active') {
      setFilteredOrders(orders.filter(
        order => order.cancelled === false && order.completed === false
      ))
    } else if (mode === 'cancelled') {
      setFilteredOrders(orders.filter(
        order => order.cancelled === true && order.completed === false
      ))
    } else {
      setFilteredOrders(orders.filter(
        order => order.completed === true
      ))
    }
  }, [orders, mode, setFilteredOrders]);
  console.log('[mode]', mode);
  console.log('[orders]', orders);
  return (
    <Screen>
      <Container style={styles.container}>
        <View style={styles.inner}>
          {filteredOrders && filteredOrders.map(order => (
            <ListItem
              key={order.orderNumber} 
              title={`NO. ${order.orderNumber}`}
              rightTitle={order.cost ? `GHC${order.cost}` : 'GHC N/A'}
              subtitle={`${order.services[0]}...`}
              containerStyle={styles.listItem}
            />
          ))}
        </View>
      </Container>
    </Screen>
  );
}

/* export function OrderScreenFacatory(orderType: 'active' | 'completed') {
  const OrdersScreen: React.FC<OrdersScreenProps> = ({ }) => {

    return (
      <Screen>
        <Container style={styles.container}>
          <View style={styles.inner}>
            <ListItem 
              title='ORDER NO. 1232 9033 4400'
              rightTitle='GH$21'
              subtitle='5kg clothing...'
              bottomDivider={true}
            />
            <ListItem 
              title='ORDER NO. 1232 9033 4400'
              rightTitle='GH$21'
              subtitle='5kg clothing...'
            />
          </View>
        </Container>
      </Screen>
    );
  }

  return OrdersScreen;
} */


const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    minHeight: Dimensions.get('window').height - 50,
  },
  inner: {
    width: '100%',
    height: '100%',
  },
  listItem: {
    marginBottom: 5
  }
});
