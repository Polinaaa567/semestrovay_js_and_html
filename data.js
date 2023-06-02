let url = 'https://pokeapi.co/api/v2/pokemon?limit=40';

// функция которая возвращает данные в виде имени покемонов и url,

export async function fetchData() {
    let response = await fetch(url);
    let data = await response.json();

    createTable(data.results);
}

// в котором прописаны способности и тип
async function fetchPokemonData(pokemonUrl) {
    let response = await fetch(pokemonUrl);
    let data = await response.json();

    return {
        id: data.id,
        name: data.name,
        type: data.types.map(type => type.type.name).join(', '),
        abilities: data.abilities.map(ability => ability.ability.name).join(', '), 
        image: data.sprites.front_default
    }
}

function createTable(pokemonList) {
    let table = document.createElement('table');
    let headerRow = document.createElement('tr');

    let headers = ['ID', 'Name', 'Type', 'Abilitie', 'Image']

    headers.forEach(header => {
        let th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);

    })
    
    table.appendChild(headerRow);

    pokemonList.forEach(async (pokemon) => {

        let {id, name, type, abilities, image} = await fetchPokemonData(pokemon.url);

        let row = document.createElement("tr");
        let idCell = document.createElement("td");
        let nameCell = document.createElement("td");
        let typeCell = document.createElement('td');
        let abilitieCell = document.createElement('td');
        let imageCell = document.createElement('td');
        let imageElem = document.createElement('img');

        idCell.innerText = id;
        nameCell.innerText = name;
        typeCell.innerText = type;
        abilitieCell.innerText = abilities;
        imageElem.src = image;
        
        imageCell.appendChild(imageElem);

        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(typeCell);
        row.appendChild(abilitieCell);
        row.appendChild(imageCell);
        
        table.appendChild(row);
    });

    let tableCon = document.getElementById("tableee")
    
    while (tableCon.firstChild) {
        tableCon.removeChild(tableCon.firstChild);
    }       
    tableCon.appendChild(table);
}

