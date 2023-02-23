const select = document.querySelectorAll(".form-select");
const gallery = document.querySelector("#gallery");
const errMsg = document.createElement("h3");
const imgItem = document.createElement("img");
const tableRow = document.createElement("tr");
const tableBody = document.querySelector("#tabel-body");
const labels = document.querySelectorAll(".my-label");
// console.log(select);

// choose unit
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

// fetch google sheet
const sheetId = "1dEy8bMqOo1cFngZpmf2hWQZpZedDITPXoGnAoTbxb2g";
const sheetTitle = "state";
const sheetRange = "A2:F10";
let fullUrl =
  "https://docs.google.com/spreadsheets/d/" +
  sheetId +
  "/gviz/tq?sheet=" +
  sheetTitle +
  "&range=" +
  sheetRange;

fetch(fullUrl)
  .then((res) => res.text())
  // modify spans
  .then((rep) => {
    let data = JSON.parse(rep.substr(47).slice(0, -2));
    let rows = data.table.rows;
    // console.log(row.c[1].v)});
    // console.log(rows);

    rows.map((row) => {
      if (row.c[1].v === "available") {
        let unitId = `#label-${row.c[0].v}`;

        document.querySelector(unitId).style.backgroundColor = "#00800094";
      }
      if (row.c[1].v === "sold") {
        let unitId = `#label-${row.c[0].v}`;
        document.querySelector(unitId).style.backgroundColor = "#d1595994";
      }
    });
    return rows;
  })
  // create table
  .then((rows) => {
    // const cells = rows.c;
    // console.log(cells);
    rows.map((row) => {
      // console.log(row.c);
      tableBody.innerHTML += `
      <tr class='units-rows' id='${row.c[0].v}'><td>${row.c[0].v}</td>
      <td>${row.c[2].v}</td>
      <td>${row.c[4].v}</td>
      <td>${row.c[3].v}</td>
      <td>${row.c[5].v}</td>
      </tr>`;
      const unitsRows = document.querySelectorAll(".units-rows");
      [...unitsRows].map((row) => {
        row.addEventListener("mouseenter", function () {
          console.log(this.id);
          document.querySelector(`#label-${this.id}`).style.opacity = ".5";
        });
        row.addEventListener("mouseleave", function () {
          console.log(this.id);
          document.querySelector(`#label-${this.id}`).style.opacity = "1";
        });
      });
    });
    return rows;
  })
  // modify modal
  .then((rows) => {
    console.log(rows);
    [...labels].map((label) => {
      label.addEventListener("click", function () {
        let rowNum = Number(this.innerText);
        console.log(rows[rowNum - 1].c[3].v);
        document.querySelector("#staticBackdropLabel").textContent =
          rows[rowNum - 1].c[3].v;

        document.querySelector("#rooms").textContent = rows[rowNum - 1].c[4].v;

        document.querySelector("#unit-code").textContent =
          rows[rowNum - 1].c[2].v;

        document.querySelector("#sellable-area").textContent =
          rows[rowNum - 1].c[5].v;
      });
    });
  });

// pin the table
ScrollTrigger.create({
  trigger: "#table",
  pin: true,
  onEnter: () => {
    console.log(" enter");
  },
});
