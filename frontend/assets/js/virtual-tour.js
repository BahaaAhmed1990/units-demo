const tableRow = document.createElement("tr");
const tableBody = document.querySelector("#tabel-body");
const labels = document.querySelectorAll(".my-label");
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
        console.log(document.querySelector(unitId));
        document.querySelector(unitId).style.visibility = "visible";
      }
      // if (row.c[1].v === "sold") {
      // let unitId = `#label-${row.c[0].v}`;
      // document.querySelector(unitId).style.backgroundColor = "#d1595994";
      // }
    });
    return rows;
  })
  // create table
  .then((rows) => {
    // const cells = rows.c;
    // console.log(cells);
    rows.map((row) => {
      // console.log(row.c);
      if (row.c[1].v === "available") {
        tableBody.innerHTML += `
      <tr class='units-rows' id='${row.c[0].v}'>
      <td>${row.c[2].v}</td>
      <td>${row.c[4].v}</td>
      <td>${row.c[3].v}</td>
      <td>${row.c[5].v}</td>
      </tr>`;
      }

      const unitsRows = document.querySelectorAll(".units-rows");
      [...unitsRows].map((row) => {
        row.addEventListener("mouseenter", function () {
          // console.log(this.id);
          document.querySelector(`#label-${this.id}`).style.opacity = ".7";
        });
        row.addEventListener("mouseleave", function () {
          // console.log(this.id);
          document.querySelector(`#label-${this.id}`).style.opacity = "1";
        });
      });
    });
    return rows;
  });
// // modify modal
// .then((rows) => {
//   console.log(rows);
//   [...labels].map((label) => {
//     label.addEventListener("click", function () {
//       let rowNum = Number(this.innerText);
//       console.log(rows[rowNum - 1].c[3].v);
//       document.querySelector("#staticBackdropLabel").textContent =
//         rows[rowNum - 1].c[3].v;

//       document.querySelector("#rooms").textContent = rows[rowNum - 1].c[4].v;

//       document.querySelector("#unit-code").textContent =
//         rows[rowNum - 1].c[2].v;

//       document.querySelector("#sellable-area").textContent =
//         rows[rowNum - 1].c[5].v;
//     });
//   });
// });

// // pin the table
// ScrollTrigger.create({
//   trigger: "#table",
//   pin: true,
//   onEnter: () => {
//     console.log(" enter");
//   },
// });
