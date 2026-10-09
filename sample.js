// =====================================================
// LOAD DATA FROM LOCAL STORAGE
// =====================================================

let books =
    JSON.parse(localStorage.getItem("libraryBooks")) || [

        {
            id: 1,
            title: "Java Programming",
            author: "Herbert Schildt",
            category: "Programming",
            available: true,
            borrowedBy: null
        },

        {
            id: 2,
            title: "Python Basics",
            author: "Mark Lutz",
            category: "Programming",
            available: true,
            borrowedBy: null
        },

        {
            id: 3,
            title: "Data Structures",
            author: "Narasimha Karumanchi",
            category: "Computer Science",
            available: true,
            borrowedBy: null
        },

        {
            id: 4,
            title: "Artificial Intelligence",
            author: "Stuart Russell",
            category: "AI",
            available: true,
            borrowedBy: null
        },

        {
            id: 5,
            title: "Web Development",
            author: "Jon Duckett",
            category: "Web Technology",
            available: true,
            borrowedBy: null
        }

    ];


// =====================================================
// REGISTERED USERS
// =====================================================

let users =
    JSON.parse(localStorage.getItem("libraryUsers")) || [

        {
            name: "Demo User",
            username: "user",
            email: "user@gmail.com",
            password: "1234"
        }

    ];


// =====================================================
// TRANSACTION HISTORY
// =====================================================

let transactionHistory =
    JSON.parse(
        localStorage.getItem("transactionHistory")
    ) || [];


// =====================================================
// CURRENT USER
// =====================================================

let currentUser = null;


// =====================================================
// SAVE DATA
// =====================================================

function saveBooks() {

    localStorage.setItem(
        "libraryBooks",
        JSON.stringify(books)
    );

}


function saveUsers() {

    localStorage.setItem(
        "libraryUsers",
        JSON.stringify(users)
    );

}


function saveTransactions() {

    localStorage.setItem(
        "transactionHistory",
        JSON.stringify(transactionHistory)
    );

}


// =====================================================
// SHOW SECTION
// =====================================================

function showSection(sectionId) {

    let sections =
        document.querySelectorAll(".section");


    sections.forEach(function(section) {

        section.classList.add("hidden");

    });


    let selectedSection =
        document.getElementById(sectionId);


    if (selectedSection) {

        selectedSection.classList.remove("hidden");

    }


    if (sectionId === "books") {

        displayBooks();

    }

}


// =====================================================
// DISPLAY BOOKS
// =====================================================

function displayBooks() {

    let bookList =
        document.getElementById("bookList");


    bookList.innerHTML = "";


    books.forEach(function(book) {

        let status =
            book.available
                ? "Available"
                : "Not Available";


        let statusClass =
            book.available
                ? "available"
                : "unavailable";


        let button = "";


        if (book.available) {

            button = `
                <button onclick="borrowBook(${book.id})">
                    📚 Borrow Book
                </button>
            `;

        }


        bookList.innerHTML += `

            <div class="book">

                <h3>
                    ${book.title}
                </h3>

                <p>
                    <b>Author:</b>
                    ${book.author}
                </p>

                <p>
                    <b>Category:</b>
                    ${book.category}
                </p>

                <p class="${statusClass}">
                    ${status}
                </p>

                ${button}

            </div>

        `;

    });

}


// =====================================================
// SEARCH BOOKS
// =====================================================

function searchBooks() {

    let search =
        document
        .getElementById("searchBox")
        .value
        .toLowerCase();


    let filteredBooks =
        books.filter(function(book) {

            return (

                book.title
                    .toLowerCase()
                    .includes(search)

                ||

                book.author
                    .toLowerCase()
                    .includes(search)

            );

        });


    let bookList =
        document.getElementById("bookList");


    bookList.innerHTML = "";


    filteredBooks.forEach(function(book) {

        let status =
            book.available
                ? "Available"
                : "Not Available";


        let statusClass =
            book.available
                ? "available"
                : "unavailable";


        let button = "";


        if (book.available) {

            button = `
                <button onclick="borrowBook(${book.id})">
                    📚 Borrow Book
                </button>
            `;

        }


        bookList.innerHTML += `

            <div class="book">

                <h3>
                    ${book.title}
                </h3>

                <p>
                    <b>Author:</b>
                    ${book.author}
                </p>

                <p>
                    <b>Category:</b>
                    ${book.category}
                </p>

                <p class="${statusClass}">
                    ${status}
                </p>

                ${button}

            </div>

        `;

    });

}


// =====================================================
// USER REGISTRATION
// =====================================================

