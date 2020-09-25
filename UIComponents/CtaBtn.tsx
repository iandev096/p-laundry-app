import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, ButtonProps, Theme } from 'react-native-elements';

interface CtaBtnProps extends ButtonProps {
  theme: Theme
}

export const CtaBtn: React.FC<CtaBtnProps> = ({ theme, title, onPress, ...props }) => {
  return (
    <Button
      title={title}
      onPress={onPress}
      titleStyle={styles.ctaBtnText}
      buttonStyle={{ ...styles.ctaBtn, backgroundColor: theme.colors?.success }} 
      {...props} />
  );
}


const styles = StyleSheet.create({
  ctaBtn: {
    width: Dimensions.get('window').width - 20,
    paddingVertical: 15
  },
  ctaBtnText: {
    fontSize: 20
  }

})