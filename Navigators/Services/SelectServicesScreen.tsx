import React, { useContext, useReducer, useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import { Screen } from '../../UIComponents/Screen';
import { Container } from '../../UIComponents/Container';
import { ThemeContext } from 'react-native-elements';
import { ServiceListItem } from '../../UIComponents/ServiceListItem';
import { CtaBtn } from '../../UIComponents/CtaBtn';
import { selectServiceReducer } from './SelectServicesReducer';
import { ServicesNavigationProp } from './services.type';
import { ContinueModal } from './ContinueModal';
import { Order } from '../../store/contexts/Orders/orders.types';
import { PrepaidContext } from '../../store/contexts/Prepaid/PrepaidContext';
import { PrepaidItem, UserPrepaidItems } from '../../store/contexts/Prepaid/prepaid.types';
import { OrdersContext } from '../../store/contexts/Orders/OrdersContext';

interface SelectServicesScreenProps {
  navigation: ServicesNavigationProp<'SelectServices'>
}

export const SelectServicesScreen: React.FC<SelectServicesScreenProps> = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [selectServiceState, dispatch] = useReducer(selectServiceReducer, {
    washedAndDried: {
      title: 'Washed and Dried Laundry',
      active: false
    },
    dryCleaningIroned: {
      title: 'Dry cleaning and Ironed Laundry',
      active: false
    },
    duvetsAndBulky: {
      title: 'Duvets and Bulky items',
      active: false
    },
    ironingOnly: {
      title: 'Ironing Only',
      active: false
    },
  });
  const [showModal, setShowModal] = useState(false);
  const [userPrepaidItems, setUserPrepaidItems] = useState<UserPrepaidItems>();
  const { user } = useContext(PrepaidContext);
  const ordersCtx = useContext(OrdersContext);

  useEffect(() => {
    setUserPrepaidItems(user);
  }, [user])

  const showModalHandler = useCallback(
    () => {
      const services = Object.values(selectServiceState);
      for (let service of services) {
        if (service.active) {
          setShowModal(true);
          break;
        } else {
          if (service.title === services[services.length - 1].title) {
            Alert.alert('Select Service', 'Please select at least one service');
          }
        }
      }
    },
    [selectServiceState],
  );

  const navigateToHome = () => {
    navigation.navigate('Home');
  }

  return (
    <>
      <ContinueModal
        navigateToHome={navigateToHome}
        theme={theme}
        summary={Object.values(selectServiceState)}
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onContinue={(order: Order) => ordersCtx.dispatch({
          type: 'ADD_ORDER',
          payload: order
        })}
        userPrepaidItems={userPrepaidItems}
      />
      <Screen>
        <Container style={styles.container}>
          <View style={styles.inner}>
            <ServiceListItem
              onPress={() => dispatch({ type: 'TOGGLE_SERVICE', key: 'washedAndDried' })}
              theme={theme}
              exTitle={{
                text: 'Washed and Dried Laundry',
                icon: {
                  name: 'shopping-bag',
                  type: 'font-awesome'
                }
              }}
              subtitle='Everyday laundry. Washed at 30°C. Tumble and dried. '
              active={selectServiceState.washedAndDried.active}
            />
            <ServiceListItem
              onPress={() => dispatch({ type: 'TOGGLE_SERVICE', key: 'dryCleaningIroned' })}
              theme={theme}
              exTitle={{
                text: 'Dry cleaning and Ironed Laundry',
                icon: {
                  name: 'tshirt',
                  type: 'font-awesome-5'
                }
              }}
              subtitle='Dry laundry and ironed. '
              active={selectServiceState.dryCleaningIroned.active}
            />
            <ServiceListItem
              onPress={() => dispatch({ type: 'TOGGLE_SERVICE', key: 'duvetsAndBulky' })}
              theme={theme}
              exTitle={{
                text: 'Duvets and Bulky Items',
                icon: { name: 'ios-bed', type: 'ionicon' }
              }}
              subtitle='Larger items that require a different cleaning process. Up to 72 hours.'
              active={selectServiceState.duvetsAndBulky.active}
            />
            <ServiceListItem
              onPress={() => dispatch({ type: 'TOGGLE_SERVICE', key: 'ironingOnly' })}
              theme={theme}
              exTitle={{
                text: 'Ironing only',
                icon: { name: 'steam', type: 'font-awesome' }
              }}
              subtitle='Items that are already washed.'
              active={selectServiceState.ironingOnly.active}
            />
            <CtaBtn
              containerStyle={{ marginTop: 'auto' }}
              title='CONTINUE'
              onPress={() => { showModalHandler() }}
              theme={theme}
            />
          </View>
        </Container>
      </Screen>
    </>
  );
}

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
  },
  listItemTitle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8
  },
  listItemTitleIcon: {
    marginRight: 6,
  },
  listItemTitleText: {

  },
  modalCard: {

  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalSummary: {
    marginBottom: 20,
  },
  divider: {
    borderBottomWidth: 0.2,
    borderBottomColor: 'grey'
  },
  modalBottomButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30
  },
  modalCancel: {
    marginRight: 9,
    backgroundColor: 'rgba(233, 23, 80, 0.1)'
  },
  modalConfirm: {
    backgroundColor: 'rgba(23, 233, 80, 0.1)'
  },
  pickerContainer: {
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 3
  }
});
