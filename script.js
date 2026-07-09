"use strict";

const container = document.querySelector('.container');
const dialog = document.querySelector('#book-input');
const form = document.querySelector('#book-form');
const submitBtn = document.querySelector('.submit-btn');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('book_title');
    const author = formData.get('book_author');
    const pages = formData.get('book_pages');
    const read = formData.get('book_read');

    addBookToLibrary(title, author, pages, read);
})

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('book_title');
    const author = formData.get('book_author');
    const pages = formData.get('book_pages');
    const read = formData.get('book_read');

    addBookToLibrary(title, author, pages, read);
    displayBooks();
    form.reset();
    dialog.close();
})

const myLibrary = [];

const Book = function(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new operator' to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks() {
    for (const book of myLibrary) {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        container.append(bookCard);

        const title = document.createElement('h2');
        title.textContent = book.title;

        const author = document.createElement('p');
        author.textContent = book.author;

        const pages = document.createElement('p');
        pages.textContent = book.pages;

        const read = document.createElement('p');
        read.textContent = book.read;

        bookCard.append(title, author, pages, read);
    }
}

addBookToLibrary("Atomic Habits", "James Clear", 320, "Read");
addBookToLibrary("Man's Search for Meaning", "Viktor E. Frankl", 165, "Read");

displayBooks();