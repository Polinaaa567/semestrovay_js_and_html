import {fetchData} from "./data.js";

function name_get() {
    let username = localStorage.getItem('username');

    document.getElementById('username').innerHTML = username;
}

name_get()

let buttonAll = document.createElement('button');
buttonAll.id = 'buttonAll'
buttonAll.textContent='Всё о покемонах';
buttonAll.addEventListener('click', fetchData)

document.body.appendChild(buttonAll);

let sortCheckBox = document.createElement('input');
sortCheckBox.type = 'checkbox';
sortCheckBox.id = 'sort-CheckBox';

let sortLabel = document.createElement('label');
sortLabel.innerText = 'Sort by ID';
sortLabel.htmlFor = 'sort-CheckBox';

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

sortCheckBox.addEventListener('change', sortTable)

document.body.appendChild(sortCheckBox);
document.body.appendChild(sortLabel);