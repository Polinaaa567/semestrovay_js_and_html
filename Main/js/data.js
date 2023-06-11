export class PokemonAPI {

    // функция которая возвращает данные в виде имени покемонов и url,
    static async fetchData() {
        let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=40');
        let data = await response.json();
    
        return data.results;
    }

    // в котором прописаны способности и тип
    static async fetchPokemonData(pokemonUrl) {
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
}

export class MangaAnimeAPI {
    static async fetchRelatedAnime() {
        let response = await fetch('https://api.jikan.moe/v4/anime?q=pokemon');
        let data = await response.json();
    
        return data.data;
    }
    
    static async fetchRelatedManga() {
        let response = await fetch('https://api.jikan.moe/v4/manga?q=pokemon');
        let data = await response.json();
    
        return data.data;
    }
}