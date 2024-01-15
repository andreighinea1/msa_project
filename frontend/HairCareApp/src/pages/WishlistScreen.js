import React from 'react';
import {View, Text, StyleSheet, FlatList, ImageBackground} from 'react-native';
import ProductCard from '../components/ProductCard';
import BottomNavigationBar from "../components/BottomNavigationBar"; // Ensure this path is correct

const WishlistScreen = ({navigation}) => {
    // Sample data - replace with your actual product data
    const ItemSeparator = () => <View style={{ height: 20 }} />; // Adjust height for desired spacing

    const products = [
        { id: '1', name: 'Product 1', price: '$20', description: 'Description of product 1' },
        { id: '2', name: 'Product 2', price: '$30', description: 'Description of product 2' },
    ];

    const renderProduct = ({ item }) => {
        return (
            <ProductCard
                productName={item.name}
                price={item.price}
                description={item.description}
            />
        );
    };

    return (
        <ImageBackground
            source={require('../utils/pictures/background-pages.png')} // replace with your local image
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Our Products</Text>
                <FlatList
                    data={products}
                    renderItem={renderProduct}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                    ItemSeparatorComponent={ItemSeparator} // Add this line
                />
            </View>
            <BottomNavigationBar navigation={navigation} />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    listContainer: {
        paddingHorizontal: 10,

    },
    // ... Add any other styles you need
});

export default WishlistScreen;
