//определение классов

let myLibrary = [];

class Book {
    constructor(
        title = 'Unknown',
        author = 'Unknown',
        pages = '0',
        readingStatus = 'Not read',
    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readingStatus = readingStatus;
    }
}

class Library {
    constructor() {
      this.books = [];
    }
  
    addBook(newBook) {
      if (!this.isInLibrary(newBook)) {
        this.books.push(newBook);
      }
    }
  
    removeBook(author, title) {
      this.books = this.books.filter((book) => (book.title !== title) && (book.author !== author) );
    }
  
    getBook(author, title) {
      return this.books.find((book) => (book.title === title) && (book.author === author));
    }
  
    isInLibrary(newBook) {
      return (this.books.some((book) => book.title === newBook.title)) && (this.books.some((book) => book.author === newBook.author));
    }
}
  
const library = new Library();


// работа с интерфейсом

const addBookButton = document.querySelector(".add-book.dialog");
const bookshelf = document.querySelector(".shelf-1");
const changeBookDialog = document.querySelector('.change.book');

document.querySelector(".add-book.main").addEventListener("click", () => {
    document.querySelector(".create.book").showModal();
});

const updateBookshelf = () => {
    resetBookshelf();
    for (let book of library.books) {
      createBookCard(book);
    }
}
  
const resetBookshelf = () => {
    bookshelf.innerHTML = '';
}

const createBookCard = (book) => {
    const bookCard = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const status = document.createElement('select');
    /*const optionRead = document.createElement('option');
    const optionInProcess = document.createElement('option');
    const optionNotRead = document.createElement('option');
    const removeButton = document.createElement('button');*/

    bookCard.classList.add('book');
    bookCard.addEventListener('click', () => chooseBookCard(book));
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    /*status.value = book.status;
    optionRead.text = 'Read';
    optionInProcess.text = 'In process';
    optionNotRead.text = 'Not read';
    removeButton.textContent = 'Remove';*/
    //removeButton.onclick = removeBook;

    switch (book.readingStatus) {
        case 'Read':
            bookCard.backgroundColor = 'green';
            break;
        case 'In process':
            bookCard.backgroundColor = 'yellow';
            break;
        case 'In process':
            bookCard.backgroundColor = 'red';
            break;
    }

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    /*status.add(optionRead);
    status.add(optionInProcess);
    status.add(optionNotRead);
    bookCard.appendChild(status);
    bookCard.appendChild(removeButton);*/
    bookshelf.appendChild(bookCard);
}

const getBookFromInput = () => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const readingStatus = document.getElementById('status').value;
    return new Book(title, author, pages, readingStatus);
}

addBookButton.addEventListener('click', () => {
    const newBook = getBookFromInput();
    if (library.isInLibrary(newBook)) {
        alert('Book already exist in your library');
        return;
    }
    library.addBook(newBook);
    updateBookshelf();
});

function chooseBookCard(book) {
    const title = document.querySelector('.change.book>title');
    const author = document.querySelector('.change.book>author');
    const pages = document.querySelector('.change.book>pages');
    const status = document.querySelector('.change.book>select');
    const removeButton = document.querySelector('.change.book>button');

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `${book.pages} pages`;
    status.value = book.status;
    //removeButton.onclick = removeBook(book);
    removeButton.addEventListener('click', () => removeBook(book));
    document.querySelector(".change.book").showModal();
}

function removeBook(book) {
    library.removeBook(book.author, book.title);
    updateBookshelf();
}