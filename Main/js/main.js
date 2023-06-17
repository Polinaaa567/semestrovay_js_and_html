'use strict';

import {PokemonAPI, MangaAnimeAPI} from "./data.js";

export class NameGet{
    static name_get() {
        this.username = localStorage.getItem('username');
      
        document.getElementById('username').innerHTML = this.username;
    }
}

let table = document.createElement('table');
let headerRow = document.createElement('tr');

let headers = ['ID', 'Имя', 'Тип', 'Способности', 'Фотография'];

headers.forEach(header => {
    let th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
})

table.appendChild(headerRow);

export class PokemonTable{
    async createPokemonRow(pokemon) {
        let {id, name, type, abilities, image} = await PokemonAPI.fetchPokemonData(pokemon.url);
    
        let row = document.createElement("tr"); //контейнер создания строки таблицы
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

        row.childNodes.forEach(cell => {
            cell.addEventListener('mouseover', async() => {
              cell.style.backgroundColor = this.getRandomColor();
            });
            cell.addEventListener('mouseout', async () => {
              cell.style.backgroundColor = '';
            });
          });
        
            
        table.appendChild(row);
    }

    getRandomColor() {
        const letters = 'ABCDEF';
        let color = '#';
        
        for (let i = 0; i < 3; i++) {
            let lightColor = letters[Math.floor(Math.random() * letters.length)];
            color += lightColor + lightColor;
        }

        return color;
    }

    static async createTable() {
        let pokemonList = await PokemonAPI.fetchData(); 
        let pokemonTable = new PokemonTable();
    
        pokemonList.map(pokemon => pokemonTable.createPokemonRow(pokemon))

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
    
    static async sortTable() {
        let rows = Array.from(table.querySelectorAll('tr'));
      
        rows.shift();
      
        rows.sort((row1, row2) => {
            let id1 = Number(row1.querySelector('td').innerText);
            let id2 = Number(row2.querySelector('td').innerText);
            
            return id1 - id2;
        });

        rows.forEach(row => table.appendChild(row));
    }

    static async sortTablebyName() {
        let rows = Array.from(table.querySelectorAll('tr'));
      
        rows.shift();

        rows.sort((row1, row2) => {
            let name1 = row1.querySelector('td:nth-child(2)').innerText;
            let name2 = row2.querySelector('td:nth-child(2)').innerText;

            return name1.localeCompare(name2);
        })

        rows.forEach(row=>table.appendChild(row));
    }
}

export class PokemonMangaAnime{
    static async addRelatedInfo() {
        let relatedAnimeList = await MangaAnimeAPI.fetchRelatedAnime();
        let relatedMangaList = await MangaAnimeAPI.fetchRelatedManga();
      
        let relatedAnimeElem = document.createElement('div');
        let Pokemon_Anime = document.createElement('h2');
        Pokemon_Anime.innerText = 'Аниме с Покемонами';
      
        document.body.appendChild(Pokemon_Anime);
        
        let relatedMangaElem = document.createElement('div');
      
        // Добавление информации об аниме
        relatedAnimeList.forEach(anime => {
            let animeElem = document.createElement('div');
            animeElem.style.display = 'flex';
            animeElem.style.alignItems = 'stretch';
            animeElem.style.justifyContent = 'space-between';
      
            let animePoster = document.createElement('img');
            animePoster.src = `https://shikimori.one${anime.image.preview}`;
            animePoster.id = 'animePoster';
            animePoster.width = 200;
      
            let animeInfo = document.createElement('div');
            let infoText = document.createElement('div7');

            if (anime.russian && anime.episodes > 5 && anime.score) {
                infoText.innerHTML = `
                    <strong>Название: ${anime.russian}</strong>
                    <p>Кол-во эпизодов: ${anime.episodes}</p>
                    <p>Оценка пользователей: ${anime.score}</p>
                    <p>Дата выхода: ${anime.aired_on}</p>
                `;

                animeInfo.appendChild(infoText);

                animeInfo.style.display = 'inline-block';
                animeInfo.style.verticalAlign = 'top';

                animeInfo.style.flexGrow = 1;
                animeInfo.style.paddingLeft = '10px';

                let animeLink = `https://shikimori.one${anime.url}` || '';

                animePoster.addEventListener('click', ()=> {
                    window.open(animeLink, '_blanc');
                });
      
                animeElem.appendChild(animePoster);
                animeElem.appendChild(animeInfo);
              
                relatedAnimeElem.appendChild(animeElem);

                let hrElem = document.createElement('hr');
                hrElem.style.borderTop = '1px solid #eee';
                relatedAnimeElem.appendChild(hrElem);
            }        
        });
      
        // Добавление информации о мангах
        relatedMangaList.forEach(manga => {
            let mangaElem = document.createElement('div');
            mangaElem.style.display = 'flex';
            mangaElem.style.alignItems = 'stretch';
            mangaElem.style.justifyContent = 'space-between';
      
            let mangaPoster = document.createElement('img');
            mangaPoster.src = `https://shikimori.one${manga.image.original}`;
            mangaPoster.id = 'mangaPoster';
            mangaPoster.width = 200;

            let mangaInfo = document.createElement('div');
            let infoText = document.createElement('div7');

            if (manga.russian && manga.chapters > 5 && manga.score != 0) {

                infoText.innerHTML = `
                    <strong>Название: ${manga.russian}</strong>
                    <p>Кол-во глав: ${manga.chapters}</p>
                    <p>Оценка пользователей: ${manga.score}</p>
                    <p>Дата выхода: ${manga.aired_on}</p>
                `;

                mangaInfo.appendChild(infoText);

                mangaInfo.style.display = 'inline-block';
                mangaInfo.style.verticalAlign = 'top';

                mangaInfo.style.flexGrow = 1;
                mangaInfo.style.paddingLeft = '10px';

                let MangaLink = `https://shikimori.one${manga.url}` || '';
                    
                    mangaPoster.addEventListener('click', ()=> {
                        window.open(MangaLink, '_blanc');
                    });
        
                mangaElem.appendChild(mangaPoster);
                mangaElem.appendChild(mangaInfo);
        
                relatedMangaElem.appendChild(mangaElem);

                let hrElem = document.createElement('hr');
                hrElem.style.borderTop = '1px solid #eee';
                relatedMangaElem.appendChild(hrElem);
            }
        });
      
        document.body.appendChild(relatedAnimeElem);
      
        let Pokemon_Manga = document.createElement('h2');
        Pokemon_Manga.innerText = 'Манги с Покемонами';
      
        document.body.appendChild(Pokemon_Manga);
        document.body.appendChild(relatedMangaElem);
    }
}