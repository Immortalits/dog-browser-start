import '../css/searchImageComponent.css';
import ContentComponent from '../contentComponent/contentComponent.js';

// async-await, a javascript megvárja, amíg az await utáni rész lefut/betölt
class SearchImage extends ContentComponent {

  constructor() {
    super();
    // példányosításkor megjelenítjük a keresőt automatikusan
    this.render();
  }

  // ez a metódus letölti az adatot az API-ról
  // a data változó objecteket tartalmazó tömb

  // megjeleníti a keresőt:
  render() {
    const markup = `
    <form class="dog-search">
      <span class="search-icon"></span>
      <input type="text" id="dogSearchInput">
      <input type="text" id="imageNumberInput" placeholder="1">      
      <button>Search</button>
    </form>
    `;

    document.querySelector('#header').insertAdjacentHTML('beforeend', markup);
    // az arrow functionnek nincs saját 'this' kulcsszava, tehát az arrow function-ön belül a 'this' ugyan azt fogja jelenteni, mint azon kívül (a classt, amiben vagyunk)
    document.querySelector('.dog-search button').addEventListener('click', (event) => {
      event.preventDefault();
      const searchTerm = document.querySelector('#dogSearchInput').value;

      // mivel a getImages egy async, ezért ez is promissal tér vissza
      // emiatt a promise object-en elérhető a 'then()' metódus
      // a then metódus bemeneti paramétere egy callback function, ami akkor fut le, amikor a promise beteljesül

      this.handleContentDisplay(searchTerm);
    });
  }
}

export default SearchImage;