import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import shortid from 'shortid';
import { map } from 'ramda';

const lineContent = ['Name', 'Kcal', 'g', 'TotalKcal'];
const Line = (value) => (
  <Text key={shortid.generate()} style={styles.rowItem}>
    {value}
  </Text>
);
const generateLines = map(Line);

const HeaderRow = () => {
  return (
    <View style={styles.content}>
      <View style={styles.row}>{generateLines(lineContent)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowItem: {
    fontWeight: 'bold',
    flex: 0.25,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  row: {
    flexDirection: 'row',
    flex: 0.85,
  },
  content: {
    flexDirection: 'row',
    marginHorizontal: 5,
    borderBottomWidth: 2,
  },
});

export default HeaderRow;
