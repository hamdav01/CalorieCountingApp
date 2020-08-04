import React from 'react';
import { StyleSheet, View } from 'react-native';
import Table from './components/item/Table';

const data = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Chicken',
    kcal: 200,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Sallad',
    kcal: 20,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Potatoes',
    kcal: 100,
  },
];
export default function KcalSection() {
  return (
    <View style={styles.container}>
      <Table data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
