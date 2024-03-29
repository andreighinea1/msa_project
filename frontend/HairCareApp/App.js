import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppState, StyleSheet} from 'react-native';
import {LoginScreen, RegisterScreen, HairQuizScreen, HairProductsScreen, WishlistScreen} from "./src/pages";
import BottomNavigationBar from "./src/components/BottomNavigationBar";
import {isTokenValid, storeToken, useCustomFonts} from "./src/utils";


const Stack = createNativeStackNavigator();

function App() {
    const appIsReady = useCustomFonts();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
                checkToken();
            }
        });

        return () => {
            subscription.remove();
        };
    }, []);

    const checkToken = async () => {
        const tokenValid = await isTokenValid();
        console.log("Token valid: " + tokenValid);
        setIsAuthenticated(tokenValid);
    };

    if (!appIsReady) {
        return null; // Or a custom loader
    } else {
        return (
            <NavigationContainer>
                {isAuthenticated ? (
                    <Stack.Navigator initialRouteName="HairProduct">
                        <Stack.Screen
                            name="HairProduct"
                            component={HairProductsScreen}
                            options={{headerShown: false}}/>
                        <Stack.Screen
                            name="WishList"
                            component={WishlistScreen}
                            options={{headerShown: false}}/>
                        <Stack.Screen
                            name="HairQuiz"
                            component={HairQuizScreen}
                            options={{headerShown: false}}/>
                        <Stack.Screen
                            name="NavBar"
                            component={BottomNavigationBar}
                            options={{headerShown: false}}/>
                    </Stack.Navigator>
                ) : (
                    <Stack.Navigator initialRouteName="Login">
                        <Stack.Screen
                            name="Login"
                            options={{headerShown: false}}>
                            {props =>
                                <LoginScreen {...props} onLoginSuccess={() => setIsAuthenticated(true)}/>
                            }
                        </Stack.Screen>
                        <Stack.Screen
                            name="Register"
                            component={RegisterScreen}
                            options={{headerShown: false}}/>
                    </Stack.Navigator>
                )}
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    app: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

export default App;
