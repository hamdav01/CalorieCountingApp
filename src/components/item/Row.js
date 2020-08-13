import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { multiply, toString, lensProp, set, __ } from 'ramda';

const RowInputItem = ({ value, onChangeText }) => (
  <TextInput
    style={styles.rowItem}
    onChangeText={onChangeText}
    value={toString(value)}
  />
);

const Row = ({ name, onDelete, id, kcal, grams, onChange }) => {
  console.log('render ROw');
  const totalKcal = multiply(kcal, grams);
  const data = { kcal, id, name, grams };
  const onKcalChange = (value) => {
    onChange({ name, grams, kcal: value, id });
  };
  const onNameChange = (value) => {
    onChange({ name: value, grams, kcal, id });
  };
  const onGramsChange = (value) => {
    onChange({ name, grams: value, kcal, id });
  };

  //  onChange(set(lensProp('kcal'), +value, data));
  // const onNameChange = (value) => onChange(set(lensProp('name'), +value, data));
  // const onGramsChange = (value) =>
  //  onChange(set(lensProp('grams'), value, data));

  return (
    <View style={styles.content}>
      <View style={styles.row}>
        <TextInput
          onChangeText={onNameChange}
          style={styles.rowItem}
          value={name}
        />
        <TextInput
          onChangeText={onKcalChange}
          style={styles.rowItem}
          value={toString(kcal)}
        />
        <TextInput
          onChangeText={onGramsChange}
          style={styles.rowItem}
          value={toString(grams)}
        />
        <Text style={styles.rowItem}>{totalKcal}</Text>
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
