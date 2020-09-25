import React, { useContext } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Screen } from '../../UIComponents/Screen';
import { Container } from '../../UIComponents/Container';
import { CustomCard } from '../../UIComponents/CustomCard';
import { Center } from '../../UIComponents/Center';
import { Icon, ThemeContext } from 'react-native-elements';
import { NormalText } from '../../UIComponents/NormalText';
import { LinkText } from '../../UIComponents/LinkText';
import { FeatureText } from '../../UIComponents/FeatureText';
import { PriceCard } from '../../UIComponents/PriceCard';

interface PricesScreenProps {

}

export const PricesScreen: React.FC<PricesScreenProps> = ({ }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Screen>
      <Container style={styles.container}>
        <View style={styles.inner}>
          <View style={styles.prices}>
            <PriceCard
              title='Washed & Dried Laundry'
              desc='Washed and Tumble and dried. Priced per period'
              theme={theme}
              icon={{ name: 'shopping-bag', type: 'font-awesome' }}
            />
            <PriceCard
              title='Dry cleaning & Ironed Laundry'
              desc='Cleaned and ironed. Priced per period'
              theme={theme}
              icon={{ name: 'tshirt', type: 'font-awesome-5' }}
            />
            <PriceCard
              title='Duvets & Bulky Items'
              desc='Larger items requiring different processing'
              theme={theme}
              icon={{ name: 'ios-bed', type: 'ionicon' }}
            />
            <PriceCard
              title='Ironing only'
              desc='Items that are already washed. Priced per period'
              theme={theme}
              icon={{ name: 'steam', type: 'font-awesome' }}
            />
            <PriceCard
              title='Deals'
              desc='Special offers.'
              theme={theme}
              icon={{ name: 'local-laundry-service', type: 'material' }}
            />
          </View>

          <View style={styles.info}>
            <CustomCard containerStyle={styles.infoCard}>
              <NormalText style={styles.infoCardTitle}>About our Services</NormalText>
              <FeatureText style={{ color: theme.colors?.grey4, width: '98%', paddingLeft: '2%' }} theme={theme}>Free collection and delivery.</FeatureText>
              <FeatureText style={{ color: theme.colors?.grey4, width: '98%', paddingLeft: '2%' }} theme={theme}>GH$20 mininum order.</FeatureText>
              <FeatureText style={{ color: theme.colors?.grey4, width: '98%', paddingLeft: '2%' }} theme={theme}>GH$5 cancellation / no-show fee.</FeatureText>
            </CustomCard>
          </View>
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
    justifyContent: 'space-between',
  },
  priceCard: {
    marginHorizontal: 0,
    flexBasis: '49%',
  },
  priceCardTitle: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'bold',
    marginVertical: 16
  },
  priceCardDesc: {
    textAlign: 'center',
    fontSize: 15,
  },
  priceCardCta: {
    flexDirection: 'row',
    marginTop: 10
  },
  prices: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  info: {

  },
  infoCard: {
    marginHorizontal: 0,
  },
  infoCardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 19
  }
})