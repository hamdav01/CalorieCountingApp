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
  filter,
  concat,
  prop,
  map,
  multiply,
  converge,
  inc,
  slice,
  findIndex,
  sum,
  divide,
  __,
  clamp,
} from 'ramda';
import shortid from 'shortid';
import HeaderRow from './HeaderRow';
import Row from './Row';
import { getWindowHeight } from '../../utils/Dimensions';
import { divideByTwo } from '../../utils/Math';
import { isNotEqual } from '../../utils/Boolean';

const getGrams = prop('grams');
const getKcal = prop('kcal');
const getId = prop('id');

const multiplyGramsAndKcal = converge(multiply, [
  compose(divide(__, 100), getGrams),
  getKcal,
]);
const mapTotalKcal = map(multiplyGramsAndKcal);
const getTotalKcal = compose(sum, mapTotalKcal);

const createRenderRow = (setData, data) => {
  const onDelete = (id) => {
    const isNotEqualToId = compose(isNotEqual(id), getId);
    setData(filter(isNotEqualToId, data));
  };

  const onChange = ({ name, grams, kcal, id }) => {
    const equalsId = compose(equals(id), getId);

    const index = findIndex(equalsId, data);
    setData([
      ...slice(0, index, data),
      {
        name,
        grams,
        kcal,
        id,
      },
      ...slice(inc(index), data.length, data),
    ]);
  };
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
  const [currentData, setData] = useState(data);
  const renderRow = createRenderRow(setData, currentData);

  const onAdd = () => {
    console.log('onAdd');
    setData(
      concat(currentData, [
        {
          name: 'Undefined',
          kcal: 0,
          grams: 0,
          id: shortid.generate(),
        },
      ])
    );
  };
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
        <Text style={styles.text}>{`TotalKcal: ${totalKcal}`}</Text>
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
