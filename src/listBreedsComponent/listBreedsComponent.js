import '../css/listBreedsComponent.css';
import ContentComponent from '../contentComponent/contentComponent.js';

class ListBreeds extends ContentComponent {
  constructor() {
    super();
    this.render();
  }

  async getFullList() {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    if (response.status === 404) {
      this.displayError('Page not found!');
      return;
    }
    const data = await response.json();
    return data;
  }

  createListItem(title) {
    const item = document.createElement('div');
    item.classList.add('breed-list-item');
    item.innerHTML = title;
    document.querySelector('#content').appendChild(item);
  }

  displayList(results) {
    // a results.message egy object, amin végigmegyünk key:value páronként
    for (const breed in results.message) {
      // ha a IDBCursorWithValue (ami egy tömb), hossza nem nulla
      if (results.message[breed.length !== 0]) {
        // akkor végigmegyunk a tömbön és kiírjuk a fajtákat, alfajjal eyütt
        for (const subBreed of results.message[breed]) {
          // minden alfaj mogé odaírjuk a főfaj nevét
          this.createListItem(subBreed + ' ' + breed);
        }
      } else {
        // ha nincs alfaj (a tömb hossza nulla), akkor csak a főfajt jelenítjük meg
        this.createListItem(breed);
      }
    }
  }

  render() {
    const button = document.createElement('button');
    button.classList.add('list-button');
    button.innerHTML = 'List Breeds';
    // a button html-nek van 'onclick' attribútuma
    button.onclick = () => {
      this.clearContent();
      // short circuit evaluation -> csak akkor fut le a displayList(results), ha nem undefined a results
      this.getFullList().then(results => { results && this.displayList(results); });
    };
    document.querySelector('#header').appendChild(button);
  }
}

export default ListBreeds;