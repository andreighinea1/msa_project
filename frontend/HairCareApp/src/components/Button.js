import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const CustomButton = ({title, onPress, styleType = 'default'}) => {
    return (
        <TouchableOpacity style={[styles.button, styles[styleType].button]} onPress={onPress}>
            <Text style={[styles.text, styles[styleType].text]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        // Default button styles
        paddingVertical: 5,
        paddingHorizontal: 13,
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        // Default text styles
        textAlign: 'center',
    },
    default: {
        button: {
            width: 292,
            backgroundColor: '#615143',
        },
        text: {
            color: 'white',
        },
    },
    productCard: {
        button: {
            width: '35%',
            height: '14%',
            backgroundColor: '#020953',
            borderRadius: 40,
        },
        text: {
            color: '#F9F5F0',
            fontSize: 9,
            fontFamily: 'Abel',
            fontWeight: '400',
            textTransform: 'uppercase',
            letterSpacing: 0.90,
        },
    },
});

export default CustomButton;
