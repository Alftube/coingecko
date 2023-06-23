import { View, Text, FlatList, StyleSheet, TextInput, SafeAreaView, } from 'react-native'
import React, { useEffect, useState } from 'react'
import CoinItem from './components/CoinItem'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useFonts } from 'expo-font';
const App = () => {
  const [coins, setCoins] = useState([])
  const [search, setsearch] = useState('')
  const [refreshing, setrefreshing] = useState(false)

  const loadData = async () => {
      const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"

      );
      const data = await res.json()
      setCoins(data)
  }
  useEffect(() => {
    loadData()
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CryptoMarket</Text>
        <View style={styles.containerInput}>
        <AntDesign name='search1' style={styles.searchIcon}/>
        <TextInput style={styles.searchInput}
        placeholder="Search a coin"
        placeholderTextColor="#ffffff"
        onChangeText={text => setsearch(text.toLowerCase())}
        />
        </View>
      </View>
      <FlatList style={styles.list}
        data={coins.filter((coin) => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)) }
        renderItem={({item}) => {
          return <CoinItem coin={item} />
        }}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={async() => {
          setrefreshing(true)
          await loadData();
          setrefreshing(false)
        }}
    />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#24495E',
    flex: 1,
    alignItems: 'center' 
  },
  list: {
    width: '90%'
  },
  title: {
    color: '#fff',
    marginTop: 10,
    fontSize: 20,
    fontWeight: "700"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    padding: 10
  },
  searchInput: {
    color: "#fff",
    borderBottomColor: "#84A7A1",
    borderBottomWidth: 1,
    width: "40%",
    textAlign: "center",
  },
  searchIcon: {
    color: 'white',
    fontSize: 20,
    marginRight: 0,
  },
  containerInput: {
    flexDirection: "row",
    width: '100%',
    alignItems: "center",
    marginLeft: '20%'
  },
})
export default App