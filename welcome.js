let form = document.createElement('form');

let askLabel = document.createElement('label');
askLabel.innerText = "Введите своё имя";
askLabel.htmlFor = 'name';

let nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.id = 'name';
nameInput.name = 'name';
nameInput.placeholder = "Имя";

let buttonNext = document.createElement('button');
buttonNext.id = 'Nextbutton'
buttonNext.type = 'submit';
buttonNext.innerText = 'Далее';

async function saveUsername(name) {
    await localStorage.setItem('username', name);
}

buttonNext.addEventListener('click', async (event) => {
    event.preventDefault();
    let name = nameInput.value;
    if(name === '') {
        alert('Введите имя!!!!');
    } else {
        await saveUsername(name);
        window.location.replace('main.html');
    }
});

form.append(askLabel, nameInput, buttonNext);

let image1 = new Image();

image1.src = '5.gif';
image1.crossOrigin = '';

function loaded() {
    document.body.appendChild(image1);
}

image1.onload = loaded;

document.body.append(form);

// maxElemLeft = document.documentElement.clientWidth - buttonNext.offsetWidth;
// maxElemTop = document.documentElement.clientHeight - buttonNext.offsetHeight;

// buttonNext.onmousemove = handler;

// function handler() {
//     elemLeft = Math.random() * maxElemLeft;
//     buttonNext.style.left = elemLeft + 'px';
//     elemTop = Math.random() * maxElemTop;
//     buttonNext.style.top = elemTop + 'px';

// }
let random = (min, max) => {
    let rand = min + Math.random() * (max - min + 1);
    return Math.floor(rand);
}

 buttonNext.addEventListener('mouseenter', ()=> {
    let audio = new Audio('2.mp3');
    audio.play();
    
    buttonNext.style.left = `${random(0, 90)}%`;
    buttonNext.style.top =  `${random(0, 90)}%`;
 })