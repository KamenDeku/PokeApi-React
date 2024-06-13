// Card.tsx
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export function Card({ data, navigation }) {
    const handlePress = () => {
        navigation.navigate('Details', { url: data.url });
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.card}>
            <Image source={{ uri: data.sprite }} style={styles.image} />
            <Text style={styles.text}>{data.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        margin: 5,
        padding: 10,
        backgroundColor: '#82dde4', // Card background color
        borderRadius: 5,
        borderWidth: 2, // Adding a border width
        borderColor: '#000000', // Black border
        width: 100, // Adjust width to fit 10 cards in a row
    },
    image: {
        width: 80,
        height: 80, // Make the sprite larger
    },
    text: {
        fontSize: 16,
        marginTop: 5,
        textAlign: 'center', // Ensure text is centered
    },
});