function registerUser() {

    let name =
        document
        .getElementById("registerName")
        .value
        .trim();


    let username =
        document
        .getElementById("registerUsername")
        .value
        .trim();


    let email =
        document
        .getElementById("registerEmail")
        .value
        .trim();


    let password =
        document
        .getElementById("registerPassword")
        .value;


    let confirmPassword =
        document
        .getElementById("confirmPassword")
        .value;


    let message =
        document.getElementById(
            "registerMessage"
        );


    if (
        name === "" ||
        username === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        message.innerText =
            "Please fill all fields.";

        return;

    }


    let existingUser =
        users.find(function(user) {

            return (
                user.username.toLowerCase() ===
                username.toLowerCase()
            );

        });


    if (existingUser) {

        message.innerText =
            "Username already exists.";

        return;

    }


    if (password !== confirmPassword) {

        message.innerText =
            "Passwords do not match.";

        return;

    }


    let newUser = {

        name: name,

        username: username,

        email: email,

        password: password

    };


    users.push(newUser);


    saveUsers();


    alert(
        "Registration successful! Please login."
    );


    document.getElementById(
        "registerName"
    ).value = "";


    document.getElementById(
        "registerUsername"
    ).value = "";


    document.getElementById(
        "registerEmail"
    ).value = "";


    document.getElementById(
        "registerPassword"
    ).value = "";


    document.getElementById(
        "confirmPassword"
    ).value = "";


    message.innerText = "";


    showSection("login");

}


// =====================================================
// CHANGE LOGIN TYPE
// =====================================================

function changeLoginType() {

    let type =
        document.getElementById(
            "loginType"
        ).value;


    let registerLink =
        document.getElementById(
            "registerLink"
        );


    let adminDemo =
        document.getElementById(
            "adminDemo"
        );


    if (type === "user") {

        registerLink.style.display =
            "block";

        adminDemo.style.display =
            "none";

    }

    else {

        registerLink.style.display =
            "none";

        adminDemo.style.display =
            "block";

    }

}


// =====================================================
// LOGIN
// =====================================================

function login() {

    let type =
        document.getElementById(
            "loginType"
        ).value;


    let username =
        document
        .getElementById("username")
        .value
        .trim();


    let password =
        document.getElementById(
            "password"
        ).value;


    let message =
        document.getElementById(
            "loginMessage"
        );


    // USER LOGIN

    if (type === "user") {

        let user =
            users.find(function(user) {

                return (
                    user.username === username &&
                    user.password === password
                );

            });


        if (user) {

            currentUser = user;


            // Profile details

            document.getElementById(
                "profileName"
            ).innerText = user.name;


            document.getElementById(
                "profileUsername"
            ).innerText = user.username;


            document.getElementById(
                "profileEmail"
            ).innerText = user.email;


            document.getElementById(
                "loggedUser"
            ).innerText = user.name;


            message.innerText =
                "Login successful!";


            showSection(
                "userDashboard"
            );


            displayBorrowedBooks();

            displayTransactionHistory();

        }

        else {

            message.innerText =
                "Invalid username or password.";

        }

    }


    // ADMIN LOGIN

    else if (type === "admin") {

        if (
            username === "admin" &&
            password === "admin123"
        ) {

            message.innerText =
                "Admin login successful!";


            showSection(
                "adminDashboard"
            );


            displayAdminBooks();

        }

        else {

            message.innerText =
                "Invalid admin username or password.";

        }

    }

}


// =====================================================
// BORROW BOOK
// =====================================================

function borrowBook(bookId) {

    if (currentUser === null) {

        alert(
            "Please login as a user first."
        );

        showSection("login");

        return;

    }


    let book =
        books.find(function(book) {

            return book.id === bookId;

        });


    if (book && book.available) {

        book.available = false;

        book.borrowedBy =
            currentUser.username;


        transactionHistory.push({

            username:
                currentUser.username,

            bookTitle:
                book.title,

            author:
                book.author,

            action:
                "Borrowed",

            date:
                new Date().toLocaleString()

        });


        saveBooks();

        saveTransactions();


        alert(
            book.title +
            " has been borrowed successfully!"
        );


        displayBooks();

        displayBorrowedBooks();

        displayTransactionHistory();

    }

}


// =====================================================
// DISPLAY BORROWED BOOKS
// =====================================================

function displayBorrowedBooks() {

    let container =
        document.getElementById(
            "borrowedBooks"
        );


    container.innerHTML = "";


    if (currentUser === null) {

        return;

    }


    let borrowed =
        books.filter(function(book) {

            return (
                book.available === false &&
                book.borrowedBy ===
                currentUser.username
            );

        });


    if (borrowed.length === 0) {

        container.innerHTML = `

            <div class="no-history">

                📚 No books borrowed yet.

            </div>

        `;

        return;

    }


    borrowed.forEach(function(book) {

        container.innerHTML += `

            <div class="admin-book">

                <h3>
                    📖 ${book.title}
                </h3>

                <p>
                    <b>Author:</b>
                    ${book.author}
                </p>

                <button
                    onclick="returnBook(${book.id})"
                >
                    🔄 Return Book
                </button>

            </div>

        `;

    });

}


