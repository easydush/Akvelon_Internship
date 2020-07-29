// The table with id="age-table".
let ageTable = document.getElementById("age-table");
console.log(ageTable);
// All label elements inside that table (there should be 3 of them).
let labels = ageTable.getElementsByTagName('label');
console.log(labels);
// The first td in that table (with the word “Age”).
let firstTd = ageTable.querySelector('td');
console.log(firstTd);
// The form with name="search".
let searchForm = document.querySelector('form[name=search]');
console.log(searchForm);
// The first input in that form.
let firstInput = searchForm.querySelector('input');
console.log(firstInput);
// The last input in that form.
let lastInput = searchForm.getElementsByTagName('input')
console.log(lastInput[lastInput.length - 1]);
