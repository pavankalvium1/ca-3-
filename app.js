let Card = document.getElementById("Card");
let REFREST = document.getElementById("REFREST");
let searchBar = document.getElementById("searchBar");
let searchButton = document.getElementById("SearchButton");
let searchInput = document.getElementById("searchInput");
let modal = document.getElementById("nex");
let ingredients = document.getElementById("ingredients");
let span = document.getElementsByClassName("close")[0];
let mode = document.getElementsByClassName("Button");
let results = document.getElementById("results");

let mealCard;
let selectedMode;

async function randomMeal() {
  let arr;

  await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((data) => data.json())
    .then((e) => {
      arr = e;
    })
    .catch((error) => console.log(error));


  Card.innerHTML = `<div class="meal">
  <img class="mealimg" src=${arr.meals[0].strMealThumb}>
  <h3>${arr.meals[0].strMeal}</h3> </div>`;

  Card.addEventListener("click", (e) => {
    const parent = e.target.parentNode;
    const h3 = parent.getElementsByTagName("h3")[0];
    ingredientListMaker(h3.innerText);
  });
};
searchButton.onclick = () => {
  let input = searchBar.value;
  if (selectedMode == undefined) {
    window.alert("Please select any mode of search to procede further.");
  } else if (input == "") {
    searchInput.innerText = "Please enter valid input to procede  ";
    results.innerHTML = "";
  } else {
    searchInput.innerText = `Search Results for "${input}"`;
    searchMealBasedOnInput(input, selectedMode);
  };
};

async function searchMealBasedOnInput(input, mode) {
  if (mode == "mode1") {
    await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${input}`)
      .then((data) => data.json())
      .then((e) => {
        if (e.meals != null) {
          renderSearchResult(e);
        } else {
          results.innerHTML = "";
          results.innerText = "Not found!";
        };
      });
  } else if (mode == "mode2") {
    await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${input}`)
      .then((data) => data.json())
      .then((e) => {
        if (e.meals != null) {
          renderSearchResult(e);
        } else {
          results.innerHTML = "";
          results.innerText = "Not found!";
        };
      });
  } else if (mode == "mode3") {
    await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`)
      .then((data) => data.json())
      .then((e) => {
        if (e.meals != null) {
          renderSearchResult(e);
        }
      }).catch((error)=>{
        results.innerHTML = "";
        results.innerText = "Not found!";
      })
  };
};

function renderSearchResult(arrays) {
  results.innerHTML = "";
  arrays.meals.forEach((array) => {
    results.innerHTML += `<div class="meal">
    <img class="mealimg" src=${array.strMealThumb}>
    <h3>${array.strMeal}</h3> </div>`;
  });
  mealCard = document.querySelectorAll(".meal");
  eventListener();
};
function eventListener() {
  for (let i = 0; i < mealCard.length; i++) {
    const element = mealCard[i];
    element.onclick = (e) => {
      const parent = e.target.parentNode;
      const h3 = parent.getElementsByTagName("h3")[0];
      ingredientListMaker(h3.innerText);
    };
  };
};


async function ingredientListMaker(name) {
  let list;

  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((data) => data.json())
    .then((e) => {
      list = e;
    });
  ingredients.innerHTML = "";
  for (let i = 1; i < 21; i++) {
    let ingredient = list.meals[0][`strIngredient${i}`];
    if (!ingredient) {
      break;
    };
    ingredients.innerHTML += `${i}.${ingredient}<br>`;
  };


  modal.style.display = "block";
}
for (let i = 0; i < mode.length; i++) {
  mode[i].onclick = (e) => {
    for (let j = 0; j < mode.length; j++) {
      mode[j].style.color = "rgb(29, 26, 26)";
      mode[j].style.backgroundColor = "white";
    };
    mode[i].style.color = "white";
    mode[i].style.backgroundColor = "black";
    selectedMode = e.target.id;
  };
};
REFREST.onclick = () => {
  window.location = "index.html";
};
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
window.addEventListener("load", randomMeal);