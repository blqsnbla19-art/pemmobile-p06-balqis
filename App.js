import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, FlatList, TextInput, 
  SafeAreaView, RefreshControl, TouchableOpacity 
} from 'react-native';
import { PRODUCTS } from './data/products';
import ProductCard from './components/productCard';

export default function App() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [filteredData, setFilteredData] = useState(PRODUCTS);
  const [refreshing, setRefreshing] = useState(false);

  const categories = ['Semua', 'Smartphone', 'Laptop', 'Audio', 'Accessories'];

  // Fungsi Filter & Search Real-time (R5)
  useEffect(() => {
    let result = PRODUCTS.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    if (activeCategory !== 'Semua') {
      result = result.filter(item => item.category === activeCategory);
    }

    setFilteredData(result);
  }, [search, activeCategory]);

  // Fungsi Pull-to-Refresh (R6)
  const onRefresh = () => {
    setRefreshing(true);
    setSearch('');
    setActiveCategory('Semua');
    setTimeout(() => setRefreshing(false), 1500);
  };

  // Komponen saat data kosong (R4)
  const ListEmpty = () => (
    <View style={styles.emptyBox}>
      <Text style={styles.emptyIcon}>🙈</Text>
      <Text style={styles.emptyText}>Yah, barangnya nggak ada...</Text>
      <Text style={styles.emptyHint}>Coba cari kata kunci lain atau reset filter.</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Aplikasi */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>ShopList Gadget</Text>
        <Text style={styles.appCount}>{filteredData.length} Produk Tersedia</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <TextInput 
          style={styles.input}
          placeholder="Cari produk..."
          value={search}
          onChangeText={setSearch}
        />
        {search !== '' && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Kategori (Bonus E1) */}
      <View style={styles.categoryContainer}>
        <FlatList 
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => setActiveCategory(item)}
              style={[
                styles.catBtn, 
                activeCategory === item && styles.catBtnActive
              ]}>
              <Text style={activeCategory === item ? styles.catTextActive : styles.catText}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* List Utama (R1, R3) */}
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={ListEmpty}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} color="#3498db" />
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa', paddingTop: 40 },
  header: { padding: 16, backgroundColor: '#fff' },
  appTitle: { fontSize: 22, fontWeight: 'bold', color: '#2c3e50' },
  appCount: { fontSize: 13, color: '#7f8c8d' },
  searchSection: { 
    flexDirection: 'row', 
    margin: 16, 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#dcdde1'
  },
  input: { flex: 1, height: 45 },
  clearIcon: { fontSize: 18, color: '#95a5a6', padding: 5 },
  categoryContainer: { marginBottom: 10, paddingLeft: 16 },
  catBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#dcdde1', marginRight: 8 },
  catBtnActive: { backgroundColor: '#3498db' },
  catText: { color: '#2c3e50', fontSize: 12 },
  catTextActive: { color: '#fff', fontWeight: 'bold' },
  emptyBox: { alignItems: 'center', marginTop: 80 },
  emptyIcon: { fontSize: 60 },
  emptyText: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  emptyHint: { color: '#2cbcc6', marginTop: 5 }
});