"use strict";

const bookContainer = document.querySelector('.book-container');
const dialog = document.querySelector('#book-input');
const form = document.querySelector('#book-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('book_title');
    const author = formData.get('book_author');
    const pages = formData.get('book_pages');
    const read = formData.get('book_read');

    addBookToLibrary(title, author, pages, read);
    displayBook();
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

function displayLibrary() {
    bookContainer.innerHTML = '';

    for (const book of myLibrary) {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.dataset.id = book.id;

        const title = document.createElement('h2');
        title.textContent = book.title;

        const author = document.createElement('p');
        author.textContent = book.author;

        const pages = document.createElement('p');
        pages.textContent = book.pages;

        const read = document.createElement('p');
        read.textContent = book.read;

        const readBtn = document.createElement('button');
        readBtn.classList.add('read-btn');
        if (book.read === 'read') {
            readBtn.textContent = 'Mark Unread';
        } else {
            readBtn.textContent = 'Mark Read';
        }

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-btn');
        removeBtn.textContent = 'Remove Book';

        bookCard.append(title, author, pages, read, readBtn, removeBtn);
        bookContainer.append(bookCard);
    }
}

function displayBook() {
    const lastBook = myLibrary.at(-1);

    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.dataset.id = lastBook.id;

    const title = document.createElement('h2');
    title.textContent = lastBook.title;

    const author = document.createElement('p');
    author.textContent = lastBook.author;

    const pages = document.createElement('p');
    pages.textContent = lastBook.pages;

    const read = document.createElement('p');
    read.textContent = lastBook.read;

    const readBtn = document.createElement('button');
    readBtn.classList.add('read-btn');
    if (lastBook.read.toLowerCase() === 'read') {
        readBtn.textContent = 'Mark Unread';
    } else {
        readBtn.textContent = 'Mark Read';
    }

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = 'Remove Book';

    bookCard.append(title, author, pages, read, readBtn, removeBtn);
    bookContainer.append(bookCard);
}

addBookToLibrary("Atomic Habits", "James Clear", 320, "Read");
addBookToLibrary("Man's Search for Meaning", "Viktor E. Frankl", 165, "Read");

displayLibrary();

bookContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-btn')) {
        const bookCard = event.target.closest('.book-card');
        const idToRemove = bookCard.dataset.id;
        const index = myLibrary.findIndex(book => book.id === idToRemove);
        myLibrary.splice(index, 1);
        displayLibrary();
        console.log(idToRemove);
    }
})