import { fetchData} from "./data.js";

function name_get() {
    let username = localStorage.getItem('username');

    document.getElementById('username').innerHTML = username;
}

name_get()

let buttonAll = document.createElement('button');
buttonAll.id = 'buttonAll'
buttonAll.textContent='Всё о покемонах';

buttonAll.addEventListener('click', fetchData)

document.body.appendChild(buttonAll)