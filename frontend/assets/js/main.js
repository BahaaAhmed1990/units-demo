const select = document.querySelectorAll(".form-select");
const gallery = document.querySelector("#gallery");
const errMsg = document.createElement("h3");
const imgItem = document.createElement("img");
// console.log(select);

[...select].map((elem) => {
  elem.addEventListener("change", function (e) {
    axios
      .get("/api/units", {
        params: {
          woodenLouvers: document.querySelector("#woodenLouvers").value,
          aluminumColor: document.querySelector("#aluminumColor").value,
          villaMainDoor: document.querySelector("#villaMainDoor").value,
          stonePattern: document.querySelector("#stonePattern").value,
          terazooPattern: document.querySelector("#terazooPattern").value,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (res) {
        console.log(res.data);
        document.querySelector(".msg")
          ? gallery.removeChild(errMsg)
          : console.log("");
        document.querySelector(".img-fluid")
          ? gallery.removeChild(imgItem)
          : console.log("");
        if (res.data.length === 0) {
          errMsg.textContent = "No Image found";
          errMsg.className = "msg";
          gallery.append(errMsg);
        } else {
          res.data.map((item) => {
            imgItem.className = "img-fluid";
            imgItem.src = `./assets/images/${item.fileName}`;
            gallery.append(imgItem);
          });
        }
      })
      .catch(function (err) {
        console.log(err.msg);
      });
  });
});
// function loadImg(e) {
// e.preventDefault();
// content.innerHTML = "<img src='./assets/images/blue-1.jpg' />";
// }
