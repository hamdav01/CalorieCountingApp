import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TextInput,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { equals, compose, reduce, filter, not } from 'ramda';
const Row = ({ name, onDelete, id }) => {
  const [kcal, setKcal] = useState(0);
  const [grams, setGrams] = useState(0);
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{name}</Text>
      <TextInput onChangeText={setKcal} value={kcal.toString()} />
      <TextInput onChangeText={setGrams} value={grams.toString()} />
      <Text>{grams * kcal}</Text>
      <Entypo.Button
        name='trash'
        size={24}
        color='black'
        style={'backgroundColor:white;'}
        onPress={() => onDelete(id)}
      />
    </View>
  );
};

const getTotalKcal = reduce((totalKcal, item) => totalKcal + item.kcal, 0);
const isNotEqual = compose(not, equals);

const Table = ({ data }) => {
  const [currentData, setData] = useState(data);

  const onDelete = (idToDelete) => {
    console.log(filter(({ id }) => isNotEqual(id, idToDelete), currentData));
  };

  const renderRow = ({ item }) => (
    <Row id={item.id} name={item.name} kcal={item.kcal} onDelete={onDelete} />
  );

  return (
    <View styles={styles.container}>
      <FlatList
        data={currentData}
        renderItem={renderRow}
        keyExtractor={(item) => item.id}
      />
      <Text>{`TotalKcal: ${getTotalKcal(currentData)}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    textAlign: 'center',
    backgroundColor: '#f9c2ff',
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 16,
  },
});

export default Table;
