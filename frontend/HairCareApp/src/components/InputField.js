import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {useCustomFonts} from '../utils';

const InputField = (props) => {
    const appIsReady = useCustomFonts();

    if (!appIsReady) {
        return null; // Or a custom loader
    } else {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} {...props} />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: 230,
        height: 34,
        alignSelf: 'center', // Center the input field container
        flexDirection: 'column',
        justifyContent: 'center',
        marginVertical: 5, // Adds space above and below the input field
    },
    input: {
        color: '#362A20',
        fontFamily: 'Abel_400Regular',
        fontSize: 9,
        fontStyle: 'normal',
        fontWeight: '400',
        letterSpacing: 0.9,
        textTransform: 'uppercase',
    },
});

export default InputField;
