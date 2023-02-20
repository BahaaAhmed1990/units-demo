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
const sheetId = "1dEy8bMqOo1cFngZpmf2hWQZpZedDITPXoGnAoTbxb2g";
const sheetTitle = "state";
const sheetRange = "A1:B9";
let fullUrl =
  "https://docs.google.com/spreadsheets/d/" +
  sheetId +
  "/gviz/tq?sheet=" +
  sheetTitle +
  "&range=" +
  sheetRange;

fetch(fullUrl)
  .then((res) => res.text())
  .then((rep) => {
    let data = JSON.parse(rep.substr(47).slice(0, -2));
    let rows = data.table.rows;
    // console.log(row.c[1].v)});
    console.log(rows);

    rows.map((row) => {
      if (row.c[1].v === "available") {
        let unitId = `#label-${row.c[0].v}`;
        console.log(unitId);
        document.querySelector(unitId).style.backgroundColor = "#00800094";
      }
      if (row.c[1].v === "sold") {
        let unitId = `#label-${row.c[0].v}`;
        console.log(unitId);
        document.querySelector(unitId).style.backgroundColor = "#d1595994";
      }
    });
  });
// function loadImg(e) {
// e.preventDefault();
// content.innerHTML = "<img src='./assets/images/blue-1.jpg' />";
