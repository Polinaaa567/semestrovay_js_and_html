import {PokemonAPI, MangaAnimeAPI} from "./data.js";

export class NameGet{
    static name_get() {
        let username = localStorage.getItem('username');
      
        document.getElementById('username').innerHTML = username;
    }
}

let table = document.createElement('table');
let headerRow = document.createElement('tr');

let headers = ['ID', 'Name', 'Type', 'Abilitie', 'Image'];

headers.forEach(header => {
    let th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
})

table.appendChild(headerRow);

export class PokemonTable{
    async createPokemonRow(pokemon) {
        let {id, name, type, abilities, image} = await PokemonAPI.fetchPokemonData(pokemon.url);
    
        let row = document.createElement("tr");
        let idCell = document.createElement("td");
        let nameCell = document.createElement("td");
        let typeCell = document.createElement('td');
        let abilitieCell = document.createElement('td');
        let imageCell = document.createElement('td');
        let imageElem = document.createElement('img');
        imageElem.className = 'pokemon-image';
    
        idCell.innerText = id;
        nameCell.innerText = name;
        typeCell.innerText = type;
        abilitieCell.innerText = abilities;
        imageElem.src = image;
        imageElem.width =120;
            
        imageCell.appendChild(imageElem);
          
        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(typeCell);
        row.appendChild(abilitieCell);
        row.appendChild(imageCell);
            
        table.appendChild(row);
    }

    static async createTable() {
        let pokemonList = await PokemonAPI.fetchData(); 
        let pokemonTable = new PokemonTable();
        await Promise.all(
            pokemonList.map(pokemon => pokemonTable.createPokemonRow(pokemon))
        );
    
        let tableCon = document.getElementById("tableee");
        
        tableCon.appendChild(table);
    }

    static async filterTable() {
        let rows = Array.from(table.querySelectorAll('tr'));
        
        rows.shift();
      
        let selectedType = filter.value;
      
        if (selectedType !== 'all') {
            rows.forEach(row => {
                let typeCell = row.querySelector('td:nth-child(3)');
                
                if (!typeCell.innerText.includes(selectedType)) {
                    row.style.display = 'none';
                } 
                else {
                    row.style.display = '';
                }
            });
        } 
        else {
            rows.forEach(row => row.style.display = '');
        }
    }
      
    static async filterTableByName() {
        let searchValue = searchInput.value.toLowerCase();
      
        let rows = Array.from(table.querySelectorAll('tr'));
        
        rows.shift();
      
        rows.forEach(row => {
            let nameCell = row.querySelector('td:nth-child(2)');
            
            if (!nameCell.innerText.toLowerCase().includes(searchValue)) {
                row.style.display = 'none';
            } 
            else {
                row.style.display = '';
            }
        });
    }      
}

export class PokemonMangaAnime{
    static async addRelatedInfo() {
        let relatedAnimeList = await MangaAnimeAPI.fetchRelatedAnime();
        let relatedMangaList = await MangaAnimeAPI.fetchRelatedManga();
      
        let relatedAnimeElem = document.createElement('div');
        let Pokemon_Anime = document.createElement('h2');
        Pokemon_Anime.innerText = 'Pokemon Anime';
      
        document.body.appendChild(Pokemon_Anime);
        
        let relatedMangaElem = document.createElement('div');
      
        // Добавление информации об аниме
        relatedAnimeList.forEach(anime => {
            let animeElem = document.createElement('div');
      
            let animePoster = document.createElement('img');
            animePoster.src = anime.images.jpg.image_url;
            animePoster.width = 150;
            
      
            let animeInfo = document.createElement('div');
            if (anime.title_english && anime.episodes && anime.score) {
                animeInfo.innerHTML = `
                    <strong>${anime.title_english}</strong>
                    <p>Episodes: ${anime.episodes}</p>
                    <p>Rating: ${anime.score}</p>
                    <p>Description: ${anime.synopsis}</p>
                `;
      
                let animeLink = anime.url || '';

                animePoster.addEventListener('click', ()=> {
                    window.open(animeLink, '_blanc');
                });
      
                animeElem.appendChild(animePoster);
                animeElem.appendChild(animeInfo);
              
                relatedAnimeElem.appendChild(animeElem);
            }        
        });
      
        // Добавление информации о мангах
        relatedMangaList.forEach(manga => {
            let mangaElem = document.createElement('div');
      
            let mangaPoster = document.createElement('img');
            mangaPoster.src = manga.images.jpg.image_url;
            mangaPoster.width = 150;
             
            if (manga.title_english){
      
            let mangaInfo = document.createElement('div');
            mangaInfo.innerHTML = `
                <strong>${manga.title_english}</strong>
                <p>Chapters: ${manga.chapters}</p>
                <p>Rating: ${manga.scored}</p>
                <p>Description: ${manga.synopsis}</p>
            `;
      
            let MangaLink = manga.url || '';
                  
                mangaPoster.addEventListener('click', ()=> {
                    window.open(MangaLink, '_blanc');
                });
      
            mangaElem.appendChild(mangaPoster);
            mangaElem.appendChild(mangaInfo);
      
            relatedMangaElem.appendChild(mangaElem);
            }
        });
      
        document.body.appendChild(relatedAnimeElem);
      
        let Pokemon_Manga = document.createElement('h2');
        Pokemon_Manga.innerText = 'Pokemon Manga';
      
        document.body.appendChild(Pokemon_Manga);
        document.body.appendChild(relatedMangaElem);
    }
}