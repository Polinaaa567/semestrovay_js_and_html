'use strict';

class Form {
    constructor() {
        this.form = document.createElement('form');
        this.askLabel = document.createElement('label');
        this.nameInput = document.createElement('input');
        this.buttonNext = document.createElement('button');
    }
    
    async createForm() {
        this.askLabel.innerText = "Введите своё имя";
        this.askLabel.htmlFor = 'name';
    
        this.nameInput.type = 'text';
        this.nameInput.id = 'name';
        this.nameInput.name = 'name';
        this.nameInput.placeholder = "Имя";
    
        this.buttonNext.id = 'Nextbutton'
        this.buttonNext.type = 'submit';
        this.buttonNext.innerText = 'Далее';
        
        this.form.append(this.askLabel, this.nameInput, this.buttonNext);
        document.body.append(this.form);
    }
    
    async saveUsername(name) {
        localStorage.setItem('username', name); //хранение данных в браузере
    }

    random(min, max) {
        let rand = min + Math.random() * (max - min + 1);
        return Math.floor(rand);
    }
    
    async addEventListener() {
        this.buttonNext.addEventListener('click', async (event) => {
            event.preventDefault();
            let name = this.nameInput.value;
            if(name === '') {
                alert('Введите имя!!!!');
            } else {
                await this.saveUsername(name);
                window.location.replace('main.html');
            }
        });

        this.buttonNext.addEventListener('mouseenter', async ()=> {
            let audio = new Audio('Welcome/files/2.mp3');
            audio.play();
    
            this.buttonNext.style.left = `${this.random(0, 100)}%`;
            this.buttonNext.style.top = `${this.random(0, 100)}%`;
        });
    }
}  
  
class Timer1 {
    constructor() {
        this.timeout;
        this.events = ['mousemove', 'keypress', 'click'];
    }
    
    async resetTimer() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.showInactiveMessage, 120000);
    }
    
    async showInactiveMessage() {
        alert('Вы долго не проявляли активность!');
    }
    
    async addEventListener() {
        this.events.forEach(event => {
            document.addEventListener(event, () =>this.resetTimer());
        });
      
        this.resetTimer();
    }
}
  
let form = new Form();
form.createForm();
form.addEventListener();
  
let timer = new Timer1();
timer.addEventListener();

let image = new Image();
image.src = 'Welcome/files/5.gif';
image.crossOrigin = '';

async function loaded() {
    document.body.appendChild(image);
}

image.onload = loaded;
