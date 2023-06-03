import { filterTable} from "./data.js";

function name_get() {
    let username = localStorage.getItem('username');

    document.getElementById('username').innerHTML = username;
}

name_get()

let site = document.createElement('my_var');

let pokemonImg = document.createElement('img');
pokemonImg.src = '3.jpg';

let siteDescription = document.createElement('p');
siteDescription.textContent = 'Welcome to the Pokemon Database! \
Here you can find all the stats and info you need on your favorite Pokemon! \
Click on a Pokemon to learn more.';

let table = document.getElementById('tableee');
console.log(table)

let sortCheckBox = document.createElement('input');
sortCheckBox.type = 'checkbox';
sortCheckBox.id = 'sort-CheckBox';

let sortLabel = document.createElement('label');

function sortTable() {
    let table = document.querySelector('table');
    let rows = Array.from(table.querySelectorAll('tr'));
    
    rows.shift();
    
    if (sortCheckBox.checked) {
      rows.sort((row1, row2) => {
        let id1 = Number(row1.querySelector('td').innerText);
        let id2 = Number(row2.querySelector('td').innerText);
        return id1 - id2;
      });
    }
    
    rows.forEach(row => table.appendChild(row));
}

sortLabel.innerText = 'Sort by ID';
sortLabel.htmlFor = 'sort-CheckBox';

sortCheckBox.addEventListener('change', sortTable)
sortLabel.appendChild(sortCheckBox)

let filter = document.createElement('select');
filter.id = 'filter';
filter.addEventListener('change', filterTable);

let option = document.createElement('option');
option.value = 'all';
option.textContent = 'All types';
filter.appendChild(option);

let filterTypes = ['water', 'grass', 'fire', 'flying', 'bug'];

filterTypes.forEach(type => {
    let option = document.createElement('option');
    option.value = type;
    option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    filter.appendChild(option);
})

site.appendChild(pokemonImg);
site.appendChild(siteDescription);
site.appendChild(filter);
site.appendChild(sortLabel);

document.body.appendChild(site);

document.body.insertBefore(site, table);