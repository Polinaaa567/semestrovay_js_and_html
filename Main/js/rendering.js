'use strict';

import {NameGet, PokemonTable, PokemonMangaAnime} from './main.js';

class PokemonDatabase {
  constructor() {
    this.slideIndex = 0;
    this.images = ['Main/files/1.jpg', 'Main/files/2.jpg'];
    this.filterTypes = ['water', 'grass', 'fire', 'flying', 'bug'];
    this.SortRadioButtons = ['ID', 'Имени'];

    this.name_get = NameGet.name_get;
    this.createTable = PokemonTable.createTable;
    this.filterTable = PokemonTable.filterTable;
    this.filterTableByName = PokemonTable.filterTableByName;
    this.addRelatedInfo = PokemonMangaAnime.addRelatedInfo;
    this.sortByName = PokemonTable.sortTablebyName;

    this.init();
  }

  init() {
    this.site = document.createElement('my_var');
    this.site.className = 'my_var';
 
    // Слайд-шоу
    this.pokemonImg = document.createElement('img');
    this.pokemonImg.id = 'Slide-Show';
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
    
    this.siteDescription.textContent = 'Добро пожаловать в базу данных о Покемонах! \
    Здесь вы можете найти всю необходимую статистику и информацию о вашем любимом \
    покемоне! А также информация об аниме и мангах';
    
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

    this.sortRadioGroup = document.createElement('my_div3');
    this.site.appendChild(this.sortRadioGroup);

    this.SortRadioButtons.forEach(sortBy => {
      let SortRadioButton = document.createElement('input');
      SortRadioButton.type = 'radio';
      SortRadioButton.value = sortBy;
      SortRadioButton.name = 'sortRadioButtons';
      SortRadioButton.id = `sort_radio_${sortBy}`;
      SortRadioButton.addEventListener('change', async () => {
        if (SortRadioButton.checked) {
          if (sortBy === 'ID') {
            await PokemonTable.sortTable();
          }
          else if (sortBy === 'Имени') {
            await PokemonTable.sortTablebyName();
          }
        }
      })
      
      let SortRadioButtonLabel = document.createElement('label');
      SortRadioButtonLabel.innerText = `Сортировать по ${sortBy}`;
      SortRadioButtonLabel.htmlFor = `sort_radio_${sortBy}`;

      this.sortRadioGroup.appendChild(SortRadioButtonLabel);
      this.sortRadioGroup.appendChild(SortRadioButton);
    })

    // Поиск по табличке
    this.searchLabel = document.createElement('label');
    this.searchLabel.htmlFor = 'search';
    this.searchLabel.innerText = 'Поиск по имени';
    
    this.searchInput = document.createElement('input');
    this.searchInput.type = 'text';
    this.searchInput.id = 'searchInput';
    this.searchInput.name = 'searchInput';
    
    this.searchButton = document.createElement('button');
    this.searchButton.id = 'search-button';
    this.searchButton.innerText = 'Найти';

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
