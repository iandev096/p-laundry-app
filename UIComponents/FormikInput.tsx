import React from 'react';
import { View, Text } from 'react-native';
import { InputProps, Input } from 'react-native-elements';
import { FormikProps } from 'formik';

type FormikKeys = { email: string, password: string }
interface FormikInputProps extends InputProps {
  formikProps: FormikProps<FormikKeys>,
  formikKey: keyof FormikKeys
}

export const FormikInput: React.FC<FormikInputProps> = ({ placeholder, onChangeText, formikProps, formikKey, ...props }) => {
  return (
    <Input
      placeholder={formikKey}
      onChangeText={formikProps.handleChange(formikKey)}
      onBlur={formikProps.handleBlur(formikKey)}
      errorMessage={formikProps.touched[formikKey] ? formikProps.errors[formikKey] : ''}
      {...props}
    />
  );
}