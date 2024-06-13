// useFetch.ts
import { useEffect, useState } from "react";

const useFetch = (limit = 10, offset = 0) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
                if (response.status !== 200) {
                    throw new Error("Error en la petición");
                }
                const data = await response.json();
                const detailedData = await Promise.all(
                    data.results.map(async (pokemon) => {
                        const pokemonDetails = await fetch(pokemon.url);
                        const pokemonData = await pokemonDetails.json();
                        return {
                            name: pokemon.name,
                            url: pokemon.url,
                            sprite: pokemonData.sprites.front_default,
                        };
                    })
                );
                setList((prevList) => [
                    ...prevList,
                    ...detailedData.filter((pokemon) => !prevList.find((item) => item.name === pokemon.name)),
                ]);
            } catch (error) {
                setError(error as any);
            } finally {
                setLoading(false);
            }
        };
        fetchPokemons();
    }, [limit, offset]);

    return { list, loading, error };
};

export default useFetch;