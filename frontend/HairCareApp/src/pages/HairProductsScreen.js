import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, ImageBackground} from 'react-native';
import ProductCard from '../components/ProductCard';
import BottomNavigationBar from "../components/BottomNavigationBar"; // Ensure this path is correct
import {Dimensions} from 'react-native';
import CustomButton from "../components/Button";
import {BASE_URL, formatErrorMessage, getJwtToken} from "../utils";

const HairProductsScreen = ({navigation}) => {
    const ItemSeparator = () => <View style={{height: 20}}/>; // Adjust height for desired spacing
    const [products, setProducts] = useState([]);
    const [selectedButton, setSelectedButton] = useState('Conditioner');

    const fetchProducts = async (productType) => {
        try {
            const response = await fetch(`${BASE_URL}/products/recommendations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await getJwtToken()}`
                },
                body: JSON.stringify({product_type: productType}),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("data:", data);
                setProducts(data);
            } else {
                const errorData = await response.json();
                if (errorData.detail === "Could not validate credentials") {

                }
                console.log(formatErrorMessage(errorData.detail, "Hair Products:"));
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        fetchProducts(selectedButton);
    }, [selectedButton]);

    const handleProductSelection = (productType) => {
        setSelectedButton(productType);
        console.log("Selected Button:", productType); // Debugging
    };

    const getButtonStyles = (buttonType) => {
        return buttonType === selectedButton
            ? {backgroundColor: '#615143', color: 'white'} // Active state
            : {backgroundColor: '#C9B8A1', color: 'black'}; // Inactive state
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
                        style={getButtonStyles('Shampoo')}
                        onPress={() => handleProductSelection('Shampoo')}
                    />
                    <CustomButton
                        title={'Conditioner'}
                        styleType="productMenu"
                        style={getButtonStyles('Conditioner')}
                        onPress={() => handleProductSelection('Conditioner')}
                    />
                    <CustomButton
                        title={'Styling'}
                        styleType="productMenu"
                        style={getButtonStyles('Styling')}
                        onPress={() => handleProductSelection('Styling')}
                    />

                </View>

                <FlatList
                    data={products}
                    renderItem={({item}) => <ProductCard {...item} />}
                    keyExtractor={item => item.product_id}
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
