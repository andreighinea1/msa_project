import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {InputField, Button} from '../components';

const LoginScreen = ({navigation}) => {
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
                body: JSON.stringify({email, password}),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                // TODO: Here navigate to next screen
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
            <Button title="Login" onPress={handleLogin}/>
            <Button title="Go to Register" onPress={handleRegisterNavigation}/>
            {errorMessage ? <Text>{errorMessage}</Text> : null}
        </View>
    );
};

export default LoginScreen;
