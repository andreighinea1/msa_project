import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, ImageBackground, Dimensions} from 'react-native';
import ProductCard from '../components/ProductCard';
import BottomNavigationBar from "../components/BottomNavigationBar";
import {getJwtToken, BASE_URL} from "../utils";

const WishlistScreen = ({navigation}) => {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        fetchWishlistItems();
    }, []);

    const fetchWishlistItems = async () => {
        try {
            const response = await fetch(`${BASE_URL}/wishlist/view`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await getJwtToken()}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setWishlistItems(data);
            } else {
                console.log("Error fetching wishlist data");
            }
        } catch (error) {
            console.error('Error fetching wishlist data: ', error);
        }
    };

    const ItemSeparator = () => <View style={{height: 20}}/>;

    return (
        <ImageBackground
            source={require('../utils/pictures/background-pages.png')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Wishlist</Text>
                <FlatList
                    data={wishlistItems}
                    renderItem={({item}) => <ProductCard {...item} />}
                    keyExtractor={item => item.product_id.toString()}
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
        paddingBottom: 50,
    },
});

export default WishlistScreen;
