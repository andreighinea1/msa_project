import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import {LoginScreen, RegisterScreen, HairQuizScreen, HairProductsScreen, WishlistScreen} from "./src/pages";
import BottomNavigationBar from "./src/components/BottomNavigationBar";
import {getToken} from "./src/utils";


const Stack = createNativeStackNavigator();

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            const token = await getToken();
            if (token) {
                setIsAuthenticated(true);
            }
        };
        checkToken();
    }, []);

    return (
        <NavigationContainer>
            {isAuthenticated ? (
                <Stack.Navigator initialRouteName="WishList">
                    <Stack.Screen
                        name="HairType"
                        component={HairQuizScreen}
                        options={{headerShown: false}}/>
                    <Stack.Screen
                        name="HairProduct"
                        component={HairProductsScreen}
                        options={{headerShown: false}}/>
                    <Stack.Screen
                        name="WishList"
                        component={WishlistScreen}
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
                        component={LoginScreen}
                        options={{headerShown: false}}/>
                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen}
                        options={{headerShown: false}}/>
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
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
