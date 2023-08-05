import { galleryItems } from "./gallery-items.js";
// Change code below this line

const container = document.querySelector(".gallery");

function createMarkup(arr) {
  return arr
    .map(
      ({ preview, original, description }) =>
        `
        <li class="gallery__item">
          <a class="gallery__link" href="large-image.jpg">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>
        `
    )
    .join("");
}

container.insertAdjacentHTML("beforeend", createMarkup(galleryItems));
container.addEventListener("click", clickHandler);

function clickHandler(evt) {
  evt.preventDefault();

  document.addEventListener("keydown", escapeHandler);

  if (evt.target === evt.currentTarget) {
    return;
  }

  const sourceImg = evt.target.dataset.source;

  // creating popup
  const instance = basicLightbox.create(
    `<img width="1400" height="900" src="${sourceImg}">`,
    // removing keyboard event listener after popup closed
    {
      onClose: (instance) => {
        document.removeEventListener("keydown", escapeHandler);
      },
    }
  );
  instance.show();

  // closing popup with escape key
  function escapeHandler(e) {
    if (e.code === "Escape") {
      instance.close();
    }
  }
}
