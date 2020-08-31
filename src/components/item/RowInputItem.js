import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { isNotEqual } from '../../utils/Boolean';
import { identity, compose } from 'ramda';

const RowInputItem = ({ value, onSubmitEditing, filter = identity }) => {
  const test = isNotEqual(value);
  const [currentValue, onChangeValue] = React.useState(value.toString());
  const onBlur = () => {
    if (isNotEqual(currentValue, value)) {
      onSubmitEditing(currentValue);
    }
  };

  const onChangeText = compose(onChangeValue, filter);
  return (
    <TextInput
      onBlur={onBlur}
      style={styles.rowItem}
      onChangeText={onChangeText}
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
