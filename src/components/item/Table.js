import React  from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  compose,
  prop,
  map,
  multiply,
  converge,
  sum,
} from 'ramda';

import HeaderRow from './HeaderRow';
import Row from './Row';
import { getWindowHeight } from '../../utils/Dimensions';
import { divideByTwo, divideByHundred } from '../../utils/Math';
import {  ProductActions } from '../../reducers/ProductReducer';

const getGrams = prop('grams');
const getKcal = prop('kcal');
const getId = prop('id');

const multiplyGramsAndKcal = converge(multiply, [
  compose(divideByHundred, getGrams),
  getKcal,
]);
const mapTotalKcal = map(multiplyGramsAndKcal);
const getTotalKcal = compose(sum, mapTotalKcal);

const createRenderRow = (dispatchData) => {
  const onDelete = (id) =>
    dispatchData({
      id,
      type: ProductActions.REMOVE,
    });

  const onChange = (data) =>
    dispatchData({
      data,
      type: ProductActions.UPDATE,
    });

  return ({ item: { id, name, kcal, grams } }) => (
    <Row
      id={id}
      name={name}
      kcal={kcal}
      grams={grams}
      onChange={onChange}
      onDelete={onDelete}
    />
  );
};

const Table = ({ data, dispatchData }) => {
  const renderRow = createRenderRow(dispatchData);
  const onAdd = () =>
    dispatchData({
      type: ProductActions.ADD,
    });

  const totalKcal = getTotalKcal(data);
  return (
    <View style={styles.content}>
      <View style={styles.listArea}>
        <HeaderRow />
        <FlatList data={data} renderItem={renderRow} keyExtractor={getId} />
      </View>
      <View style={styles.nonListArea}>
        <Text style={styles.text}>{`TotalKcal: ${totalKcal.toFixed(2)}`}</Text>
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
  text: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    flex: 0.5,
  },
  buttonArea: { flex: 0.5 },
});

export default Table;
