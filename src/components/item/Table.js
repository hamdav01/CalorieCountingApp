import React, { useReducer } from 'react';
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
  divide,
  __,
  clamp,
} from 'ramda';

import HeaderRow from './HeaderRow';
import Row from './Row';
import { getWindowHeight } from '../../utils/Dimensions';
import { divideByTwo } from '../../utils/Math';
import { productReducer, ProductActions } from '../../reducers/ProductReducer';

const getGrams = prop('grams');
const getKcal = prop('kcal');
const getId = prop('id');

const multiplyGramsAndKcal = converge(multiply, [
  compose(divide(__, 100), getGrams),
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

  const onChange = (config) =>
    dispatchData({
      type: ProductActions.UPDATE,
      ...config,
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

const Table = ({ data }) => {
  const [currentData, dispatchData] = useReducer(productReducer, data);
  const renderRow = createRenderRow(dispatchData);
  const onAdd = () =>
    dispatchData({
      type: ProductActions.ADD,
    });

  const totalKcal = getTotalKcal(currentData);
  return (
    <View style={styles.content}>
      <View style={styles.listArea}>
        <HeaderRow />
        <FlatList
          data={currentData}
          renderItem={renderRow}
          keyExtractor={getId}
        />
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

const colorClamp = clamp(0, 255);
// 0-600 grönt 600-900 gult 900-max rött

const test = (value) => {
  const max = 255;
  let green = colorClamp(max + 600 - value);
  let red = colorClamp((max / 600) * value);
  const blue = 0;
  console.log('value:', value);
  console.log(`rgb(${red},${green},${blue})`);
  return `rgb(${red},${green},${blue})`;
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
