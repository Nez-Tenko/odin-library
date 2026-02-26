// array to hold all of the books 
let myLibrary = []; 

const tableBodyElement = document.getElementById('myTableBody'); 
const addBookButtonElement = document.getElementById('addBookButton');
const addBookDialogElement = document.getElementById('addBookDialog'); 
const closeButtonElement = document.getElementById('button-close');
const submitButtonElement = document.getElementById('button-submit');
const formElement = document.getElementById('myForm');
//const deleteBtnsEl = document.getElementById("deleteButtons");
const testEl = document.getElementById("testID");
//console.log('row index= ' + testEl.rowIndex);

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

function Book(title, author, pages, read, id) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  
  console.log('constructor id: ' + id);
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

Book.prototype.info = function() {
  return "Title: " + this.title + "\nAuthor: " + this.author + "\nPages: " + this.pages + "\nRead? " + this.read + "\nID: " + this.id;
}

function addBookToLibrary(title, author, pages, read, id) {
  let uuid = self.crypto.randomUUID();
  console.log("uuid: " + uuid);
  currentBook = new Book(title, author, pages, read, uuid);
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
    if(key !== 'id'){
      currentCell = newRow.insertCell(numCell++);
      //newRow.insertCell(numCell++).innerHTML = value;
      currentCell.innerHTML = value;
      if(key === 'read') {
        currentCell.id = "read-cell"; 
      } 
    }
    //newRow.setAttribute('data-bookid', book.id);
    
    if(key ==='id') {
      let btn1Cell = newRow.insertCell(numCell++);
      let btn2Cell = newRow.insertCell(numCell++);

      let button1 = document.createElement("button");
      let button2 = document.createElement("button");

      button1.innerText = "Toggle";
      button1.className = "'toggle-btn";
      btn1Cell.appendChild(button1);
      button1.setAttribute('data-buttonid', book.id);

      button2.innerText = "Delete";
      button2.className = "del-btn";
      button2.setAttribute('data-buttonid', book.id);
      btn2Cell.appendChild(button2);
    

      button1.addEventListener('click', (e) => {
        e.preventDefault();
        // get the cell that has the read value
        currentRow = document.querySelector(`[data-bookid="${button1.dataset.buttonid}"]`); 
        currentCell = currentRow.querySelector('#read-cell'); 
      
        if(currentCell.innerHTML === 'true') {
          currentCell.innerHTML = 'false';
        }
        else {
          currentCell.innerHTML = 'true';
        }
      });

      button2.addEventListener('click', (e) => {
        e.preventDefault();
        let currentID = e.target.dataset.buttonid;
        let rowToDel = document.querySelector(`[data-bookid="${currentID}"]`);
        tableBodyElement.deleteRow(rowToDel.rowIndex - 1);
        console.log(rowToDel.rowIndex);
        //button2.remove();
        return;
      });
    }
  }
 
  newRow.setAttribute('data-bookid', book.id);
  
  /*
  let button = document.createElement("button");
  button.innerText = "Delete";
  button.className = "del-btn";
  button.setAttribute('data-buttonid', book.id);
  deleteButtons.appendChild(button);
  
  button.addEventListener('click', (e) => {
    e.preventDefault();
    let currentID = e.target.dataset.buttonid;
    let rowToDel = document.querySelector(`[data-bookid="${currentID}"]`);
    tableBodyElement.deleteRow(rowToDel.rowIndex - 1);
    console.log(rowToDel.rowIndex);
    button.remove();
    return;
  })
  */

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
    if(inputIsMissing(inputArray[i])) {
      return;
    }
  } 
  
  if(!radioButtonSelected()) {
    //console.log("radio button not selected");
    return;
  }

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

  if (inputRadioTrueEl.checked === false && inputRadioFalseEl.checked === false) {
    return false;
  }
  else {
    return true;
  }
}

function displayLibrary(library) {
  for (let i = 0; i < library.length; i++) {
    console.log(library[i].info());  
  }
}

book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true, self.crypto.randomUUID());
myLibrary.push(book1);

addBookToLibrary("Romeo and Juliet", "William Shakespeare", 138, true, self.crypto.randomUUID());
addBookToTable(myLibrary[0]);
addBookToTable(myLibrary[1]);

displayLibrary(myLibrary);

let uuid = self.crypto.randomUUID();
console.log(uuid);

