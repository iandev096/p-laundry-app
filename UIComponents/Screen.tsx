import React, { useContext, useState, useEffect } from 'react';
import { StyleProp, ViewStyle, View, ScrollView } from 'react-native';
import { ThemeContext } from 'react-native-elements';

type T = StyleProp<ViewStyle>;
interface ScreenProps {
  style?: T
}

export const Screen: React.FC<ScreenProps> = ({ style, children }) => {
  const { theme } = useContext(ThemeContext);
  const [defualtStyle, setDefualtStyle] = useState<T>();

  useEffect(() => {
    setDefualtStyle({
      backgroundColor: theme.colors?.grey5,
      // flex: 1
    });
    if (style) {
      setDefualtStyle(Object.assign(defualtStyle, style))
    };
  }, [style]);

  return (
    <ScrollView style={defualtStyle}>
      {children}
    </ScrollView>
  );
}