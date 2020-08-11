import React from 'react';
import { Text, StyleSheet } from 'react-native';

const header = ({ text = 'defaultHeader' }) => (
  <Text style={headerStyles.header}>{text}</Text>
);

const headerStyles = StyleSheet.create({
  header: {
    textDecorationLine: 'underline',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default header;
