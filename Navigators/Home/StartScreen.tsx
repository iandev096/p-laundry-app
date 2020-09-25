import React, { useContext } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Screen } from '../../UIComponents/Screen';
import { Container } from '../../UIComponents/Container';
import { CustomCard } from '../../UIComponents/CustomCard';
import { IconText } from '../../UIComponents/IconText';
import { ThemeContext, Icon, Button } from 'react-native-elements';
import { FeatureText } from '../../UIComponents/FeatureText';
import { NormalText } from '../../UIComponents/NormalText';
import { Center } from '../../UIComponents/Center';
import { AppNavigationProp } from '../App/app.types';
import { CtaBtn } from '../../UIComponents/CtaBtn';

interface StartScreenProps {
  navigation: AppNavigationProp<'Home'>
}

export const StartScreen: React.FC<StartScreenProps> = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  const scheduleCollectionHandler = () => {
    navigation.navigate('Services');
  }

  return (
    <Screen>
      <Container style={styles.container}>
        <View style={styles.inner}>
          <View style={styles.news}>
            <CustomCard containerStyle={styles.card}>
              <IconText
                containerStyle={{
                  marginBottom: 10,
                }}
                textProps={{
                  h4: true
                }}
                iconProps={{ name: 'heart', type: 'font-awesome', color: theme.colors?.primary }}
              >Corona Virus Update</IconText>
              <FeatureText theme={theme}>
                Contactless delivery and high temperature wash available.
              </FeatureText>
              <FeatureText theme={theme}>
                No need to sign on driver device.
              </FeatureText>
              <FeatureText theme={theme}>
                30% discount to dedicated members.
              </FeatureText>
            </CustomCard>
          </View>
          <View style={styles.ctaSection}>
            <Center>
              <Icon name='globe' type='font-awesome' color={theme.colors?.grey4} size={80} />
              <NormalText style={styles.ctaText} >Ready to Start?</NormalText>
              <CtaBtn
                title='SCHEDULE A COLLECTION'
                onPress={scheduleCollectionHandler}
                theme={theme}
              />

            </Center>
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
  news: {
    width: '100%',
  },
  ctaSection: {
    marginBottom: 40,
  },
  card: {
    marginHorizontal: 0,
  },
  ctaText: {
    marginVertical: 30,
  },
  ctaBtn: {
    width: Dimensions.get('window').width - 20,
    paddingVertical: 15
  },
  ctaBtnText: {
    fontSize: 20
  }

})