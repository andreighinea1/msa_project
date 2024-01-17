import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useCustomFonts} from "../utils";

const CustomButton = ({title, onPress, styleType = 'default', isSelected = false}) => {
    const appIsReady = useCustomFonts();

    if (!appIsReady) {
        return null; // Or a custom loader
    } else {
        return (
            <TouchableOpacity
                style={[
                    styles.button,
                    styles[styleType].button,
                    isSelected && styles[styleType].selectedButton // Apply selected style if isSelected is true
                ]}
                onPress={onPress}
            >
                <Text
                    style={[
                        styles.text,
                        styles[styleType].text,
                        isSelected && styles[styleType].selectedText // Apply selected text style if isSelected is true
                    ]}
                >
                    {title}
                </Text>
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    button: {
        // Default button styles
        paddingVertical: 5,
        paddingHorizontal: 13,
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center', // Center the button
        marginVertical: 5, // Adds space above and below the input field
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
            height: '25%',
            backgroundColor: '#615143',
            borderRadius: 40,
            position: 'absolute', // Position the button absolutely
            bottom: 5,          // Distance from the bottom of the parent container
            right: 10,           // Distance from the right of the parent container
        },
        text: {
            color: '#F9F5F0',
            fontSize: 9,
            fontFamily: 'Abel_400Regular',
            fontWeight: '400',
            textTransform: 'uppercase',
            letterSpacing: 0.90,
        },
    },
    productMenu: {
        button: {
            width: 100,
            height: 30,
            // backgroundColor: '#C9B8A1',
            borderRadius: 40,
            // position: 'absolute', // Position the button absolutely
            bottom: 10,          // Distance from the bottom of the parent container
            top: 50,
            marginHorizontal: 5,

        },
        text: {
            // color: '#F9F5F0',
            color: '#362A20',
            fontSize: 12,
            fontFamily: 'Abel_400Regular',
            fontWeight: '400',
            textTransform: 'uppercase',
            letterSpacing: 0.90,
        },
        selectedButton: {
            backgroundColor: '#615143', // Selected background color
        },
        selectedText: {
            color: 'white', // Selected text color
        },
    },
});

export default CustomButton;
