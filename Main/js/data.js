'use strict';

export class PokemonAPI {

    // функция которая возвращает данные в виде имени покемонов и url,
    static async fetchData() {
        let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=40');
        let data = await response.json();
    
        return data.results; //массив объектов
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
        let response = await fetch('https://shikimori.one/api/animes?limit=100&search=pokemon');
        await new Promise(resolve => setTimeout(resolve, 1000));
        let data = await response.json();
            
        return data;
    }

    static async fetchRelatedManga() {
        let response = await fetch('https://shikimori.one/api/mangas?limit=100&search=pokemon');
        await new Promise(resolve => setTimeout(resolve, 1000));
        let data = await response.json();
    
        return data;
    }
}
