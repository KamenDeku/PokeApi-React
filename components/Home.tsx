// Home.tsx
import useFetch from '@/hooks/useFetch';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Card } from './Card';

export function Home({ navigation }) {
    const pageLimit = 10;
    const [limit, setLimit] = useState(pageLimit);
    const [offset, setOffset] = useState(0);

    const { list, loading, error } = useFetch(limit, offset);
    useEffect(() => {
        console.log(list, loading, error?.message);
    }, [loading]);

    function handleClick() {
        setOffset(offset + pageLimit);
    }

    const rows = [];
    for (let i = 0; i < list.length; i += pageLimit) {
        rows.push(list.slice(i, i + pageLimit));
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
              <Text style={styles.headerText}>Pokémon List</Text>
          </View>
          <View style={styles.grid}>
              {rows.map((row, rowIndex) => (
                  <View key={rowIndex} style={styles.row}>
                      {row.map((element) => (
                          <Card key={element?.name} data={element} navigation={navigation} />
                      ))}
                  </View>
              ))}
          </View>
          <TouchableOpacity onPress={handleClick} style={styles.loadMore}>
              <Text style={styles.loadMoreText}>Load More</Text>
          </TouchableOpacity>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
      padding: 10,
      // Background color of Home
      backgroundColor: '#9ca0a0', //Color azulado
      flex: 1,
  },
  header: {
    // Header background color
      backgroundColor: '#ffcc00', //Color amarillo
      padding: 10,
      borderRadius: 5,
      marginBottom: 20,
  },
  headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
  },
  loadMore: {
      alignItems: 'center',
      marginVertical: 20,
  },
  loadMoreText: {
      fontSize: 18,
      color: '#007bff', //Color azulado
  },
  grid: {
      flexDirection: 'column',
      alignItems: 'center',
  },
  row: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
  },
});
