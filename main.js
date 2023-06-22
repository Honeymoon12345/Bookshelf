"use strict";

const titel = document.getElementById("titel");
const autor = document.getElementById("autor");
const seiten = document.getElementById("seiten");
const gelesen = document.getElementById("gelesen");
const iconDelete = document.getElementById("iconDelete");
const iconRead = document.getElementById("iconRead");
const btn = document.getElementById("btn");
const bookShelf = document.querySelector(".bookShelf");

let books = [];
let id = 0;
function Book(titel, autor, seiten, gelesen) {
  this.titel = titel;
  this.autor = autor;
  this.seiten = seiten;
  if (gelesen) {
    this.gelesen = "Read";
  } else {
    this.gelesen = "Unread";
  }
  this.id = id++;
}

function addBookToLibary(event) {
  const book = new Book(
    titel.value,
    autor.value,
    seiten.value,
    gelesen.checked
  );

  if (check()) {
    books.push(book);
    document.querySelector(".bookShelf").innerHTML = "";
    books.forEach((book) => {
      let newBook = document.createElement("div");
      newBook.innerHTML = `
      <div class="container" data-id="${book.id}">
        <p class="titel">${book.titel}</p>
        <p class="autor">${book.autor}</p>
        <p class="seiten">${book.seiten}</p>
        <p class="lesestatus">${book.gelesen}</p>
        <button class="delete-book btn2">
            <span id="iconDelete" class="material-symbols-outlined iconDelete">
              delete
            </span>
          </button>
          <button class="read-book btn2">
            <span id="iconRead" class="material-symbols-outlined iconRead">
              local_library
            </span>
          </button>
      </div>`;
      document.querySelector(".bookShelf").appendChild(newBook);
    });
  }
}

function check() {
  if (titel.value == "" && autor.value == "" && seiten.value == "") {
    alert("Please fill in all fields!");
    return false;
  } else if (titel.value == "" && autor.value == "") {
    alert("Please add the Title and the Author!");
    return false;
  } else if (titel.value == "" && seiten.value == "") {
    alert("Please add the Title and the Pages!");
    return false;
  } else if (seiten.value == "" && autor.value == "") {
    alert("Please add the Author and the Pages!");
    return false;
  } else if (titel.value == "") {
    alert("Please add the Title!");
    return false;
  } else if (autor.value == "") {
    alert("Please add the Author!");
    return false;
  } else if (seiten.value == "") {
    alert("Please add the Pages!");
    return false;
  } else {
    return true;
  }
}

const addEventBook = (rootElement, event) => {
  rootElement.addEventListener(
    event,
    (e) => {
      let targetElement = e.target;
      while (targetElement != null) {
        if (targetElement.matches(".delete-book")) {
          console.log("löschen");
          const btnDel = targetElement;
          let index = btnDel.parentElement.dataset.id;
          console.log(index);
          btnDel.parentElement.remove();
          books.splice(index, 1);
        }
        if (targetElement.matches(".read-book")) {
          const bookChange =
            targetElement.parentElement.querySelector(".lesestatus");
          let index = bookChange.parentElement.dataset.id;
          if (bookChange.innerHTML == "Read") {
            bookChange.innerHTML = "Unread";
            books[index].gelesen = "Unread";
          } else {
            bookChange.innerHTML = "Read";
            books[index].gelesen = "Read";
          }
        }
        targetElement = targetElement.parentElement;
      }
    },
    true
  );
};

btn.addEventListener("click", addBookToLibary);
addEventBook(bookShelf, "click");
