import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

const CoinItem = ({ coin }) => {
  return (
    <View style={styles.containerItem}>
        <View style={styles.coinName}>
      <Image style={styles.image} source={{ uri: coin.image }}/>
     <View style={styles.containerNames}>
     <Text style={styles.text}>{coin.name}</Text>
      <Text style={styles.textSymbol}>{coin.symbol}</Text>
     </View>
        </View>
     <View>
     <Text style={styles.textPrice}>${coin.current_price}</Text>
      <Text style={[styles.pricePercentage,
         coin.price_change_percentage_24h > 0
          ? styles.priceUp
          :styles.priceDown,
          ]}
          >
            {coin.price_change_percentage_24h}</Text>
     </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: '#24495E',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  coinName: {
    flexDirection: 'row'
  },
  image: {
    width: 30,
    height: 30,
  },
  text: {
    color: '#ffffff',
  },
  textSymbol: {
    color: "#84A7A1",
    textTransform: "uppercase",
  },
  containerNames: {
    marginLeft: 10,
  },
  pricePercentage: {
    textAlign: 'right'
  },
  priceUp: {
    color: "#00B589",
  },
  priceDown: {
    color: "#F24C3D",
  },
  textPrice: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: 'right'
  },
});

export default CoinItem;
