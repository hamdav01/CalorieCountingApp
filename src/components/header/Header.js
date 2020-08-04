import React from 'react';
import { Text } from 'react-native';
import { headerStyles } from './HeaderStyles.js';

const header = ({ text = 'defaultHeader' }) => (
  <Text style={headerStyles.header}>{text}</Text>
);

export default header;
