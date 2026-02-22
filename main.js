// array to hold all of the books 
let myLibrary = []; 

const tableBodyElement = document.getElementById('myTableBody'); 
const addBookButtonElement = document.getElementById('addBookButton');
const addBookDialogElement = document.getElementById('addBookDialog'); 
const closeButtonElement = document.getElementById('button-close');
const submitButtonElement = document.getElementById('button-submit');
const formElement = document.getElementById('myForm');

const inputTitleEl =document.getElementById('title-input');
const inputAuthorEl = document.getElementById('author-input');
const inputPagesEl = document.getElementById('pages-input');
const inputRadioTrueEl =document.getElementById('radio-true');
const inputRadioFalseEl = document.getElementById('radio-false');

let inputArray = [];
inputArray.push(inputTitleEl);
inputArray.push(inputAuthorEl);
inputArray.push(inputPagesEl);

//console.log(formElement);

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

}

Book.prototype.info = function() {
  return "Title: " + this.title + "\nAuthor: " + this.author + "\nPages: " + this.pages + "\nRead? " + this.read;
}

function addBookToLibrary(title, author, pages, read) {
  currentBook = new Book(title, author, pages, read);
  myLibrary.push(currentBook);
}

function addBookToTable(book) {
  numRows =  document.getElementById('myTable').rows.length;
  //console.log('Number of rows in table: ' + numRows);
  
  newRowNum = numRows - 1;
  newRow = tableBodyElement.insertRow(newRowNum);
  
  numCell = 0;
  for (const [key, value] of Object.entries(book)) {
    //console.log("key = " + key + ". value = " + value);
    newRow.insertCell(numCell++).innerHTML = value;
  }

  return;
}



/////////////////////////////////// add book button stuf //////////////////////////////
addBookButtonElement.addEventListener('click', () => {
  addBookDialogElement.showModal();
});

closeButtonElement.addEventListener('click', (e) => {
  e.preventDefault();
  formElement.reset();
  addBookDialogElement.close();

});

submitButtonElement.addEventListener('click', (e) => {
  e.preventDefault();

  //if required field missing, do NOT submit and highlight missing or incorrect inputs in red
  for (let i=0; i< inputArray.length; i++) {
    //console.log("i: " + i);
    if(inputIsMissing(inputArray[i])) {
      //console.log("Missing input: " + i);
      return;
    }
  } 
  
  if(!radioButtonSelected()) {
    //console.log("radio button not selected");
    return;
  }

  //else submit form. this takes values from input fields and saves them (reset input fields)
  // if we reach here, all required info about the book has been entered.
  addBookToLibrary(inputTitleEl.value, inputAuthorEl.value, inputPagesEl.value, inputRadioTrueEl.checked? true: false); 
  addBookToTable(myLibrary[myLibrary.length - 1]);
  formElement.reset();
  addBookDialogElement.close();

  return;
});

function inputIsMissing(inputEl) {
  if (inputEl.value == "") {
    return true; 
  }
  else {
    return false;
  }
}

function radioButtonSelected() {
  //let radioValue = document.querySelector("input[name='radio-input']:checked").value;
  //console.log(inputRadioTrueEl.checked);
  //console.log(inputRadioFalseEl.checked);

  if (inputRadioTrueEl.checked === false && inputRadioFalseEl.checked === false) {
    return false;
  }
  else {
    return true;
  }
}

book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
myLibrary.push(book1);

addBookToLibrary("Romeo and Juliet", "William Shakespeare", 138, true);
addBookToTable(myLibrary[0]);
addBookToTable(myLibrary[1]);

