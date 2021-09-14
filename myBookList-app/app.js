//book class : represents a book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//Ui class : handle UI Tasks
class UI {
    static displayBooks() {
        const StoredBooks = [{
                title: 'Book One',
                author: 'John Doe',
                isbn: '324234324'
            },
            {
                title: 'Book One',
                author: 'John Doe',
                isbn: '324234324'
            }
        ];

        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete>X</a></td>
        `;

        list.appendChild(row);
    }
}

//store class : handle storage
//event : display books
//event : add a book 
// event : remove a book