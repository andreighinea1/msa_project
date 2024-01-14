import React, {useState} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {InputField, Button} from '../components';
import {BASE_URL, useCustomFonts} from "../utils";

const RegisterScreen = ({navigation}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async () => {
        // Add check for password confirmation before sending request
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password,
                    confirm_password: confirmPassword
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.detail || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setErrorMessage('An error occurred during registration');
        }
    };

    const handleLoginNavigation = () => {
        navigation.navigate('Login');
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
                <Text style={styles.loginTitle}>REGISTER</Text>
                <View style={styles.container}>
                    <InputField
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <InputField
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                    />
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
                    <InputField
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
                    <Button title="Register" onPress={handleRegister}/>
                    <Button title="Go to Login" onPress={handleLoginNavigation}/>
                    {errorMessage ? <Text>{errorMessage}</Text> : null}
                </View>
            </ImageBackground>
        );
    }
};
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
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
export default RegisterScreen;
