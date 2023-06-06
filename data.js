let url = 'https://pokeapi.co/api/v2/pokemon?limit=40';

// функция которая возвращает данные в виде имени покемонов и url,
async function fetchData() {
    let response = await fetch(url);
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

async function createTable() {
    let pokemonList = await fetchData(); 
    await Promise.all(
        pokemonList.map(pokemon => createPokemonRow(pokemon))
    );

    let tableCon = document.getElementById("tableee")
    
    while (tableCon.firstChild) {
        tableCon.removeChild(tableCon.firstChild);
    }       

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

createTable();