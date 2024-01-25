//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Display All Games Class <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//
export class ui {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
  }

  async apiConnection() {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": this.apiKey,
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const response = await fetch(this.url, options);
    const apiResults = response.json();
    return apiResults;
  }

  async displayGames(displayDiv = document.querySelector(".displayDiv")) {
    const loadingLayer = document.querySelector(".loading-layer");
    let htmlBox = ``;

    const apiResults = Array.from(await this.apiConnection());

    if (apiResults != undefined) {
      loadingLayer.classList.remove("d-none");
      document.querySelector("body").classList.add("overflow-hidden");

      for (let i = 0; i < apiResults.length; i++) {
        if (
          !apiResults[i].thumbnail.includes("/87/thumbnail") &
          !apiResults[i].thumbnail.includes("/293/thumbnail") &
          !apiResults[i].thumbnail.includes("/527/thumbnail") &
          !apiResults[i].thumbnail.includes("/329/thumbnail") &
          !apiResults[i].thumbnail.includes("/6/thumbnail")
        ) {
          htmlBox += `<div class="one-card  mb-5" id="${apiResults[i].id}">
      <div class="card text-warning  " style="width: 20rem; ">
        <img src="${apiResults[i].thumbnail}" class="card-img-top w-100" alt="...">
        <div class="card-body text-center d-flex flex-column justify-content-between">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="card-title">${apiResults[i].title}</h5>
            <a href="#" class="btn btn-success">Free</a>
          </div>
          <div class=" mb-auto">
          <p class="card-text p-norm-white">${apiResults[i].short_description}</p>
        </div>
        <div class="d-flex justify-content-between mb-1 mt-3 align-items-center  ">
          <div class="card-details-btn p-2 btn  btn-outline-primary rounded-2 text-primary me-1">${apiResults[i].genre}</div>
          <div class="card-details-btn p-2 btn btn-outline-primary rounded-2 text-primary ">${apiResults[i].platform}</div>
        </div>
        </div>
      </div>
    </div>`;
        }
      }

      displayDiv.innerHTML = htmlBox;
      loadingLayer.classList.add("d-none");
      document.querySelector("body").classList.remove("overflow-hidden");
    }
  }
}
