import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { isNotEqual } from '../../utils/Boolean';
import { identity, compose } from 'ramda';

const RowInputItem = ({ value, onSubmitEditing, filter = identity }) => {
  const [currentValue, onChangeValue] = React.useState(value.toString());
  const onBlur = () => {
    if (isNotEqual(currentValue, value)) {
      onSubmitEditing(filter(currentValue));
    }
  };
  return (
    <TextInput
      onBlur={onBlur}
      style={styles.rowItem}
      onChangeText={onChangeValue}
      value={currentValue}
    />
  );
};

const styles = StyleSheet.create({
  rowItem: {
    flex: 0.25,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default RowInputItem;
