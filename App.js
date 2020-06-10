import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          alert('in here');
        }}
        style={styles.button}
      >
        <AntDesign name='plus' size={24} color='black' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  button: {
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10,
    marginLeft: 10,
    marginTop: 25,
    borderRadius: 5,
  },
});
