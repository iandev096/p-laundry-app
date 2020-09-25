import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem, Icon, Theme, ListItemProps } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import { NormalText } from './NormalText';

interface ServiceListItemProps extends ListItemProps {
  theme: Theme,
  exTitle: {
    text: string,
    icon: {
      name: string,
      type: string,
    },
  }
  active: boolean
}

export const ServiceListItem: React.FC<ServiceListItemProps> = ({ theme, exTitle, active, subtitle, ...props }) => {
  const [checkName, setCheckName] = useState<'circle' | 'check-circle'>('circle');

  useEffect(() => {
    if (active) setCheckName('check-circle');
    else setCheckName('circle');
  }, [setCheckName, active]);

  return (
    <ListItem
      containerStyle={styles.listItem}
      Component={TouchableScale}
      title={
        <View style={styles.listItemTitle}>
          <Icon
            style={styles.listItemTitleIcon}
            size={40}
            name={exTitle.icon.name}
            type={exTitle.icon.type}
            color={theme.colors?.grey3} />
          <NormalText style={styles.listItemTitleText} >{exTitle.text}</NormalText>
        </View>
      }
      leftIcon={{ type: 'font-awesome-5', name: checkName, color: theme.colors?.primary }}
      subtitle={subtitle}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  listItem: {
    marginBottom: 15,
    borderRadius: 10
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

  }
});
