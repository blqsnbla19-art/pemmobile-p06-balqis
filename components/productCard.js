import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>{item.image}</Text>
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>Rp {item.price.toLocaleString('id-ID')}</Text>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    elevation: 3, // Shadow untuk Android
    shadowColor: '#000', // Shadow untuk iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emoji: { fontSize: 40, marginRight: 12 },
  details: { flex: 1, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' },
  category: { fontSize: 12, color: '#95a5a6', marginBottom: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 14, fontWeight: 'bold', color: '#27ae60' },
  rating: { fontSize: 12, color: '#f1c40f' },
});

export default ProductCard;