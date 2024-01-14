import React, {useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {Button, InputField} from '../components';
import {useCustomFonts, storeToken, BASE_URL} from "../utils";

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);

                await storeToken(data["access_token"]);
            } else {
                setErrorMessage('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('An error occurred during login');
        }
    };

    const handleRegisterNavigation = () => {
        navigation.navigate('Register');
    };

    const appIsReady = useCustomFonts();

    if (!appIsReady) {
        return null; // Or a custom loader
    } else {
        return (
            <ImageBackground
                source={require('../utils/pictures/background.png')} // For local images
                // source={{ uri: 'https://your-image-url.jpg' }} // For remote images
                style={styles.backgroundImage}
            >
                <Text style={styles.loginTitle}>LOGIN</Text>
                <View style={styles.container}>

                    <InputField
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <InputField
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <Button title="Login" onPress={handleLogin}/>
                    <Button title="Go to Register" onPress={handleRegisterNavigation}/>
                    {errorMessage ? <Text>{errorMessage}</Text> : null}
                </View>
            </ImageBackground>
        );
    }
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 80,
        backgroundColor: 'transparent',
    },
    loginTitle: {
        width: 240,
        height: 63,
        color: '#362A20',
        textAlign: 'center',
        fontFamily: 'Prata_400Regular',
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 63,
        textTransform: 'uppercase',
        alignSelf: 'center',
        marginTop: 50,
    }
});
export default LoginScreen;
