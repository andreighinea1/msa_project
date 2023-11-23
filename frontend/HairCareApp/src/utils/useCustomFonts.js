import {useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts, Abel_400Regular} from '@expo-google-fonts/abel';

export const useCustomFonts = () => {
    const [fontsLoaded] = useFonts({
        Abel_400Regular,
    });
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            if (fontsLoaded) {
                await SplashScreen.hideAsync();
                setAppIsReady(true);
            }
        }

        prepare();
    }, [fontsLoaded]);

    return appIsReady;
};
