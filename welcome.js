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

