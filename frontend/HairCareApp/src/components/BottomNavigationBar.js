import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Replace MaterialIcons with any other icon set

const BottomNavigationBar = ({ navigation }) => {
    return (
        <View style={styles.navBarContainer}>
            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('HairProduct')}>
                <Icon name="grid-on" size={30} color="#362A20" />
                <Text style={styles.navLabel}>PRODUCTS</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('WishList')}>
                <Icon name="favorite-border" size={30} color="#362A20" />
                <Text style={styles.navLabel}>WISHLIST</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('HairQuiz')}>
                <Icon name="person-outline" size={30} color="#362A20" />
                <Text style={styles.navLabel}>HAIR QUIZ</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    navBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(97,81,67,0.12)', // Assuming a white background
        paddingVertical: 10,
    },
    navLabel: {
        fontSize: 12,
        color: '#362A20',
        textAlign: 'center', // Ensures text is centered within its container
    },
    // Additional style for the TouchableOpacity to align icon and text
    navButton: {
        alignItems: 'center', // Aligns children (icon and text) in the center horizontally
        justifyContent: 'center', // Centers children vertically within the touchable area
    },
    // ... other styles ...
});

export default BottomNavigationBar;
