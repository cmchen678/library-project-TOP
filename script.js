"use strict";

const bookContainer = document.querySelector('.book-container');
const dialog = document.querySelector('#book-input');
const form = document.querySelector('#book-form');
const myLibrary = [];

dialog.addEventListener('close', () => {
    form.reset();
})

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('book_title');
    const author = formData.get('book_author');
    const pages = formData.get('book_pages');
    const read = formData.get('book_read');

    const book = new Book(title, author, pages, read)
    book.addBookToLibrary();
    book.displayBook();
    form.reset();
    dialog.close();
})

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }

    addBookToLibrary() {
        myLibrary.push(this);
    }

    displayBook() {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.dataset.id = this.id;

        const title = document.createElement('h2');
        title.textContent = this.title;

        const author = document.createElement('p');
        author.textContent = this.author;

        const pages = document.createElement('p');
        pages.textContent = this.pages;

        const read = document.createElement('p');
        read.textContent = `Read: ${this.read}`;

        const readBtn = document.createElement('button');
        readBtn.classList.add('read-btn');
        if (this.read === 'Yes') {
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

    readStatus() {
        if (this.read === 'Yes') {
            this.read = 'No';
        } else {
            this.read = 'Yes';
        }
        this.displayBook();
    }

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
        read.textContent = `Read: ${book.read}`;

        const readBtn = document.createElement('button');
        readBtn.classList.add('read-btn');
        if (book.read === 'Yes') {
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

bookContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-btn')) {
        const bookCard = event.target.closest('.book-card');
        const id = bookCard.dataset.id;
        const index = myLibrary.findIndex(book => book.id === id);
        myLibrary.splice(index, 1);
        displayLibrary();
    }
})

bookContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('read-btn')) {
        const bookCard = event.target.closest('.book-card');
        const id = bookCard.dataset.id;
        const index = myLibrary.findIndex(book => book.id === id);
        myLibrary[index].readStatus();
        displayLibrary();
    }
})

const atomicHabits = new Book("Atomic Habits", "James Clear", 320, "Yes");
atomicHabits.addBookToLibrary();
const searchForMeaning = new Book("Man's Search for Meaning", "Viktor E. Frankl", 165, "Yes");
searchForMeaning.addBookToLibrary();
displayLibrary();