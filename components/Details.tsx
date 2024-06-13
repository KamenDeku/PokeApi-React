// Details.tsx
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import useFetchedInfo from '@/hooks/useFetchedInfo';
import { Card } from './Card'; // Reuse the Card component for styling

export function Details({ navigation, route }) {
    const { url } = route.params;
    const { info, loading, error } = useFetchedInfo(url);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    function handleClick() {
        navigation.navigate('Home');
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.detailContainer}>
                <View style={styles.headerRow}>
                    <Text style={styles.title}>ID: {info.id}</Text>
                    <Text style={styles.title}> {info.name}</Text>
                </View>
                <View style={styles.contentRow}>
                    <View style={styles.spritesContainer}>
                        <View style={styles.card}>
                            <Image source={{ uri: info.sprites.front_default }} style={styles.image} />
                        </View>
                        <View style={styles.card}>
                            <Image source={{ uri: info.sprites.back_default }} style={styles.image} />
                        </View>
                    </View>
                    <View style={styles.infoColumn}>
                        <View style={styles.card}>
                            <Text style={styles.subtitle}>Abilities:</Text>
                            {info.abilities.map((ability, index) => (
                                <Text key={index} style={styles.text}>{ability.ability.name}</Text>
                            ))}
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.subtitle}>Moves:</Text>
                            {info.moves.slice(0, 10).map((move, index) => (
                                <Text key={index} style={styles.text}>{move.move.name}</Text>
                            ))}
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        // Background color of Details
        backgroundColor: '#f0f0f0', // Color azulado
        flex: 1,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    detailContainer: {
        padding: 20,
        backgroundColor: '#e11212', // Color rojizo
        borderRadius: 10,
        shadowColor: '#000', // Color negro
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 5,
        elevation: 5,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    spritesContainer: {
        alignItems: 'center',
        marginRight: 20,
    },
    infoColumn: {
        flex: 1,
    },
    card: {
        alignItems: 'center',
        margin: 5,
        padding: 10,
        // Card background color
        backgroundColor: '#82dde4', //Color azulado
        borderRadius: 5,
        borderWidth: 2, // Adding a border width
        // Black border
        borderColor: '#000', //Color negro
    },
    centeredContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    image: {
        width: 150,
        height: 150, // Make the sprite larger
        marginBottom: 20,
    },
});
