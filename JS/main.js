let nameInput = document.getElementById("contact-name");
let numberInput = document.getElementById("contact-number");
let createContactBtn = document.getElementById("create-contact-btn");
const table = document.getElementById("contacts-table");
const noContactsMsg = document.getElementById("no-contacts");

createContactBtn.disabled = true;

nameInput.addEventListener("input", validateInput);
numberInput.addEventListener("input", validateInput);
createContactBtn.addEventListener("click", function () {
  createContactRow(nameInput, numberInput);
  if (table.rows.length <= 2) {
    noContactsMsg.style.display="block"
  } else{
    noContactsMsg.style.display="none"
  }
});



function validateInput() {
  let trimmedName = nameInput.value.trim();
  let trimmedNumber = numberInput.value.trim();

  if (trimmedName && trimmedNumber) {
    createContactBtn.disabled = false;
  } else {
    createContactBtn.disabled = true;
  }
}

function createContactRow(name, number) {
  let row = table.insertRow(1);
  let nameCell = row.insertCell(0);
  let numberCell = row.insertCell(1);
  let modifyContactCell = row.insertCell(2);

  let contactName = name.value;
  let contactNumber = number.value;

  let createdContactName = document.createElement("input");
  createdContactName.setAttribute("type", "text");
  createdContactName.value = contactName;
  createdContactName.disabled = true;

  let createdContactNumber = document.createElement("input");
  createdContactNumber.setAttribute("type", "text");
  createdContactNumber.value = contactNumber;
  createdContactNumber.disabled = true;

  nameCell.appendChild(createdContactName);
  numberCell.appendChild(createdContactNumber);

  let editContactBtn = document.createElement("button");
  editContactBtn.innerText = "Ändra";
  let deleteContactBtn = document.createElement("Button");
  deleteContactBtn.innerText = "Ta bort";
  //Function that handles changing of a created contact
  editContactBtn.addEventListener("click", function () {
    editContact(createdContactName, createdContactNumber, editContactBtn);
  });

  /* 
    Function that handles the removing of a created contact, this by using the deleteRow() method to delete a row,
    and rowIndex()-method to delete the current row-index  */
  deleteContactBtn.addEventListener("click", function () {
    table.deleteRow(row.rowIndex);
  });

  modifyContactCell.append(editContactBtn, deleteContactBtn);
}

//Handles the event of making changes to a created contact
function editContact(name, num, btn) {
  if (btn.innerText === "Ändra") {
    name.disabled = false;
    num.disabled = false;
    btn.innerText = "Spara";
  } else {
    let newName = name.value.trim();
    let newNumber = num.value.trim();

    if (newName === "" || newNumber === "") {
      alert("Vänligen fyll i fälten korrekt");
    } else {
      name.disabled = true;
      num.disabled = true;
      btn.innerText = "Ändra";
    }
  }
}

