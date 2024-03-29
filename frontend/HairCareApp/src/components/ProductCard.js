import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {BASE_URL, getJwtToken, useCustomFonts} from '../utils';
import CustomButton from "./Button";
import {Linking} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace MaterialIcons with any other icon set


const {width} = Dimensions.get('window');
const cardWidth = width * 0.85; // 85% of the screen width
// const cardHeight = cardWidth * 0.42; // Maintain aspect ratio

const ProductCard = ({product_id, name, price, description, url}) => {
    const appIsReady = useCustomFonts();

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const checkIfFavorite = async () => {
            try {
                const response = await fetch(`${BASE_URL}/wishlist/get`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${await getJwtToken()}`
                    },
                    body: JSON.stringify({product_id}),
                });

                if (response.ok) {
                    const data = await response.json();
                    setIsFavorite(data.is_wishlisted);
                } else {
                    console.error('Failed to fetch wishlist status');
                }
            } catch (error) {
                console.error('Error fetching wishlist status: ', error);
            }
        };

        checkIfFavorite();
    }, [product_id]); // Dependency array ensures this effect runs only when product_id changes

    const toggleFavorite = async () => {
        const endpoint = isFavorite ? `${BASE_URL}/wishlist/remove` : `${BASE_URL}/wishlist/add`;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await getJwtToken()}`
                },
                body: JSON.stringify({product_id}),
            });

            if (response.ok) {
                console.log(isFavorite ? 'Removed from wishlist:' : 'Added to wishlist:', product_id);
                setIsFavorite(!isFavorite);  // Change state only if successful
            } else {
                console.error('Failed to update wishlist');
            }
        } catch (error) {
            console.error('Error updating wishlist: ', error);
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
                <View style={styles.contentContainer}>
                    <Text style={styles.productName}>{name}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.marketPrice}>Market price</Text>
                        <Text style={styles.price}>{price}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
                    <Icon
                        name={isFavorite ? 'heart' : 'heart-o'}
                        size={24}
                        color={isFavorite ? 'red' : 'gray'}
                    />
                </TouchableOpacity>
                <CustomButton
                    title="GO TO PRODUCT"
                    onPress={handleProductClick}
                    styleType={'productCard'}
                    style={styles.productCardButton}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    cardContainer: {
        width: cardWidth,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 1, // Add bottom margin for spacing between cards
    },
    contentContainer: {
        paddingRight: '12%',
        marginTop: 2,
        marginBottom: 2,
    },
    priceContainer: {
        marginTop: 10, // Add space above the price section
    },
    productName: {
        color: '#615143',
        fontSize: 12,
        fontFamily: 'Abel_400Regular',
        fontWeight: '400',
        textTransform: 'uppercase',
        letterSpacing: 1.20,
    },
    description: {
        color: '#615143',
        fontSize: 10,
        fontFamily: 'Abel_400Regular',
        fontWeight: '400',
        letterSpacing: 1,
        marginTop: 4,
        marginBottom: 5,
    },
    price: {
        color: '#615143',
        fontSize: 13,
        fontFamily: 'Abel_400Regular',
        fontWeight: '400',
        textTransform: 'uppercase',
        letterSpacing: 1.30,
    },
    marketPrice: {
        color: '#615143',
        fontSize: 8,
        fontFamily: 'Abel_400Regular',
        fontWeight: '400',
        letterSpacing: 0.80,
    },
    productCardButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    favoriteButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        zIndex: 1,
    },
});

export default ProductCard;
