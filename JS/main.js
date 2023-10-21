//Global variables
let nameInput = document.getElementById("contact-name");
let numberInput = document.getElementById("contact-number");
let createContactBtn = document.getElementById("create-contact-btn");
const table = document.getElementById("contacts-table");
const noContactsMsg = document.getElementById("no-contacts");

createContactBtn.disabled = true;

//Eventlisteners
nameInput.addEventListener("input", function () {
  validateInput(createContactBtn, nameInput, numberInput);
});
numberInput.addEventListener("input", function () {
  validateInput(createContactBtn, nameInput, numberInput);
});
createContactBtn.addEventListener("click", function () {
  createContactRow(nameInput, numberInput);
});


//Handles the validation of user input - if both input-elements is filled correctly --> enable the button
//Using parameters to make the function reusable
function validateInput(btn, nameInput, numInput) {
  let trimmedName = nameInput.value.trim();
  let trimmedNumber = numInput.value.trim();

  if (trimmedName && trimmedNumber) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
}

//
function createContactRow(name, number) {
  let row = table.insertRow(1);
  let nameCell = row.insertCell(0);
  let numberCell = row.insertCell(1);
  let modifyContactCell = row.insertCell(2);
  let contactName = name.value;
  let contactNumber = number.value;
  let createdContactName = document.createElement("input");
  let createdContactNumber = document.createElement("input");
  let editContactBtn = document.createElement("button");
  let deleteContactBtn = document.createElement("Button");
  
  createdContactName.setAttribute("type", "text");
  createdContactNumber.setAttribute("type", "text");
  editContactBtn.innerText = "Ändra";
  deleteContactBtn.innerText = "Ta bort";
  
  createdContactName.value = contactName;
  createdContactNumber.value = contactNumber;
  
  createdContactName.disabled = true;
  createdContactNumber.disabled = true;
  
  noContactsMsg.style.display = "none";

  createdContactName.addEventListener("input", function () {
    validateInput(editContactBtn, createdContactName, createdContactNumber);
  });
  createdContactNumber.addEventListener("input", function () {
    validateInput(editContactBtn, createdContactName, createdContactNumber);
  });
  editContactBtn.addEventListener("click", function () {
    handleEdit(createdContactName, createdContactNumber, editContactBtn);
  });
  deleteContactBtn.addEventListener("click", function () {
    deleteRow(row);
  });
  
  nameCell.appendChild(createdContactName);
  numberCell.appendChild(createdContactNumber);
  modifyContactCell.append(editContactBtn, deleteContactBtn);
}

// handles switching button text according to it's innerText
//Deciding when to enable/disable text-inputs
function handleEdit(name, num, btn) {
  if (btn.innerText === "Ändra") {
    name.disabled = false;
    num.disabled = false;
    btn.innerText = "Spara";
  } else {
    name.disabled = true;
    num.disabled = true;
    btn.innerText = "Ändra";
  }
}

//Deleting the table-row + decides if noContactsMsg is displayed or not
function deleteRow(row) {
  table.deleteRow(row.rowIndex);
  if (table.rows.length <= 2) {
    noContactsMsg.style.display = "block";
  } else {
    noContactsMsg.style.display = "none";
  }
}
