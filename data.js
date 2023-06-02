let url = 'https://pokeapi.co/api/v2/pokemon';


// функция которая возвращает данные в виде имени покемонов и url,

async function fetchData() {
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
        abilities: data.abilities.map(ability => ability.ability.name).join(', ')
    }
}

function createTable(pokemonList) {
    let table = document.createElement('table');
    let idHeader = document.createElement('th');
    let nameHeader = document.createElement('th');
    let typeHeader = document.createElement('th');
    let abilitieHeader = document.createElement('th');
    let headerRow = document.createElement('tr');

    idHeader.textContent = 'id';
    nameHeader.textContent = 'name';
    typeHeader.textContent = 'type';
    abilitieHeader.textContent = 'abilitie';

    headerRow.appendChild(idHeader, nameHeader, typeHeader, abilitieHeader);

    table.appendChild(headerRow);

    pokemonList.forEach(async (pokemon) => {

        let {id, name, type, abilities} = await fetchPokemonData(pokemon.url);

        let row = document.createElement("tr");
        let idCell = document.createElement("td");
        let nameCell = document.createElement("td");
        let typeCell = document.createElement('th');
        let abilitieCell = document.createElement('th');

        idCell.innerText = id;
        nameCell.innerText = name;
        typeCell.innerText = type;
        abilitieCell.innerText = abilities;

        row.appendChild(idCell, nameCell, typeCell, abilitieCell);
        table.appendChild(row);
    });

    document.body.appendChild(table);
}

fetchData();