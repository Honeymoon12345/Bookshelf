"use strict";

const titel = document.getElementById("titel");
const autor = document.getElementById("autor");
const seiten = document.getElementById("seiten");
const gelesen = document.getElementById("gelesen");
const iconDelete = document.getElementById("iconDelete");
const iconRead = document.getElementById("iconRead");
const btn = document.getElementById("btn");

let books = [];
let id = 0;
function Book(titel, autor, seiten, gelesen) {
  this.titel = titel;
  this.autor = autor;
  this.seiten = seiten;
  this.gelesen = gelesen;
  this.id = ++id;
  this.showContent = function () {
    this.books.array.forEach((element) => {});
  };
}

function addBookToLibary(event) {
  const book = new Book(
    titel.value,
    autor.value,
    seiten.value,
    gelesen.checked
  );
  books.push(book);
  document.querySelector(".bookShelf").innerHTML = "";
  books.forEach((book) => {
    let newBook = document.createElement("div");
    newBook.innerHTML = `
      <div class="container" data-id="${id}">
        <p class="titel">${book.titel}</p>
        <p class="autor">${book.autor}</p>
        <p class="seiten">${book.seiten}</p>
        <p class="gelesen">${book.gelesen}</p>
        <button class="delete-book">
            <span id="iconDelete" class="material-symbols-outlined iconDelete">
              delete
            </span>
          </button>
          <button class="readBook">
            <span id="iconRead" class="material-symbols-outlined iconRead">
              local_library
            </span>
          </button>
      </div>`;
    document.querySelector(".bookShelf").appendChild(newBook);
  });
}

btn.addEventListener("click", addBookToLibary);

const bookShelf = document.querySelector(".bookShelf");

const addEventBook = (rootElement, event) => {
  rootElement.addEventListener(
    event,
    (e) => {
      let targetElement = e.target;
      while (targetElement != null) {
        if (targetElement.matches(".delete-book")) {
          console.log("löschen");
          const btnDel = document.querySelector(".delete-book");
          btnDel.parentElement.remove();
          let index = btnDel.parentElement.dataset.id;
          books.splice(index - 1, 1);
        }

        targetElement = targetElement.parentElement;
      }
    },
    true
  );
};

addEventBook(bookShelf, "click");
