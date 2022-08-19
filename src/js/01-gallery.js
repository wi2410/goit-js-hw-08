// Add imports above this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);


const galleryItemsContainer = document.querySelector('.gallery');
const cardsMarkup = createGaleryCardsMarkup(galleryItems);

galleryItemsContainer.insertAdjacentHTML('beforeend', cardsMarkup);

function createGaleryCardsMarkup(gallery) {
    return gallery.map(({ preview, original, description }) => {
        return `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`;
    }).join('');  
    
};


let gallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});
gallery.on('show.simplelightbox');