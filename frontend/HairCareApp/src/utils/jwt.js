import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

export const storeToken = async (token) => {
    try {
        await AsyncStorage.setItem('userToken', token);
    } catch (error) {
        console.error('Error storing the auth token', error);
    }
};

export const isTokenValid = async () => {
    const token = await getToken();
    if (!token || isTokenExpired(token)) {
        await removeToken();
        return false;
    }
    return true;
}

const getToken = async () => {
    try {
        return await AsyncStorage.getItem('userToken');
    } catch (error) {
        console.error('Error retrieving the auth token', error);
        return null;
    }
};

const isTokenExpired = (token) => {
    try {
        console.log(token);
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Get current time in seconds
        return decoded.exp < currentTime;
    } catch (error) {
        console.error("Token decoding error:", error);
        return true; // Assume expired if there's an error
    }
};

const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('userToken');
    } catch (error) {
        console.error('Error removing the auth token', error);
    }
};
