import { gameDetails } from "./game-details.js";
export class GamesHome extends gameDetails {
  constructor(searchBtn, categoriesNavItems, cards, row, apiKey, detailsRow) {
    super(apiKey, detailsRow);
    this.searchBtn = searchBtn;
    this.categoriesNavItems = categoriesNavItems;
    this.cards = cards;
    this.row = row;
  }
  search() {
    let htmlBox2 = []; //Box for the search results
    this.searchBtn.addEventListener("click", () => {
      let searchValue = document.querySelector(".search-input").value;
      if (searchValue != undefined && searchValue != "") {
        for (let i = 0; i < this.categoriesNavItems.length; i++) {
          this.categoriesNavItems[i].classList.remove("active");
        }
        htmlBox2 = ``;
        for (let i = 0; i < this.cards.length; i++) {
          if (
            this.cards[i].textContent
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          ) {
            htmlBox2 += this.cards[i].outerHTML;
          }
        }
      }
      this.row.innerHTML = htmlBox2;
      let seachResultsCards = document.querySelectorAll(".one-card"); //get all cards after their display
      this.getDetails(seachResultsCards);
    });
  }
}
