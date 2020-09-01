import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { multiply, lensProp, set, curry, compose, replace } from 'ramda';
import { divideByHundred } from '../../utils/Math';
import RowInputItem from './RowInputItem';
import { keepAllNumbers } from '../../utils/Regex';
import { isNumber } from '../../utils/Boolean';

const creatOnChangeValue = curry((data, name, value) =>
  set(lensProp(name), value, data)
);

const Row = ({ name, onDelete, id, kcal, grams, onChange }) => {
  const totalKcal = multiply(divideByHundred(kcal), grams);
  const data = { kcal, id, name, grams };
  const onChangeValue = (type) =>
    compose(onChange, creatOnChangeValue(data, type));

  const onKcalChange = onChangeValue('kcal');
  const onGramsChange = onChangeValue('grams');
  const onNameChange = onChangeValue('name');
  return (
    <View style={styles.content}>
      <View style={styles.row}>
        <RowInputItem onSubmitEditing={onNameChange} value={name} />
        <RowInputItem
          filter={keepAllNumbers}
          onSubmitEditing={onKcalChange}
          value={kcal}
        />
        <RowInputItem
          filter={keepAllNumbers}
          onSubmitEditing={onGramsChange}
          value={grams}
        />
        <Text style={styles.rowItem}>{totalKcal.toFixed(1)}</Text>
      </View>
      <View style={styles.buttonArea}>
        <TouchableWithoutFeedback onPress={() => onDelete(id)}>
          <Entypo name='trash' size={26} color='black' />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 5,
    marginVertical: 5,
    flexDirection: 'row',
  },
  rowItem: {
    flex: 0.25,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  row: {
    flexDirection: 'row',
    flex: 0.85,
  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 0.15,
  },
});

export default Row;
