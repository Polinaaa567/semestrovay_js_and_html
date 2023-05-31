



// let name = localStorage.getItem('name')
// let header = document.querySelector('header');

// header.textContent = `Привет, ${name}!`;

// // header.textContent
function Name() {
    let name = document.getElementById('name').value;

    if(name === '') {
        alert('Введите имя!!!!');
    } else {
        localStorage.setItem('username', name);
        window.location.href = 'main.html';
    }
}

let submitButton = document.getElementById('submit');

submitButton.addEventListener('click', (event)=> {
    Name();
});