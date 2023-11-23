import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Abel_400Regular } from '@expo-google-fonts/abel';

const InputField = (props) => {
    let [fontsLoaded] = useFonts({
        Abel_400Regular,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
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
        flexDirection: 'column',
        justifyContent: 'center',
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
