import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import {LoginScreen, RegisterScreen} from "./src/pages";
import HairQuizScreen from "./src/pages/HairType";
import HairProductsScreen from "./src/pages/HairProducts";
import WishListScreen from "./src/pages/Wishlist";
import BottomNavigationBar from "./src/components/BottomNavigationBar";


const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            {/*<Stack.Navigator initialRouteName="Login">*/}
            {/*    <Stack.Screen*/}
            {/*        name="Login"*/}
            {/*        component={LoginScreen}*/}
            {/*        options={{headerShown: false}}/>*/}
            {/*    <Stack.Screen*/}
            {/*        name="Register"*/}
            {/*        component={RegisterScreen}*/}
            {/*        options={{headerShown: false}}/>*/}
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
                    component={WishListScreen}
                    options={{headerShown: false}}/>
                <Stack.Screen
                    name="NavBar"
                    component={BottomNavigationBar}
                    options={{headerShown: false}}/>
            </Stack.Navigator>
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
