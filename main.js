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
  this.id = id++;
  // this.showContent = function () {
  //   this.books.array.forEach((element) => {});
  // };
}

function addBookToLibary(event) {
  if (gelesen.checked) {
    console.log("test");
    const book = new Book(titel.value, autor.value, seiten.value, "Read");
  } else {
    const book = new Book(titel.value, autor.value, seiten.value, "Unread");
  }

  books.push(book);
  document.querySelector(".bookShelf").innerHTML = "";
  books.forEach((book) => {
    let newBook = document.createElement("div");
    newBook.innerHTML = `
      <div class="container" data-id="${id}">
        <p class="titel">${book.titel}</p>
        <p class="autor">${book.autor}</p>
        <p class="seiten">${book.seiten}</p>
        <!-- <p class="lesestatus">${book.gelesen}</p> -->
        <p class="lesestatus">Unread</p>
        <button class="delete-book">
            <span id="iconDelete" class="material-symbols-outlined iconDelete">
              delete
            </span>
          </button>
          <button class="read-book">
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

          let index = btnDel.parentElement.dataset.id;
          btnDel.parentElement.remove();
          books.splice(index - 1, 1);
          console.log(index);
        }

        targetElement = targetElement.parentElement;
      }
    },
    true
  );
};

addEventBook(bookShelf, "click");

const readChange = (rootElement, event) => {
  rootElement.addEventListener(
    event,
    (e) => {
      let targetElement = e.target;
      const btnRead = document.querySelector(".read-book");
      let read = btnRead.parentElement.dataset.id;
      while (targetElement != null) {
        if (targetElement.matches(".read-book")) {
          if (document.querySelector(".lesestatus").innerHTML == "Read") {
            document.querySelector(".lesestatus").innerHTML = "Unread";
          } else {
            document.querySelector(".lesestatus").innerHTML = "Read";
          }
        }
        targetElement = targetElement.parentElement;
      }

      /*while (targetElement == null) {
        //if (targetElement.matches(".read-book")) {
        document.querySelector(".lesestatus").innerHTML = "Unread";
        //}
        targetElement = targetElement.parentElement;
      }*/
    },
    true
  );
};
readChange(bookShelf, "click", true);
element.removeEventListener("click", readChange, false);
