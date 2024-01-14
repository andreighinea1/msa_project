import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token) => {
    try {
        await AsyncStorage.setItem('userToken', token);
    } catch (e) {
        // saving error
    }
};

export const getToken = async () => {
    try {
        return await AsyncStorage.getItem('userToken');
    } catch (e) {
        // error reading value
        return null;
    }
};