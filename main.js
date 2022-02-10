//select main and btns
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const deleteUserBtn = document.getElementById("delete-user");
const doubleMoneyBtn = document.getElementById("double-money");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const sortMaleBtn = document.getElementById("sort-male");
const sortFemaleBtn = document.getElementById("sort-female");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let dataArr = [];

for (let i = 0; i < 3; i++) {
  getRandomUser();
}

//using classic function declaration to take advantage of hoisting

//fetch random user, generate a new one and add money, gender and picture. Also add it to the arr
async function getRandomUser() {
  const response = await fetch("https://randomuser.me/api");
  const data = await response.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
    gender: `${user.gender}`,
    picture: `${user.picture.thumbnail}`,
  };

  addData(newUser);
}

//add new obj (user) to the data arr
function addData(obj) {
  dataArr.push(obj);

  updateDOM();
}

//delete obj (user) in the data arr
function deleteData(obj) {
  dataArr.pop(obj);

  updateDOM();
}

function updateDOM(providedData = dataArr) {
  //clean main div
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";

  //iterate over each item (obj) of the arr
  dataArr.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");

    element.innerHTML = `<img src="${
      item.picture
    }" alt="person picture"><strong>${item.name}</strong>
    <span>${formatMoney(item.money)}</span>`;

    main.appendChild(element);
  });
}

//double user money
function doubleMoney() {
  dataArr = dataArr.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

//sort by richest user (descending - richest person first)
function sortByRichest() {
  dataArr.sort((a, b) => {
    return b.money - a.money;
  });

  updateDOM();
}

//sort by gender: male
function sortByMale() {
  dataArr = dataArr.filter((user) => {
    return user.gender === "male" ? user : null;
  });

  updateDOM();
}

//sort by gender: female
function sortByFemale() {
  dataArr = dataArr.filter((user) => {
    return user.gender === "female" ? user : null;
  });

  updateDOM();
}

//show only millionaires
function filterMillionaires() {
  dataArr = dataArr.filter((user) => {
    return user.money >= 1000000;
  });

  updateDOM();
}

//calculate all users wealth combined
function calculateWealth() {
  const wealth = dataArr.reduce((acc, user) => {
    return (acc += user.money);
  }, 0);

  const element = document.createElement("div");

  element.innerHTML = `<h3><strong>Total Wealth: <span>${formatMoney(
    wealth
  )}</span></strong></h3>`;

  main.appendChild(element);
}

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//Event listeners
addUserBtn.addEventListener("click", getRandomUser);
deleteUserBtn.addEventListener("click", deleteData);
doubleMoneyBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", filterMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
sortMaleBtn.addEventListener("click", sortByMale);
sortFemaleBtn.addEventListener("click", sortByFemale);
