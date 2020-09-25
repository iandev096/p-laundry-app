import React, { createContext, useReducer, useState, useCallback, useEffect } from 'react';
import { PrepaidState, PrepaidDispatch } from './prepaid.types';
import { PrepaidReducer } from './prepaid.reducer';
import { PrepaidDispatchMiddleware } from './prepaid.middleware';
import { Alert } from 'react-native';

interface PrepaidContextProps extends PrepaidState {
  dispatch: PrepaidDispatch,
  init: () => Promise<any>,
  isInitializing: boolean
}

const prepaidContextInit: PrepaidContextProps = {
  gold: {
    headline: '',
    label: 'gold',
  },
  silver: {
    headline: '',
    label: 'silver',
  },
  bronze: {
    headline: '',
    label: 'bronze',
  },
  user: {
    gold: undefined,
    silver: undefined,
    bronze: undefined,
  },
  dispatch: () => { },
  init: () => Promise.resolve(),
  isInitializing: false
};

export const PrepaidContext = createContext<PrepaidContextProps>(prepaidContextInit);

export const PrepaidContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(PrepaidReducer, prepaidContextInit);
  const [isInitializing, setIsInitializing] = useState(false);

  const init = useCallback(
    async () => {
      try {
        setIsInitializing(true);
        await PrepaidDispatchMiddleware(dispatch)({ type: 'FETCH_PREPAID_ITEMS' });
        await PrepaidDispatchMiddleware(dispatch)({ type: 'FETCH_USER_PREPAID_ITEMS' });
        setIsInitializing(false);
      } catch (err) {
        setIsInitializing(false);
        Alert.alert('Initialization Error', err.message);
      }
    },
    [PrepaidDispatchMiddleware],
  );

  useEffect(() => {
    if (init) {
      init();
    }
  }, [init]);
  console.log(state);

  return (
    <PrepaidContext.Provider value={{
      dispatch: PrepaidDispatchMiddleware(dispatch),
      isInitializing: isInitializing,
      init: init,
      bronze: state.bronze,
      silver: state.silver,
      gold: state.gold,
      user: state.user
    }}>
      {children}
    </PrepaidContext.Provider>
  );
}
