import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function App() {
    return (
        <View style={styles.app}>
            <Text style={styles.text}>
                Welcome to HairCareApp!
            </Text>
        </View>
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
