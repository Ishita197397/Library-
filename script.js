let  myLibrary = [];
function Book(title, author, pages, Completed) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.Completed = Completed;
  this.id = crypto.randomUUID();
  this.info = function () {
    return `${this.title} by ${this.author} ,${this.pages} pages, ${this.Completed} `;
  };
}

function addBookToLibrary(BookTitle, BookAuthor, BookPages, BookCompleted) {
  // take params, create a book then store it in the array
  let newBook = new Book(BookTitle, BookAuthor, BookPages, BookCompleted);
  myLibrary.push(newBook);
}

//function that loops through the array and displays each book on the page

//function to display the books
function displayBooks() {
  let container = document.querySelector(".container");
  container.innerHTML = "";

  myLibrary.forEach((book) => {
    // console.log(book.info()); // prints info of each book
    const card = document.createElement("div");
    container.appendChild(card);
    card.className = "Card";
    card.innerHTML = `
      <h3 style=" text-align: center">${book.title}</h3>
      <p><b>Author:</b> ${book.author}</p>
      <p><b>Pages:</b> ${book.pages}</p>
      <p><b>Status:</b> ${book.Completed}</p>
      <button class="Remove">Remove</button>
    `;
  card.dataset.id=book.id;

    let removeButton = card.querySelector(".Remove");
    removeButton.addEventListener("click", () => {
      RemoveBook(book.id,card);

    });
  });
}

let AddBook = document.querySelector(".Show");
AddBook.onclick = () => {
  displayBooks();
};

//function to open the dialog box
let AddButton = document.querySelector(".NEW");
let dialog = document.querySelector("dialog");
AddButton.addEventListener("click", () => {
  dialog.showModal();
});

let CloseButton = document.querySelector(".Cancel");
CloseButton.addEventListener("click", () => dialog.close());

let SubmitButton = document.querySelector(".Submit");
SubmitButton.addEventListener("click", (event) => {
  event.preventDefault();
  let formElement = document.querySelector("form").elements;
  addBookToLibrary(
    formElement.name.value,
    formElement.author.value,
    formElement.pages.value,
    formElement.status.value
  );
  dialog.close();
  displayBooks();
});

//function to remove book
function RemoveBook(id,card) {
  myLibrary = myLibrary.filter((book) => book.id !== id);
  card.remove();
  
}

