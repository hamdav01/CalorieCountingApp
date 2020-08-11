import { StyleSheet, View, Text } from 'react-native';
import React from 'react';

const HeaderRow = () => {
  return (
    <View style={styles.row}>
      <View style={styles.test}>
        <Text style={styles.item}>Name</Text>
        <Text style={styles.item}>Kcal</Text>
        <Text style={styles.item}>g</Text>
        <Text style={styles.item}>TotalKcal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    fontWeight: 'bold',
    flex: 0.25,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  test: {
    flexDirection: 'row',
    flex: 0.75,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 5,
    borderBottomWidth: 2,
  },
});

export default HeaderRow;
