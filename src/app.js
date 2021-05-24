import './css/style.css';
import './index.html';
import ListBreeds from './listBreedsComponent/listBreedsComponent.js';
import SearchImage from './searchImageComponent/searchImageComponent.js';

// separation of concerns
new SearchImage();

new ListBreeds();
