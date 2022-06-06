// DOM manipulation
const library = document.getElementById("library-container");
const submitButton = document.getElementById("submit-button")


let myLibrary = [];

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

submitButton.addEventListener("click", (event) => addBookToLibrary(event))
submitButton.addEventListener("click", event => updateBooks(event))


const makeBookFromInput = () => {

  const title = document.getElementById("title").value
  const author = document.getElementById("author").value
  const pages = document.getElementById("pages").value
  const read = document.getElementById("read").checked

  return new Book(title, author, pages, read)
}

function addBookToLibrary(event) {
  event.preventDefault()
  // adds book to library
  const newBook = makeBookFromInput()
  myLibrary.push(newBook)
  alert(`${myLibrary.length} books in library`)
  // do stuff here
}

const updateBooks = (e) => {
  e.preventDefault()
  library.innerText = ""
  for (let book = 0; book < myLibrary.length; book++) {
    makeBookCard(myLibrary[book])
    
  }
} 

const makeBookCard = book => {
  const container = document.createElement('div')
  const title = document.createElement('p')
  title.innerText = `title : ${book.title}`
  container.appendChild(title)
  library.appendChild(container)
}
