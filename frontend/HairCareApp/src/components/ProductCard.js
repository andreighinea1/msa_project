import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {useCustomFonts} from '../utils';
import CustomButton from "./Button";
import { Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace MaterialIcons with any other icon set


const {width} = Dimensions.get('window');
const cardWidth = width * 0.85; // 85% of the screen width
const cardHeight = cardWidth * 0.42; // Maintain aspect ratio

const ProductCard = ({product_id, name, price, description, url}) => {
    const appIsReady = useCustomFonts();

    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        if(!isFavorite)
        {
            // it will add that product to wishlist database
            console.log(product_id + " " + name + " " + price + " " + description + " ")
        }
        else
        {
            // it will delete that product from wishlist database
        }




    };

    const handleProductClick = () => {
        Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
    };

    if (!appIsReady) {
        return null; // Or a custom loader
    } else {
        return (
            <View style={styles.cardContainer}>
                <Text style={styles.productName}>{name}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.price}>{price}</Text>
                <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
                    <Icon
                        name={isFavorite ? 'heart' : 'heart-o'}
                        size={24}
                        color={isFavorite ? 'red' : 'gray'}
                    />
                </TouchableOpacity>
                <CustomButton title="GO TO PRODUCT" onPress={handleProductClick} styleType={'productCard'}
                              style={styles.productCardButton}/>
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
        fontFamily: 'Abel_400Regular',
        fontWeight: '400',
        textTransform: 'uppercase',
        letterSpacing: 1.20,
        position: 'absolute',
        top: '10%',
        left: '4%',
        right: '15%',
    },
    description: {
        color: '#615143',
        fontSize: 10,
        fontFamily: 'Abel_400Regular',
        fontWeight: '400',
        letterSpacing: 1,
        position: 'absolute',
        top: '24%',
        left: '4%',
    },
    price: {
        color: '#615143',
        fontSize: 13,
        fontFamily: 'Abel_400Regular',
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
        fontFamily: 'Abel_400Regular',
        fontWeight: '400',
        letterSpacing: 0.80,
        position: 'absolute',
        top: '67%',
        left: '4%',
    },
    productCardButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    favoriteButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
    },
});

export default ProductCard;
