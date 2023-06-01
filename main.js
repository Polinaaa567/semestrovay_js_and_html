
let username = localStorage.getItem('username');

document.getElementById('username').innerHTML = username;

let buttonAll = document.createElement('button');

buttonAll.id = 'buttonAll'

buttonAll.onclick = function() {
    // необходимо здесь подключать табличку с покемонами и чекбоксами
}

buttonAll.textContent='All';

document.body.appendChild(buttonAll)