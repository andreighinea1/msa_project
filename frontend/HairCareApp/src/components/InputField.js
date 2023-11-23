import React, { useEffect, useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Abel_400Regular } from '@expo-google-fonts/abel';

SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from hiding

const InputField = (props) => {
    const [fontsLoaded] = useFonts({
        Abel_400Regular,
    });

    useEffect(() => {
        async function prepare() {
            if (fontsLoaded) {
                await SplashScreen.hideAsync(); // Hide the splash screen when fonts are loaded
            }
        }

        prepare();
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null; // The SplashScreen will be automatically loaded
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
