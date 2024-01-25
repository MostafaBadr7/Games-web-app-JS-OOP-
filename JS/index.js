/*
 * Route - Frontend
 * JS program Week 11
 * Game web app (OOP)
 * (JS + Bootstrap + AJAX + APIs)"OOP"
 * 13/01/2024
 * Index home page JS
 * Mostafa Badr >> LinkedIn: https://www.linkedin.com/in/mostafa-badr-610b64208
 * Mostafa Badr >> GitHub: https://github.com/MostafaBadr7
 */

//................................. Global varaibles ...............................

let row = document.querySelector(".displayDiv"); //HTML Row
const detailsRow = document.querySelector(".game-info-details-layers");
const categoriesNavItems = document.querySelectorAll("[data-category]");
const loadingLayer = document.querySelector(".loading-layer");
const searchBtn = document.querySelector(".search-btn");
let categoryChoice = listenToNavItems();
//................................. Import Classes ...............................//

import { ui } from "./ui-display.js";
import { gameDetails } from "./game-details.js";
import { GamesHome } from "./games-home.js";

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> MAIN RUN <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//
let games = new ui(
  `https://free-to-play-games-database.p.rapidapi.com/api/games?${categoryChoice}`,
  "ca19ef010bmsha1a1a8edc427905p1ac854jsn68854d353ddd"
);
let details = new gameDetails(
  "ca19ef010bmsha1a1a8edc427905p1ac854jsn68854d353ddd",
  detailsRow
);
let cards;
games.apiConnection();
async function waitDisplayFunc2() {
  await games.displayGames();
  cards = document.querySelectorAll(".one-card"); //get all cards after their display
  details.getDetails(cards);
  let gamesHome = new GamesHome(
    searchBtn,
    categoriesNavItems,
    cards,
    row,
    "ca19ef010bmsha1a1a8edc427905p1ac854jsn68854d353ddd",
    detailsRow
  );
  gamesHome.search();
  return cards;
}
waitDisplayFunc2();

// let cards = waitDisplayFunc2(); //Games cards

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> NAV ITEMS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//
//.............nav items choose category .......................//
function listenToNavItems() {
  for (let i = 0; i < categoriesNavItems.length; i++) {
    categoriesNavItems[i].addEventListener("click", function (e) {
      for (let i = 0; i < categoriesNavItems.length; i++) {
        categoriesNavItems[i].classList.remove("active");
      }
      loadingLayer.classList.remove("d-none");
      document.querySelector("body").classList.add("overflow-hidden");
      e.preventDefault(); //prevent page reload - prevent link default attitude
      categoryChoice = `category=${this.dataset.category}`; //get the clicked data attribute called category in nav item
      displayCategoryChoice();
      this.classList.add("active");
      return categoryChoice;
    });
  }
}
//............. nav items display results .......................//
function displayCategoryChoice() {
  //Display Class
  let games = new ui(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?${categoryChoice}`,
    "ca19ef010bmsha1a1a8edc427905p1ac854jsn68854d353ddd"
  );

  //Details of each game Class
  let details = new gameDetails(
    "ca19ef010bmsha1a1a8edc427905p1ac854jsn68854d353ddd",
    detailsRow
  );
  games.apiConnection();

  //Wait display games to place adeventlistener to each game
  waitDisplayFunc(games, details);
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Automation Functions <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//
//..... Wait display games func to place adeventlistener to each game ..........//
async function waitDisplayFunc(gamesInstance, gameDetailsInstance) {
  await gamesInstance.displayGames();
  let cardsNotGlobalVariable = document.querySelectorAll(".one-card"); //get all cards after their display
  gameDetailsInstance.getDetails(cardsNotGlobalVariable);
}
