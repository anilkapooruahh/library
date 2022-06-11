// DOM manipulation
const library = document.getElementById("library-container");
const submitButton = document.getElementById("submit-button");
const form = document.querySelector('form')

let myLibrary = [];


const b1 = new Book("Philosophy 100", "Socrates", 300, false)

myLibrary.push(b1)

function Book(title, author, pages, read) {
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

form.addEventListener("submit", (event) => addBookToLibrary(event), true);
form.addEventListener("submit", (event) => updateBooks(event), true);

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

const toggleReadStatus = (read, book, event) => {
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

const setReadInitialState = (read, book) => {
  if (book.read) {
    read.classList.add('btn-green')
  } else {
    read.classList.add('btn-red')
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
  
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const read = document.createElement("button");
  const deleteButton = document.createElement("button")
  
  bookCard.classList.add("book-card")

  title.innerText = `title : ${book.title}`;
  author.innerText = `author : ${book.author}`;
  pages.innerText = `pages: ${book.pages}`;
  setReadInitialState(read, book)
  deleteButton.innerText = "Delete"
  
  read.addEventListener('click', (event) => toggleReadStatus(read ,book, event))
  deleteButton.addEventListener('click', event => deleteBook(event, book))
  
  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(read);
  bookCard.appendChild(deleteButton)
  library.appendChild(bookCard);
};
