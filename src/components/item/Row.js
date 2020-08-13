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

const createOnChange = (prop, data) => set(lensProp(prop), __, data);

const Row = ({ name, onDelete, id, kcal, grams, onChange }) => {
  const totalKcal = multiply(kcal, grams);
  const data = { kcal, id, name, grams };
  const onKcalChange = createOnChange('kcal', data);
  const onNameChange = createOnChange('name', data);
  const onGramsChange = createOnChange('grams', data);
  return (
    <View style={styles.content}>
      <View style={styles.row}>
        <TextInput
          style={styles.rowItem}
          onChangeText={onNameChange}
          value={name}
        />
        <TextInput
          style={styles.rowItem}
          onChangeText={onKcalChange}
          value={toString(kcal)}
        />
        <TextInput
          style={styles.rowItem}
          onChangeText={onGramsChange}
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