// =====================================================
// TRANSACTION HISTORY
// =====================================================

function displayTransactionHistory() {

    let container =
        document.getElementById(
            "transactionHistory"
        );


    container.innerHTML = "";


    if (currentUser === null) {

        return;

    }


    let userTransactions =
        transactionHistory.filter(
            function(transaction) {

                return (
                    transaction.username ===
                    currentUser.username
                );

            }
        );


    if (userTransactions.length === 0) {

        container.innerHTML = `

            <div class="no-history">

                📋 No book transactions yet.

            </div>

        `;

        return;

    }


    userTransactions
        .slice()
        .reverse()
        .forEach(
            function(transaction) {

                let actionClass =
                    transaction.action ===
                    "Borrowed"
                        ? "borrowed"
                        : "returned";


                container.innerHTML += `

                    <div class="transaction">

                        <h3>
                            📖
                            ${transaction.bookTitle}
                        </h3>

                        <p>
                            <b>Author:</b>
                            ${transaction.author}
                        </p>

                        <p>

                            <b>Action:</b>

                            <span
                                class="${actionClass}"
                            >
                                ${transaction.action}
                            </span>

                        </p>

                        <p>

                            <b>Date & Time:</b>

                            ${transaction.date}

                        </p>

                    </div>

                `;

            }
        );

}


// =====================================================
// RETURN BOOK
// =====================================================

function returnBook(bookId) {

    if (currentUser === null) {

        return;

    }


    let book =
        books.find(function(book) {

            return book.id === bookId;

        });


    if (
        book &&
        book.borrowedBy ===
        currentUser.username
    ) {

        book.available = true;

        book.borrowedBy = null;


        transactionHistory.push({

            username:
                currentUser.username,

            bookTitle:
                book.title,

            author:
                book.author,

            action:
                "Returned",

            date:
                new Date().toLocaleString()

        });


        saveBooks();

        saveTransactions();


        alert(
            book.title +
            " has been returned successfully!"
        );


        displayBorrowedBooks();

        displayBooks();

        displayTransactionHistory();

    }

}


// =====================================================
// ADD BOOK - ADMIN
// =====================================================

function addBook() {

    let title =
        document.getElementById(
            "newTitle"
        ).value.trim();


    let author =
        document.getElementById(
            "newAuthor"
        ).value.trim();


    let category =
        document.getElementById(
            "newCategory"
        ).value.trim();


    if (
        title === "" ||
        author === "" ||
        category === ""
    ) {

        alert(
            "Please fill all fields."
        );

        return;

    }


    let newId = 1;


    if (books.length > 0) {

        newId =
            Math.max(
                ...books.map(
                    function(book) {

                        return book.id;

                    }
                )
            ) + 1;

    }


    let newBook = {

        id: newId,

        title: title,

        author: author,

        category: category,

        available: true,

        borrowedBy: null

    };


    books.push(newBook);


    saveBooks();


    alert(
        "Book added successfully!"
    );


    document.getElementById(
        "newTitle"
    ).value = "";


    document.getElementById(
        "newAuthor"
    ).value = "";


    document.getElementById(
        "newCategory"
    ).value = "";


    displayAdminBooks();

}


// =====================================================
// DISPLAY ADMIN BOOKS
// =====================================================

function displayAdminBooks() {

    let container =
        document.getElementById(
            "adminBookList"
        );


    container.innerHTML = "";


    books.forEach(function(book) {

        container.innerHTML += `

            <div class="admin-book">

                <h3>
                    📖 ${book.title}
                </h3>

                <p>
                    <b>Author:</b>
                    ${book.author}
                </p>

                <p>
                    <b>Category:</b>
                    ${book.category}
                </p>

                <p>

                    <b>Status:</b>

                    ${
                        book.available
                            ? "🟢 Available"
                            : "🔴 Borrowed"
                    }

                </p>

                <button
                    onclick="deleteBook(${book.id})"
                >
                    🗑️ Delete
                </button>

            </div>

        `;

    });

}


// =====================================================
// DELETE BOOK
// =====================================================

function deleteBook(bookId) {

    let confirmDelete =
        confirm(
            "Are you sure you want to delete this book?"
        );


    if (!confirmDelete) {

        return;

    }


    books =
        books.filter(function(book) {

            return book.id !== bookId;

        });


    saveBooks();


    alert(
        "Book deleted successfully!"
    );


    displayAdminBooks();

}


// =====================================================
// LOGOUT
// =====================================================

function logout() {

    currentUser = null;


    document.getElementById(
        "username"
    ).value = "";


    document.getElementById(
        "password"
    ).value = "";


    document.getElementById(
        "loginMessage"
    ).innerText = "";


    alert(
        "Logged out successfully!"
    );


    showSection("home");

}


// =====================================================
// INITIALIZE
// =====================================================

changeLoginType();

showSection("home");