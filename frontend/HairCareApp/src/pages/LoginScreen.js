import React, { useState } from 'react';
import { View, Text } from 'react-native';
import InputField from '../components/InputField'; // Import your custom InputField
import CustomButton from '../components/Button'; // Import your custom CustomButton

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                // Perform actions after successful login, like updating global state
            } else {
                setErrorMessage('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('An error occurred during login');
        }
    };

    // Placeholder function for Register button
    const handleRegisterNavigation = () => {
        navigation.navigate('Register');
    };

    return (
        <View>
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
            <CustomButton title="Login" onPress={handleLogin}/>
            <CustomButton title="Register" onPress={handleRegisterNavigation}/>
            {errorMessage ? <Text>{errorMessage}</Text> : null}
        </View>
    );
};

export default LoginScreen;
