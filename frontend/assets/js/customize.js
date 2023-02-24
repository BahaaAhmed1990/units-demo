const radioInputs = document.querySelectorAll(".btn-check");
const carouselInner = document.querySelector(".carousel-inner");

[...radioInputs].map((elem) => {
  elem.addEventListener("click", function () {
    axios
      .get("/api/units", {
        params: {
          woodenLouvers: document.querySelector(
            "input[type='radio'][name=wl-btnradio]:checked"
          ).value,
          aluminumColor: document.querySelector(
            "input[type='radio'][name=ac-btnradio]:checked"
          ).value,
          villaMainDoor: document.querySelector(
            "input[type='radio'][name=vm-btnradio]:checked"
          ).value,
          stonePattern: document.querySelector(
            "input[type='radio'][name=sp-btnradio]:checked"
          ).value,
          terazooPattern: document.querySelector(
            "input[type='radio'][name=tb-btnradio]:checked"
          ).value,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (res) {
        addCarouselContents(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  });
});

// helper functions

// 1. create carosel content
function addCarouselContents(data) {
  console.log(data);
  let index = 0;
  // check for data
  if (data.length === 0) {
    return;
  } else {
    // remove carousel innner content
    carouselInner.replaceChildren();

    // loop over elements of data
    data.map((elem) => {
      // add content to carousel
      if (index === 0) {
        carouselInner.innerHTML += `<div class="carousel-item active">
        <img
        src="./assets/images/${elem.fileName}"
        class="d-block w-100"
        alt="..."
        />
        </div>`;
      } else {
        carouselInner.innerHTML += `<div class="carousel-item">
        <img
        src="./assets/images/${elem.fileName}"
        class="d-block w-100"
        alt="..."
        />
        </div>`;
      }
      index++;
    });
  }
}

// 2.add path to download button
function addLinkPath(data) {
  document
    .querySelector("#down-load-btn")
    .setAttribute("href", `/assets/pdf/${data[0].pdf}`);
}

document.addEventListener("DOMContentLoaded", function () {
  axios
    .get("/api/units", {
      params: {
        woodenLouvers: "A",
        aluminumColor: "A",
        villaMainDoor: "A",
        stonePattern: "A",
        terazooPattern: "A",
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(function (res) {
      addCarouselContents(res.data);
      addLinkPath(res.data);
    })
    .catch(function (err) {
      console.log(err);
    });
});
