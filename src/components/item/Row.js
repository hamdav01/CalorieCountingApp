import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { multiply, compose, lensProp, set, curry, not, divide } from 'ramda';

const RowInputItem = ({ value, onChangeText }) => (
  <TextInput
    style={styles.rowItem}
    onChangeText={onChangeText}
    value={value.toString()}
  />
);

const creatOnChangeValue = curry((data, name, value) =>
  set(lensProp(name), value, data)
);

const isNumber = compose(not, isNaN);

const Row = ({ name, onDelete, id, kcal, grams, onChange }) => {
  const totalKcal = multiply(divide(kcal, 100), grams);
  const data = { kcal, id, name, grams };
  const onChangeValue = creatOnChangeValue(data);
  const onKcalChange = (value, s) => {
    console.log('value: ', value);
    if (isNumber(value)) {
      console.log('IsNumber: ', value, onChangeValue('kcal', value));
      onChange(onChangeValue('kcal', value));
    } else {
      console.log('Is NOT Number: ', kcal, onChangeValue('kcal', kcal));
      onChange(onChangeValue('kcal', kcal));
    }
  };

  const onNameChange = (value) => onChange(onChangeValue('name', value));
  const onGramsChange = (value) => onChange(onChangeValue('grams', value));
  return (
    <View style={styles.content}>
      <View style={styles.row}>
        <RowInputItem onChangeText={onNameChange} value={name} />
        <RowInputItem onChangeText={onKcalChange} value={kcal} />
        <RowInputItem onChangeText={onGramsChange} value={grams} />
        <Text style={styles.rowItem}>{totalKcal.toFixed(0)}</Text>
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
