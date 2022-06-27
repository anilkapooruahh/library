// DOM manipulation
const library = document.getElementById("library-container");
const submitButton = document.getElementById("submit-button");
const form = document.querySelector('form')
const addButton = document.getElementById("add-book")

let myLibrary = [];


class Book {
  constructor(title, author, pages, read) {
    this.title = title; // String
    this.author = author; // String
    this.pages = pages; // Number
    this.read = read; // Boolean
    this.info = () => {
      if (read) {
        return `${this.title} by ${this.author}, ${this.pages} pages, read`;
      }
      return `${this.title} by ${this.author}, ${this.pages} pages, not yet read`;
    };
  }
}

form.addEventListener("submit", (event) => addBookToLibrary(event), true);
form.addEventListener("submit", (event) => updateBooks(event), true);
form.addEventListener("submit", event => toggleModalVisibility(event))
addButton.addEventListener("click", event => toggleModalVisibility(event))

const toggleModalVisibility = event => {
  event.preventDefault()
  form.classList.toggle("hide")
  form.classList.toggle("show")
  library.classList.toggle("show")
  library.classList.toggle("hide")
  addButton.classList.toggle("hide")
  addButton.classList.toggle("show")
}


function makeBookFromInput() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;


  return new Book(title, author, pages, read);
}

function addBookToLibrary(event) {

  // adds book to library
  const newBook = makeBookFromInput();
  myLibrary.push(newBook);
  // do stuff here
  event.preventDefault()
}

const updateBooks = (e) => {
  console.log(myLibrary)

  library.innerText = "";
  for (let book = 0; book < myLibrary.length; book++) {
    makeBookCard(myLibrary[book]);
  }
  e.preventDefault()
};

const toggleReadStatus = (read, book, bookCard, event) => {
  bookCard.classList.toggle('btn-red')
  bookCard.classList.toggle('btn-green')
  read.classList.toggle('btn-red')
  read.classList.toggle('btn-green')
  
  if (book.read) {
    book.read = false
  } else {
    book.read = true
  }
  setReadText(read)
  event.preventDefault()
}

const setReadText = (read) => {
  if(read.classList.contains('btn-green')) {
    read.innerText = "read"
  } else {
    read.innerText = "not read yet"
  }
}

const setReadInitialState = (read, book, bookCard) => {
  if (book.read) {
    read.classList.add('btn-red')
    bookCard.classList.add('btn-green')
  } else {
    read.classList.add('btn-green')
    bookCard.classList.add('btn-red')
  }
  setReadText(read)
  
}

const deleteBook = (event, book) => {
  event.preventDefault()
  myLibrary = myLibrary.filter(books => books.title !== book.title)
  updateBooks()

}

const makeBookCard = (book) => {
  const bookCard = document.createElement("div");
  
  const title = document.createElement("span");
  const author = document.createElement("span");
  const pages = document.createElement("span");
  const read = document.createElement("button");
  const deleteButton = document.createElement("button")
  
  bookCard.classList.add("book-card")

  title.innerText = `Title : ${book.title}`;
  author.innerText = `Author : ${book.author}`;
  pages.innerText = `Pages: ${book.pages}`;
  setReadInitialState(read, book, bookCard)
  deleteButton.innerText = "Delete"
  
  read.addEventListener('click', (event) => toggleReadStatus(read ,book, bookCard, event))
  deleteButton.addEventListener('click', event => deleteBook(event, book))
  
  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(read);
  bookCard.appendChild(deleteButton);

  library.appendChild(bookCard);
};
