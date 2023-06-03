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
        window.location.replace('main.html')
    }
});

form.append(askLabel, nameInput, buttonNext);

document.body.append(form);

let image1 = new Image();

image1.src = '1.gif';
image1.crossOrigin = '';

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');

canvas.width = image1.width;
canvas.height = image1.height;

ctx.translate(canvas.width, 0);
ctx.scale(-1, 1);
ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);

let mirroredImage = new Image();
mirroredImage.src = canvas.toDataURL();

function loaded() {
    document.body.appendChild(image1);
}

image1.onload = loaded;