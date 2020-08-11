import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  equals,
  compose,
  reduce,
  filter,
  not,
  concat,
  add,
  prop,
  curry,
  map,
  multiply,
  converge,
} from 'ramda';
import shortid from 'shortid';
import HeaderRow from './HeaderRow';
import Row from './Row';
import { getWindowHeight } from '../../utils/Dimensions';
import { divideByTwo } from '../../utils/Math';

const createOnDelete = curry((setData, data, idToDelete) =>
  setData(filter(({ id }) => isNotEqual(id, idToDelete), data))
);

const createOnAdd = (setData, data) => () =>
  setData(
    concat(data, [
      {
        name: 'Undefined',
        kcal: 0,
        grams: 0,
        id: shortid.generate(),
      },
    ])
  );

const getGrams = prop('grams');
const getKcal = prop('kcal');
const multiplyGramsAndKcal = converge(multiply, [getGrams, getKcal]);
const mapTotalKcal = map(multiplyGramsAndKcal);
const getTotalKcal = compose(reduce(add, 0), mapTotalKcal);
const isNotEqual = compose(not, equals);

const createRenderRow = (setData, data) => {
  const onDelete = createOnDelete(setData, data);
  const onSave = (setData, data) => {
    (item) => {
      const { name, grams, kcal, id } = item;
      const dataToSave = data.filter(({ id: currentId }) => id !== currentId);
      setData([
        ...dataToSave,
        {
          name,
          grams,
          kcal,
          id,
        },
      ]);
    };
  };
  return ({ item }) => (
    <Row
      id={item.id}
      name={item.name}
      kcal={item.kcal}
      onSave={onSave}
      grams={item.grams}
      onDelete={onDelete}
    />
  );
};

const Table = ({ data }) => {
  const [currentData, setData] = useState(data);
  const onAdd = createOnAdd(setData, currentData);
  const renderRow = createRenderRow(setData, currentData);
  return (
    <View style={styles.content}>
      <View style={styles.listArea}>
        <HeaderRow />
        <FlatList
          data={currentData}
          renderItem={renderRow}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.nonListArea}>
        <Text style={styles.textArea}>{`TotalKcal: ${getTotalKcal(
          currentData
        )}`}</Text>
        <TouchableWithoutFeedback
          style={styles.buttonArea}
          size={120}
          onPress={onAdd}
        >
          <Ionicons name='ios-add-circle-outline' size={120} color='black' />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const getHalfWindowHeight = compose(divideByTwo, getWindowHeight);

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    alignItems: 'stretch',
    flex: 1,
  },
  listArea: {
    alignSelf: 'stretch',
    height: getHalfWindowHeight(),
  },
  nonListArea: {
    borderTopWidth: 1,
    alignItems: 'center',
    height: getHalfWindowHeight(),
  },
  textArea: {
    fontSize: 26,
    textAlignVertical: 'center',
    flex: 0.5,
  },
  buttonArea: { flex: 0.5 },
});

export default Table;
