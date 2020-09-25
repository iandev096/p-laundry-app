import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomCard } from './CustomCard';
import { Center } from './Center';
import { Icon, Theme } from 'react-native-elements';
import { NormalText } from './NormalText';
import { LinkText } from './LinkText';

interface PriceCardProps {
  theme: Theme;
  title: string;
  desc: string;
  icon: { name: string, type: string }
}

export const PriceCard: React.FC<PriceCardProps> = ({ theme, title, desc, icon }) => {
  return (
    <CustomCard containerStyle={styles.priceCard}>
      <Center>
        <Icon name={icon.name} type={icon.type} size={35} color={theme.colors?.grey4} />
        <NormalText style={styles.priceCardTitle} >{title}</NormalText>
        <NormalText style={{ ...styles.priceCardDesc, color: theme.colors?.grey4 }}>{desc}</NormalText>
        <View style={styles.priceCardCta}>
          <LinkText>Check Prices</LinkText>
          <Icon name='chevron-right' type='entypo' color={theme.colors?.primary} />
        </View>
      </Center>
    </CustomCard>
  );
}

const styles = StyleSheet.create({
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
});
