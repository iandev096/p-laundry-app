import React from 'react';
import { Screen } from '../../UIComponents/Screen';
import { Container } from '../../UIComponents/Container';
import { StyleSheet, Dimensions, View } from 'react-native';
import { PricingCard } from 'react-native-elements';

interface PrepaidOffersScreenProps {

}

export const PrepaidOffersScreen: React.FC<PrepaidOffersScreenProps> = ({ }) => {
  return (
    <Screen>
      <Container style={styles.container}>
        <View style={styles.inner}>
          <PricingCard
            containerStyle={styles.pricingCard}
            title='Gold'
            color='#e0cc0f'
            price='GH$12'
            info={['20 Shirts', 'Washed & Ironed', 'Use withing 3 months', 'Save GH$1 per shirt']}
            button={{ title: 'PURCHASE', icon: 'flight-takeoff' }}
          />
          <PricingCard
            containerStyle={styles.pricingCard}
            title='Silver'
            color='#abc1d4'
            price='GH$12'
            info={['50 Shirts', 'Washed & Ironed', 'Use withing 3 months', 'Save GH$1 per shirt']}
            button={{ title: 'PURCHASE', icon: 'flight-takeoff' }}
          />
          <PricingCard
            containerStyle={styles.pricingCard}
            title='Bronze'
            color='#8a4848'
            price='GH$12'
            info={['20 Shirts', 'Washed & Ironed', 'Use withing 3 months', 'Save GH$1 per shirt']}
            button={{ title: 'PURCHASE', icon: 'flight-takeoff' }}
          />
        </View>
      </Container>
    </Screen>
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
  pricingCard: {
    marginHorizontal: 0
  }
})