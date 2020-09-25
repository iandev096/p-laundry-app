import React, { useState, useCallback } from 'react';
import { PrepaidItem } from '../Orders/order.types';
import { Button, Theme, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import * as Random from 'expo-random';
import { CustomCard } from '../../UIComponents/CustomCard';
import { FeatureText } from '../../UIComponents/FeatureText';
import { NormalText } from '../../UIComponents/NormalText';
import { Picker } from '@react-native-community/picker';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { UserPrepaidItems } from '../../store/contexts/Prepaid/prepaid.types';
import { Order } from '../../store/contexts/Orders/orders.types';

interface ContinueModalProps {
  isVisible: boolean,
  onClose: Function,
  onContinue: (order: Order) => any,
  summary: { title: string, active: boolean }[],
  theme: Theme,
  userPrepaidItems?: UserPrepaidItems,
  navigateToHome: Function
}

export const ContinueModal: React.FC<ContinueModalProps> = ({ isVisible, onClose, userPrepaidItems, onContinue, summary, navigateToHome, theme }) => {
  const [selectedPrepaidItem, setSelectedPrepaidItem] = useState<PrepaidItem>({
    label: 'none',
    headline: 'None',
    quantity: 0
  });
  const [state, setState] = useState<'normal' | 'submitting' | 'submitted' | 'failed'>('normal');

  let prepaidItems = [{
    label: 'none',
    headline: 'None',
    quantity: 0
  }] as PrepaidItem[];
  if (userPrepaidItems) {
    prepaidItems = [...prepaidItems, ...Object.values(userPrepaidItems).filter(item => item !== undefined) as PrepaidItem[]];
  } 

  const activeServices = summary.filter(service => service.active);

  const selectChangeHandler = useCallback(
    (itemValue: React.ReactText, itemIndex: number) => {
      if (itemValue !== 'none') {
        const selected = prepaidItems[itemIndex];
        setSelectedPrepaidItem(selected);
      } else {
        const none = prepaidItems.find(item => item.label === 'none') as PrepaidItem;
        setSelectedPrepaidItem(none);
      }
    },
    [prepaidItems, setSelectedPrepaidItem],
  );

  const submitHandler = useCallback(
    async () => {
      try {
        setState('submitting');
        const orderNumber = 
         Date.now().toString().slice(-6) + (await Random.getRandomBytesAsync(3)).reduce((acc, cur) => acc += cur, '');
        const orderPrepaidItems = [];
        if (selectedPrepaidItem.label !== 'none') orderPrepaidItems.push(selectedPrepaidItem);
        const order = {
          orderNumber,
          prepaidItems: orderPrepaidItems,
          services: activeServices.map(service => service.title)
        } as Order;
        console.log(order);
        await onContinue(order);
        
        setState('submitted');
      } catch (err) {
        setState('failed');
      }
    },
    [selectedPrepaidItem, activeServices],
  );

  let modalContent;
  if (state === 'normal') {
    modalContent = (
      <CustomCard containerStyle={styles.modalCard} title='SUMMARY' titleStyle={{ color: theme.colors?.primary }}>
        <NormalText style={{ ...styles.modalTitle, color: theme.colors?.grey2 }}>Chosen Services</NormalText>
        <View style={styles.modalSummary}>
          {activeServices
            .map(service => <FeatureText key={service.title} theme={theme}>{service.title}</FeatureText>)}
        </View>

        <NormalText style={{ ...styles.modalTitle, color: theme.colors?.grey2 }}>Select Prepaid Item</NormalText>
        <View style={styles.modalSummary}>
          <View style={styles.pickerContainer}>
            <Picker
              mode='dropdown'
              onValueChange={selectChangeHandler}
              selectedValue={selectedPrepaidItem.headline} >
              {prepaidItems.map(
                prepaidItem => <Picker.Item
                  key={prepaidItem.label}
                  label={`${prepaidItem.headline}`}
                  value={prepaidItem.headline}
                />
              )}
            </Picker>
          </View>
        </View>

        <View style={styles.modalBottomButtons}>
          <Button
            type='clear'
            title='CANCEL'
            onPress={() => onClose()}
            titleStyle={{ color: theme.colors?.error }}
            buttonStyle={{ ...styles.modalCancel }}
          />
          <Button
            type='clear'
            title='CONFIRM'
            onPress={() => submitHandler()}
            titleStyle={{ color: theme.colors?.success }}
            buttonStyle={{ ...styles.modalConfirm }}
          />
        </View>
      </CustomCard>
    )
  } else if (state === 'submitting') {
    modalContent = (
      <CustomCard>
        <ActivityIndicator size='large' color={theme.colors?.primary} />
      </CustomCard>
    )
  } else if (state === 'submitted') {
    modalContent = (
      <CustomCard>
        <Icon
          type='font-awesome-5'
          name='check-circle'
          color={theme.colors?.success}
          size={50}
        />
        <NormalText style={styles.modalStatus}>We've received your order, now being processed.</NormalText>
        <Button
          title='OK'
          onPress={() => navigateToHome()}
        />
      </CustomCard>
    )
  } else {
    modalContent = (
      <CustomCard containerStyle={styles.modalCard}>
        <Icon
          type='font-awesome-5'
          name='times-circle'
          color={theme.colors?.error}
          size={50}
        />
        <NormalText style={styles.modalStatus}>There was an error. Order not received</NormalText>
        <Button
          title='LATER'
          type='outline'
          containerStyle={{marginBottom: 6}}
          onPress={() => navigateToHome()}
        />
        <Button
          title='TRY AGAIN'
          onPress={() => setState('normal')}
        />
      </CustomCard>
    );
  }

  const backdropHandler = () => {
    if (state !== 'submitting') {
      onClose()
    }
  }

  return (
    <View>
      <Modal
        onBackdropPress={() => backdropHandler()}
        isVisible={isVisible}
      >
        {modalContent}
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
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
  },
  modalStatus: {
    textAlign: 'center',
    marginVertical: 20
  }
});
