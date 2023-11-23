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
                <CustomButton title="GO TO PRODUCT" onPress={handleProductClick} styleType="productCard"/>
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
    },
    productName: {
        color: '#020953',
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
        color: '#020953',
        fontSize: 10,
        fontFamily: 'Abel',
        fontWeight: '400',
        letterSpacing: 1,
        position: 'absolute',
        top: '24%',
        left: '4%',
    },
    price: {
        color: '#020953',
        fontSize: 13,
        fontFamily: 'Abel',
        fontWeight: '400',
        textTransform: 'uppercase',
        letterSpacing: 1.30,
        position: 'absolute',
        top: '79%',
        left: '4%',
    },
    button: {
        width: '35%',
        height: '14%',
        position: 'absolute',
        top: '76%',
        left: '54%',
        backgroundColor: '#020953',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#F9F5F0',
        fontSize: 9,
        fontFamily: 'Abel',
        fontWeight: '400',
        textTransform: 'uppercase',
        letterSpacing: 0.90,
    },
    marketPrice: {
        color: '#020953',
        fontSize: 8,
        fontFamily: 'Abel',
        fontWeight: '400',
        letterSpacing: 0.80,
        position: 'absolute',
        top: '67%',
        left: '4%',
    },
});

export default ProductCard;
