import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {useCustomFonts} from '../utils';
import CustomButton from "./Button";

const {width} = Dimensions.get('window');
const cardWidth = width * 0.85; // 85% of the screen width
const cardHeight = cardWidth * 0.42; // Maintain aspect ratio

const ProductCard = ({productName, price, description}) => {
    const appIsReady = useCustomFonts();

    const handleProductClick = () => {
        console.log("Product clicked");  // TODO: Implement
    };

    if (!appIsReady) {
        return null; // Or a custom loader
    } else {
        return (
            <View style={styles.cardContainer}>
                <Text style={styles.productName}>{productName}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.price}>{price}</Text>
                <CustomButton title="GO TO PRODUCT" onPress={handleProductClick} styleType={'productCard'} style={styles.productCardButton}  />
                <Text style={styles.marketPrice}>Market price</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    cardContainer: {
        width: cardWidth,
        height: cardHeight,
        backgroundColor: 'white',
        borderRadius: 20,
        position: 'relative',
    },
    productName: {
        color: '#615143',
        fontSize: 12,
        fontFamily: 'Abel',
        fontWeight: '400',
        textTransform: 'uppercase',
        letterSpacing: 1.20,
        position: 'absolute',
        top: '10%',
        left: '4%',
    },
    description: {
        color: '#615143',
        fontSize: 10,
        fontFamily: 'Abel',
        fontWeight: '400',
        letterSpacing: 1,
        position: 'absolute',
        top: '24%',
        left: '4%',
    },
    price: {
        color: '#615143',
        fontSize: 13,
        fontFamily: 'Abel',
        fontWeight: '400',
        textTransform: 'uppercase',
        letterSpacing: 1.30,
        position: 'absolute',
        top: '79%',
        left: '4%',
    },

    marketPrice: {
        color: '#615143',
        fontSize: 8,
        fontFamily: 'Abel',
        fontWeight: '400',
        letterSpacing: 0.80,
        position: 'absolute',
        top: '67%',
        left: '4%',
    },
    productCardButton: {
        position: 'absolute',
        bottom: 10, // Adjust as needed
        right: 10,  // Adjust as needed
        // Other styling as needed for the button
    },
});

export default ProductCard;
