import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {InputField, Button} from '../components';

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
            const response = await fetch('http://localhost:8000/auth/register', {
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


    return (
        <View>
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
    );
};

export default RegisterScreen;
