// функция которая возвращает данные в виде имени покемонов и url,
async function fetchData() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=40');
    let data = await response.json();

    return data.results;
}
// в котором прописаны способности и тип
async function fetchPokemonData(pokemonUrl) {
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

let table = document.createElement('table');
let headerRow = document.createElement('tr');

let headers = ['ID', 'Name', 'Type', 'Abilitie', 'Image']

headers.forEach(header => {
    let th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
})

table.appendChild(headerRow);

async function createPokemonRow(pokemon) {
    let {id, name, type, abilities, image} = await fetchPokemonData(pokemon.url);

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

export async function createTable() {
    let pokemonList = await fetchData(); 
    await Promise.all(
        pokemonList.map(pokemon => createPokemonRow(pokemon))
    );

    let tableCon = document.getElementById("tableee")
    
    tableCon.appendChild(table);
}

export async function filterTable() {
    let rows = Array.from(table.querySelectorAll('tr'));
    
    rows.shift();

    let selectedType = filter.value;

    if (selectedType !== 'all') {
        rows.forEach(row => {
            let typeCell = row.querySelector('td:nth-child(3)');
            if (!typeCell.innerText.includes(selectedType)) {
                row.style.display = 'none';
            } else {
                row.style.display = '';
            }
        });
    } else {
        rows.forEach(row => row.style.display = '');
    }
}

export async function filterTableByName() {
    let searchValue = searchInput.value.toLowerCase();

    let rows = Array.from(table.querySelectorAll('tr'));
    
    rows.shift();

    rows.forEach(row => {
        let nameCell = row.querySelector('td:nth-child(2)');
        if (!nameCell.innerText.toLowerCase().includes(searchValue)) {
            row.style.display = 'none';
        } else {
            row.style.display = '';
        }
    });
}

async function fetchRelatedAnime() {
    let response = await fetch('https://api.jikan.moe/v4/anime?q=pokemon&limit=6');
    let data = await response.json();

    return data.data;
}

async function fetchRelatedManga() {
    let response = await fetch('https://api.jikan.moe/v4/manga?q=pokemon&limit=10');
    let data = await response.json();

    return data.data;
}

async function addRelatedInfo() {
    let relatedAnimeList = await fetchRelatedAnime();
    let relatedMangaList = await fetchRelatedManga();

    let relatedAnimeElem = document.createElement('div');
    let Pokemon_Movie = document.createElement('h2');
    Pokemon_Movie.innerText = 'Pokemon Movie';

    document.body.appendChild(Pokemon_Movie);
    
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

            let animeTrailerLink = anime.url || '';
            console.log(animeTrailerLink);
            animePoster.addEventListener('click', ()=> {
                window.open(animeTrailerLink, '_blanc');
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
        mangaElem.appendChild(mangaPoster);
        if (manga.title_english){

        let mangaInfo = document.createElement('div');
        mangaInfo.innerHTML = `
            <strong>${manga.title_english}</strong>
            <p>Chapters: ${manga.chapters}</p>
            <p>Rating: ${manga.scored}</p>
            <p>Description: ${manga.synopsis}</p>
        `;
        mangaElem.appendChild(mangaInfo);

        relatedMangaElem.appendChild(mangaElem);
        }
    });

    // Добавление элементов на страницу
    document.body.appendChild(relatedAnimeElem);
    let Pokemon_Manga = document.createElement('h2');
    Pokemon_Manga.innerText = 'Pokemon Manga';

    document.body.appendChild(Pokemon_Manga);

    document.body.appendChild(relatedMangaElem);
}

// Добавление связанной информации для первого покемона из таблицы
addRelatedInfo();
