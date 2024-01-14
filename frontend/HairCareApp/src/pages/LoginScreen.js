import React, {useState} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
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

    const handleQuizNavigation = () => {
        navigation.navigate('HairType');
    };

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
                <Button title="Go to HairType" onPress={handleQuizNavigation}/>
                {errorMessage ? <Text>{errorMessage}</Text> : null}
            </View>
        </ImageBackground>
    );
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
        backgroundColor: 'transparent', // Make sure this is transparent
    },
    loginTitle: {
        width: 240,               // width in React Native is in density-independent pixels
        height: 63,               // height in density-independent pixels
        color: '#362A20',         // color code
        textAlign: 'center',      // text alignment
        fontFamily: 'Prata',      // make sure this font is imported and available
        fontSize: 30,             // font size
        fontStyle: 'normal',      // font style
        fontWeight: '400',        // font weight
        lineHeight: 63,           // line height
        textTransform: 'uppercase', // text transformation
        alignSelf: 'center',      // centering the text horizontally
        marginTop: 50,            // adjust as needed for top spacing
        // Note: flex-shrink is not typically used the same way in React Native
    }
    // ... Other styles for text, buttons, etc. ...
});
export default LoginScreen;
