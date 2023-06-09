// функция которая возвращает данные в виде имени покемонов и url,
export async function fetchData() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=40');
    let data = await response.json();

    return data.results;
}

// в котором прописаны способности и тип
export async function fetchPokemonData(pokemonUrl) {
    let response = await fetch(pokemonUrl);
    let data = await response.json();

    return {
        id: data.id,
        name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
        type: data.types.map(type => type.type.name).join(', '),
        abilities: data.abilities.map(ability => ability.ability.name).join(', '), 
        image: data.sprites.front_default
    };
}

export async function fetchRelatedAnime() {
    let response = await fetch('https://api.jikan.moe/v4/anime?q=pokemon&limit=6');
    let data = await response.json();

    return data.data;
}

export async function fetchRelatedManga() {
    let response = await fetch('https://api.jikan.moe/v4/manga?q=pokemon&limit=10');
    let data = await response.json();

    return data.data;
}
