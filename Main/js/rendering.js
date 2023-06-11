import {NameGet, PokemonTable, PokemonMangaAnime} from './main.js'

class PokemonDatabase {
  constructor() {
    this.slideIndex = 0;
    this.images = ['Main/files/1.jpg', 'Main/files/2.jpg'];
    this.filterTypes = ['water', 'grass', 'fire', 'flying', 'bug'];

    this.name_get = NameGet.name_get;
    this.createTable = PokemonTable.createTable;
    this.filterTable = PokemonTable.filterTable;
    this.filterTableByName = PokemonTable.filterTableByName;
    this.addRelatedInfo = PokemonMangaAnime.addRelatedInfo;

    this.init();
  }

  init() {
    this.site = document.createElement('my_var');
    this.site.className = 'my_var';

    // Слайд-шоу
    this.pokemonImg = document.createElement('img');
    this.pokemonImg.width = 600;
    
    this.slideInterval = setInterval(async () => {
      this.slideIndex++;
      if (this.slideIndex >= this.images.length) {
        this.slideIndex = 0;
      }
      this.pokemonImg.src = this.images[this.slideIndex];
    }, 2000);

    this.site.appendChild(this.pokemonImg);

    // Описание сайта
    this.siteDescription = document.createElement('p');
    this.siteDescription.id = 'description';
    this.siteDescription.textContent = 'Welcome to the Pokemon Database! \
    Here you can find all the stats and info you need on your favorite Pokemon!';
    
    this.site.appendChild(this.siteDescription);

    // Фильтрация по типам
    this.filter = document.createElement('select');
    this.filter.id = 'filter';
    this.filter.addEventListener('change', this.filterTable);

    this.option = document.createElement('option');
    this.option.value = 'all';
    this.option.textContent = 'All types';
    
    this.filter.appendChild(this.option);

    this.filterTypes.forEach(type => {
        let option = document.createElement('option');
        option.value = type;
        option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        this.filter.appendChild(option);
    });

    this.site.appendChild(this.filter);

    //всё для сортировки
    this.sortCheckBox = document.createElement('input');
    this.sortCheckBox.type = 'checkbox';
    this.sortCheckBox.id = 'sort_CheckBox';
    this.sortCheckBox.addEventListener('change', async () => {
      let table = document.querySelector('table');
      let rows = Array.from(table.querySelectorAll('tr'));
      
      rows.shift();
      
      if (this.sortCheckBox.checked) {
        rows.sort((row1, row2) => {
          let id1 = Number(row1.querySelector('td').innerText);
          let id2 = Number(row2.querySelector('td').innerText);
          return id1 - id2;
        });
      }

      rows.forEach(row => table.appendChild(row));
    });

    this.sortLabel = document.createElement('label');
    this.sortLabel.innerText = 'Sort by ID';
    this.sortLabel.htmlFor = 'sort_CheckBox';

    this.sortLabel.appendChild(this.sortCheckBox);
    this.site.appendChild(this.sortLabel);

    // Поиск по табличке
    this.searchLabel = document.createElement('label');
    this.searchLabel.htmlFor = 'search';
    this.searchLabel.innerText = 'Search by name';
    
    this.searchInput = document.createElement('input');
    this.searchInput.type = 'text';
    this.searchInput.id = 'searchInput';
    this.searchInput.name = 'searchInput';
    
    this.searchButton = document.createElement('button');
    this.searchButton.id = 'search-button';
    this.searchButton.innerText = 'Find';

    this.searchButton.addEventListener('click', this.filterTableByName);

    this.searchInput.addEventListener('keydown', async (event)=> {
      if(event.key === 'Enter') {
        this.filterTableByName();
      }
    });

    this.searchLabel.appendChild(this.searchInput);
    this.searchLabel.appendChild(this.searchButton);

    this.site.appendChild(this.searchLabel);

    let table = document.getElementById('tableee');
    document.body.insertBefore(this.site, table);

    this.createTable();
    
    this.addRelatedInfo();
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

let Database = new PokemonDatabase();
Database.name_get();

let timer = new Timer1();
timer.addEventListener();