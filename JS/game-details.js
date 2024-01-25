//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> DETAILS OF EVERY GAME <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//
export class gameDetails {
  constructor(apiKey, detailsRow) {
    this.detailsRow = detailsRow; //Details HTML row
    this.apiKey = apiKey;
    this.loader = document.querySelector(".loading-layer");
  }
  async getDetails(gamesCards) {
    for (let i = 0; i < gamesCards.length; i++) {
      gamesCards[i].addEventListener("click", (e) => {
        this.loader.classList.remove("d-none");
        document.querySelector("body").classList.add("overflow-hidden");
        this.detailsApiConnection(gamesCards[i].id);
      });
    }
  }

  async detailsApiConnection(apiGameId) {
    this.loader.classList.remove("d-none");
    document.querySelector("body").classList.add("overflow-hidden");
    this.url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${apiGameId}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": this.apiKey,
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${apiGameId}`,
        options
      );
      const detailsApiResults = await response.json();
      this.showDetails(detailsApiResults);
      this.moveGameDetails(detailsApiResults);
      this.loader.classList.add("d-none");
      document.querySelector("body").classList.remove("overflow-hidden");
    } catch (error) {
      console.error(error);
    }
  }

  showDetails(detailsApiResults) {
    this.mainLayerSections = document.querySelectorAll(".box-section "); //hide games section
    this.detailsLayer = document.querySelector(".details-layer"); //Show layer of game details
    this.closeDetailsBtn = document.querySelector(".close-details-btn");
    if (detailsApiResults != undefined) {
      //For on all sections I wanna hide
      for (let i = 0; i < this.mainLayerSections.length; i++) {
        this.mainLayerSections[i].classList.add("d-none");
        //Listener on the X button
        this.closeDetailsBtn.addEventListener("click", () => {
          this.mainLayerSections[i].classList.remove("d-none");
          this.detailsLayer.classList.add("d-none");
          this.loader.classList.add("d-none");
        });
      }
      this.detailsLayer.classList.remove("d-none");
    }
  }

  moveGameDetails(detailsApiResults) {
    console.log(detailsApiResults);
    //Game Information
    this.detailsRow.innerHTML = `<h1 class=""><span class="fs-2 fw-light">Title:</span> ${detailsApiResults.title}
    </h1>
    <div class="d-flex flex-column justify-content-between">
      <span class="my-2  ">Category:<span class="fw-bolder"> ${detailsApiResults.genre} </span></span>
      <span class="mb-2  ">Platform:<span class="fw-bolder"> ${detailsApiResults.platform}</span></span>
      <span class="mb-2  ">Status:<span class="fw-bolder"> ${detailsApiResults.status}</span></span>
    </div>
    <p class="">${detailsApiResults.description}</p>
    <h4>Requirements:</h4>
    <table class="fw-bold">
    <tr>
    <td><span class="fw-light">processor:</span></td><td> ${detailsApiResults.minimum_system_requirements.processor}<td>
    </tr>
    <tr>
    <td><span class="fw-light">Graphics:</span></td><td> ${detailsApiResults.minimum_system_requirements.graphics}</td>
    </tr>
    <tr>
    <td><span class="fw-light">os:</span></td><td> ${detailsApiResults.minimum_system_requirements.os}</td>
    </tr>
    <tr>
    <td><span class="fw-light">memory:</span></td><td> ${detailsApiResults.minimum_system_requirements.memory}</td>
    </tr>
    <tr>
    <td><span class="fw-light">storage:</span></td><td> ${detailsApiResults.minimum_system_requirements.storage}</td>
    </tr>
     </table>
    <button class="btn btn-danger  mt-3"><a class="text-white special-font text-decoration-none" target="_blank" href="${detailsApiResults.game_url}">Show Game</a></button>`;
    //Carousal and add game screenshots to the view
    const gameCarrousal = document.querySelector(".carousel-inner");
    //Insert one img to change the exist imgs from the previous showed game
    gameCarrousal.innerHTML = `<div class="carousel-item active"><img src="${detailsApiResults.screenshots[0].image}" class="game-details-photo d-block w-100 img-fluid" alt=""></div>`;
    //+ the rest of the imgs
    for (let i = 1; i < detailsApiResults.screenshots.length; i++) {
      gameCarrousal.innerHTML += `<div class="carousel-item"><img src="${detailsApiResults.screenshots[i].image}" class="game-details-photo d-block w-100 img-fluid" alt=""></div>`;
    }
  }
}
