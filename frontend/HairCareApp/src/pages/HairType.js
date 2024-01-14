import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import BottomNavigationBar from "../components/BottomNavigationBar";
import CustomButton from "../components/Button";
const HairQuizScreen = ({ navigation }) => {
    const [selections, setSelections] = useState({
        health: '',
        texture: '',
        thickness: '',
        scalp: '',
        concerns: [],
    });

    const handleSelect = (category, option) => {
        setSelections(prevSelections => {
            let updatedSelections = {};

            if (category === 'concerns') {
                // Toggle selection for 'concerns' since multiple options are allowed
                updatedSelections = {
                    ...prevSelections,
                    [category]: prevSelections[category].includes(option) ?
                        prevSelections[category].filter(currentOption => currentOption !== option) :
                        [...prevSelections[category], option].slice(0, 2), // Max 2 options
                };
            } else {
                // Single selection for other categories
                updatedSelections = {
                    ...prevSelections,
                    [category]: prevSelections[category] === option ? '' : option,
                };
            }

            console.log(category, updatedSelections);
            return updatedSelections;
        });
    };

    const renderOptions = (category, optionsArray) => {
        return (
            <View style={styles.optionsRowContainer}>
                {optionsArray.map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={[
                            styles.optionButton,
                            selections[category] === option || selections[category].includes(option)
                                ? styles.selectedOptionButton : {}
                        ]}
                        onPress={() => handleSelect(category, option)}
                    >
                        <Text style={styles.optionText}>{option.toUpperCase()}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const handleSave = () => {
        // Implement save functionality
        console.log('Quiz selections saved:', selections);
        // Example: navigation.navigate('Results', { selections });
        navigation.navigate('HairProduct');
    };
    return (
        <ImageBackground
            source={require('../utils/pictures/background-pages.png')} // replace with your local image
            style={styles.backgroundImage}
        >
            <View style={styles.contentWrapper}>
                <View style={ styles.titleContainer}>
                    <Text style={styles.title}>Hair Quiz</Text>
                </View>

                <View style={styles.quizContainer}>
                    <Text style={styles.subtitle}>Health</Text>
                    {renderOptions('health', ['healthy', 'chemically treated'])}
                    <Text style={styles.subtitle}>Texture</Text>
                    {renderOptions('texture', ['straight', 'wavy', 'curly', 'coily'])}
                    <Text style={styles.subtitle}>Strand Thickness</Text>
                    {renderOptions('thickness', ['fine', 'medium', 'thick'])}
                    <Text style={styles.subtitle}>Scalp Condition</Text>
                    {renderOptions('scalp', ['balanced', 'oily', 'dry'])}
                    <Text style={styles.subtitle}>Primary Concerns</Text>
                    {renderOptions('concerns', ['volume', 'moisture', 'curl definition', 'damage repair'])}
                </View>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
            <BottomNavigationBar navigation={navigation} />
    </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    contentWrapper: {
        flex: 1,
    },
    titleContainer: {
        // Styles for the title container
        paddingTop: 10,
        alignItems: 'center',
    },
    quizContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 100,
        // Other styles as needed
    },
    title: {
        fontSize: 30,
        color: '#362A20',
        fontFamily: 'Prata',
        alignSelf: 'center',
        marginTop: 50,
        textTransform: 'uppercase',
    },
    subtitle: {
        fontSize: 15,
        marginVertical: 10,
        alignSelf: 'flex-start', // Align the subtitle text to the left
        marginLeft: 20, // Add some left margin if you want some space from the left edge
        color: '#615143'
    },
    optionsContainer: {
        alignItems: 'flex-start', // Align items to the start of the cross axis
        width: '100%',
    },
    optionButton: {
        backgroundColor: 'rgba(217, 217, 217, 0.24)',
        paddingVertical: 10,
        paddingHorizontal: 10,
        margin: 5, // Add margin around each button
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: '#615143', // Border color
        borderWidth: 1,        // Border thickness, adjust as needed
    },
    selectedOptionButton: {
        backgroundColor: 'rgba(97, 81, 67, 0.35)',
    },
    optionText: {
        fontSize: 10,
        color: '#362A20',
        fontFamily: 'Abel'
    },
    optionsRowContainer: {
        flexDirection: 'row', // Arrange items in a row
        flexWrap: 'wrap',    // Allow items to wrap to the next line if the row is full
        alignItems: 'flex-start', // Align items to the start of the cross axis
        marginHorizontal: -5, // Negative margin to counteract the button margin for edge alignment
    },
    saveButton: {
        backgroundColor: '#615143', // Button color
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: 'center',
        marginBottom:110
    },
    saveButtonText: {
        color: '#F9F5F0', // Text color
        fontSize: 15,
        textAlign: 'center', // Center text
        fontFamily: 'Abel', // Use your desired font
    },


    // ... other styles you may need ...
});

export default HairQuizScreen;