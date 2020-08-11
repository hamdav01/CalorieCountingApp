import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
const Row = ({ name, onDelete, id, kcal, grams }) => {
  const [currentKcal, setKcal] = useState(kcal);
  const [currentGrams, setGrams] = useState(grams);
  return (
    <View style={styles.row}>
      <View style={styles.information}>
        <Text style={styles.rowItem}>{name}</Text>
        <TextInput
          style={styles.rowItem}
          onChangeText={setKcal}
          value={currentKcal.toString()}
        />
        <TextInput
          style={styles.rowItem}
          onChangeText={setGrams}
          value={currentGrams.toString()}
        />
        <Text style={styles.rowItem}>{currentKcal * currentGrams}</Text>
      </View>
      <View style={styles.button}>
        <TouchableWithoutFeedback
          onPress={() =>
            onSave({ id, name, kcal: currentKcal, grams: currentGrams })
          }
        >
          <Ionicons name='ios-checkmark-circle' size={26} color='black' />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => onDelete(id)}>
          <Entypo name='trash' size={26} color='black' />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  rowItem: {
    flex: 0.25,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  information: {
    marginHorizontal: 5,
    flexDirection: 'row',
    flex: 0.75,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 0.25,
  },
});

export default Row;
