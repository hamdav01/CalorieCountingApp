import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
export default function App() {
  const [recipes, addRecipies] = React.useState([
    {
      text: `item: 0`,
      id: 0,
    },
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <View styles={styles.header}>
        <TouchableOpacity
          onPress={() => {
            addRecipies([
              ...recipes,
              {
                text: `item: ${recipes.length}`,
                id: recipes.length,
              },
            ]);
          }}
          style={styles.button}
        >
          <AntDesign name='plus' size={24} color='black' />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <FlatList
          style={styles.itemList}
          data={recipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Item title={item.text} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'flex-start',
  },
  container: {
    backgroundColor: '#FFF',
  },
  itemList: {
    marginHorizontal: 20,
  },
  item: {
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: '#f9c2ff',
  },
  title: {
    padding: 10,
    fontSize: 22,
    color: '#000',
  },
  button: {
    width: 55,

    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10,
    marginLeft: 5,
    marginTop: 5,
    borderRadius: 5,
  },
});
