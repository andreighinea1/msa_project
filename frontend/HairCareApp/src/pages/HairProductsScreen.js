import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, ImageBackground} from 'react-native';
import ProductCard from '../components/ProductCard';
import BottomNavigationBar from "../components/BottomNavigationBar"; // Ensure this path is correct
import { Dimensions } from 'react-native';
import CustomButton from "../components/Button";

const HairProductsScreen = ({navigation}) => {
    const ItemSeparator = () => <View style={{height: 20}}/>; // Adjust height for desired spacing

    const products = [
        {id: '1', name: 'Shampoo 1', type: 'Shampoo', price: '$20', description: 'Description of Shampoo 1',url:'https://olaplex.com/products/no-0-intensive-bond-building-treatment-2021'},
        {id: '2', name: 'Shampoo 2', type: 'Shampoo', price: '$22', description: 'Description of Shampoo 2',url:'https://olaplex.com/products/no-0-intensive-bond-building-treatment-2021'},
        {id: '3', name: 'Shampoo 3', type: 'Shampoo', price: '$24', description: 'Description of Shampoo 3',url:'https://olaplex.com/products/no-0-intensive-bond-building-treatment-2021'},
        {id: '4', name: 'Shampoo 4', type: 'Shampoo', price: '$26', description: 'Description of Shampoo 4',url:'https://olaplex.com/products/no-0-intensive-bond-building-treatment-2021'},
        {id: '7', name: 'Conditioner 2', type: 'Conditioner', price: '$32', description: 'Description of Conditioner 2',url:'https://olaplex.com/products/no-0-intensive-bond-building-treatment-2021'},
        {id: '8', name: 'Conditioner 3', type: 'Conditioner', price: '$34', description: 'Description of Conditioner 3',url:'https://olaplex.com/products/no-0-intensive-bond-building-treatment-2021'},
        {id: '9', name: 'Conditioner 4', type: 'Conditioner', price: '$36', description: 'Description of Conditioner 4',url:'https://olaplex.com/products/no-0-intensive-bond-building-treatment-2021'},
        {id: '10', name: 'Conditioner 5', type: 'Conditioner', price: '$38', description: 'Description of Conditioner 5',url:'https://olaplex.com/products/no-0-intensive-bond-building-treatment-2021'},
        {id: '5', name: 'Shampoo 5', type: 'Shampoo', price: '$28', description: 'Description of Shampoo 5',url:'https://olaplex.com/products/no-0-intensive-bond-building-treatment-2021'},
        {id: '11', name: 'Styling 1', type: 'Styling', price: '$40', description: 'Description of Styling 1',url:'https://olaplex.com/products/no-0-intensive-bond-building-treatment-2021'},
        {id: '12', name: 'Styling 2', type: 'Styling', price: '$42', description: 'Description of Styling 2',url:'https://olaplex.com/products/no-0-intensive-bond-building-treatment-2021'},
        {id: '13', name: 'Styling 3', type: 'Styling', price: '$44', description: 'Description of Styling 3',url:'https://olaplex.com/products/no-0-intensive-bond-building-treatment-2021'},
        {id: '14', name: 'Styling 4', type: 'Styling', price: '$46', description: 'Description of Styling 4',url:'https://olaplex.com/products/no-0-intensive-bond-building-treatment-2021'},
        {id: '15', name: 'Styling 5', type: 'Styling', price: '$48', description: 'Description of Styling 5',url:'https://olaplex.com/products/no-0-intensive-bond-building-treatment-2021'},

    ];

    const [selectedButton, setSelectedButton] = useState('Conditioner');

    const filteredProducts = selectedButton ? products.filter(product => product.type === selectedButton) : products;
    const handleProductSelection = (productType) => {
        setSelectedButton(productType);
        console.log("Selected Button:", productType); // Debugging
    };

    const getButtonStyles = (buttonType) => {
        return {
            buttonStyle: {
                backgroundColor: buttonType === selectedButton ? '#615143' : '#C9B8A1',
                // Other button style overrides
            },
            textStyle: {
                // Text style overrides if needed
            }
        };
    };
    return (
        <ImageBackground
            source={require('../utils/pictures/background-pages.png')} // replace with your local image
            style={styles.backgroundImage}
        >

            <View style={styles.container}>
                <Text style={styles.title}>Our Products</Text>
                <View style={styles.menuContainer}>
                    <CustomButton
                        title={'Shampoo'}
                        styleType="productMenu"
                        {...getButtonStyles('Shampoo')}
                        onPress={() => handleProductSelection('Shampoo')}
                    />
                    <CustomButton
                        title={'Conditioner'}
                        styleType="productMenu"
                        {...getButtonStyles('Conditioner')}
                        onPress={() => handleProductSelection('Conditioner')}
                    />
                    <CustomButton
                        title={'Styling'}
                        styleType="productMenu"
                        {...getButtonStyles('Styling')}
                        onPress={() => handleProductSelection('Styling')}
                    />

                </View>

                <FlatList
                    data={filteredProducts}
                    renderItem={({ item }) => <ProductCard {...item} />}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                    ItemSeparatorComponent={ItemSeparator}
                />
            </View>
            <BottomNavigationBar navigation={navigation}/>
        </ImageBackground>
    );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth,
        height: windowHeight,
    },
    title: {
        fontSize: 30,
        color: '#362A20',
        fontFamily: 'Prata_400Regular',
        alignSelf: 'center',
        marginTop: 50,
        textTransform: 'uppercase',
    },
    listContainer: {
        paddingHorizontal: 10,

    },
    menuContainer: {
        flexDirection: 'row', // Aligns children in a row
        justifyContent: 'center', // Centers children horizontally
        alignItems: 'center', // Centers children vertically
        paddingTop: 10, // Padding at the top of the menu
        paddingBottom: 65, // Padding at the bottom of the menu
        width: '100%', // The menu container should span the full width of the screen
    },
    // ... Add any other styles you need
});

export default HairProductsScreen;
