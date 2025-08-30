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
    const card = document.createElement("div");
    container.appendChild(card);
    card.className = "Card";
    card.style.backgroundColor = pickRandomColour();
    card.dataset.id = book.id;

    card.innerHTML = `
      <button class="Remove">x</button>
      <h3 style="text-align: center">${book.title}</h3>
      <p><b>Author:</b> ${book.author}</p>
      <p><b>Pages:</b> ${book.pages}</p>
      <p><b>Status:</b></p>
      <div class="form-row">
        <div class="toggle-container">
          <span class="toggle-label-left">No</span>
          <label class="switch">
            <input type="checkbox" name="switch" />
            <span class="slider"></span>
          </label>
          <span class="toggle-label-right">Yes</span>
        </div>
      </div>
    `;

    let toggleButton = card.querySelector("input[type='checkbox']");
    toggleButton.checked = book.Completed;

    toggleButton.addEventListener("change", () => {
      book.Completed = toggleButton.checked;
    });

    let removeButton = card.querySelector(".Remove");
    removeButton.addEventListener("click", () => {
      RemoveBook(book.id, card);
    });
  });
}


// let AddBook = document.querySelector(".Show");
// AddBook.onclick = () => {
//   displayBooks();
// };

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
    formElement.switch.checked,
  );
  dialog.close();
  displayBooks();
});

//function to remove book
function RemoveBook(id,card) {
  myLibrary = myLibrary.filter((book) => book.id !== id);
  card.remove();
  
  
}












//function to return random color
function pickRandomColour(){
    let h= Math.floor(Math.random() * 360);
    let s = Math.floor(Math.random() * 50)+50;
    let l = Math.floor(Math.random() * 50)+50;
    return `hsl(${h}, ${s}%, ${l}%)`;
}

