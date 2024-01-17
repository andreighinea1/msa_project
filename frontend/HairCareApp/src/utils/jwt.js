import AsyncStorage from '@react-native-async-storage/async-storage';
import {decode as atob} from 'base-64';

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
        const [, payload] = token.split('.');
        const decodedPayload = atob(payload);
        const {exp} = JSON.parse(decodedPayload);
        const currentTime = Date.now() / 1000;
        return exp < currentTime;
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
