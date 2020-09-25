import React, { createContext, useReducer, useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { OrdersState, OrdersDispatch } from './orders.types';
import { OrdersReducer } from './orders.reducer';
import { OrdersDispatchMiddleware } from './orders.middleware';

interface OrdersContextProps extends OrdersState {
  dispatch: OrdersDispatch,
  init: () => Promise<any>,
  isInitializing: boolean
}

const orderContextInit: OrdersContextProps = {
  orders: [],
  dispatch: () => { },
  init: () => Promise.resolve(),
  isInitializing: false
}

export const OrdersContext = createContext<OrdersContextProps>(orderContextInit);

export const OrdersContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(OrdersReducer, orderContextInit);
  const [isInitializing, setIsInitializing] = useState(false);

  // initialization
  const init = useCallback(async () => {
    try {
      setIsInitializing(true);
      await OrdersDispatchMiddleware(dispatch)({ type: 'FETCH_ORDERS' });
      setIsInitializing(false);
    } catch (err) {
      setIsInitializing(false);
      Alert.alert('Initialization Error', err.message);
    }
  }, [OrdersDispatchMiddleware]);
  useEffect(() => {
    init();
  }, [init]);

  return (
    <OrdersContext.Provider value={{
      dispatch: OrdersDispatchMiddleware(dispatch),
      isInitializing: isInitializing,
      init: init,
      orders: state.orders,
    }}>
      {children}
    </OrdersContext.Provider>
  );
}
