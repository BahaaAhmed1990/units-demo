const tableRow = document.createElement("tr");
const tableBody = document.querySelector("#tabel-body");
const labels = document.querySelectorAll(".my-label");
const unitInfo = document.querySelector("#unit-info");
const btn = document.querySelector("#unit-info-close");
const builidImg = document.querySelector("#builiding-img");
const apartImg = document.querySelector("#apartement-img");
const defaultImg = document.querySelector("#default-img");

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
        let unitId = `#${row.c[2].v}`;
        document.querySelector(unitId).style.visibility = "visible";
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
      if (row.c[1].v === "available") {
        tableBody.innerHTML += `
    <tr class='units-rows' id='r-${row.c[2].v}'>
    <td>${row.c[2].v}</td>
    <td>${row.c[4].v}</td>
    <td>${row.c[3].v}</td>
    <td>${row.c[5].v}</td>
    </tr>`;
      }

      const unitsRows = document.querySelectorAll(".units-rows");
      [...unitsRows].map((row) => {
        row.addEventListener("mouseenter", function () {
          let rowId = String(this.id.slice(2));
          // console.log(rowId);
          document.querySelector(`#${rowId}`).style.opacity = ".7";
        });
        row.addEventListener("mouseleave", function () {
          let rowId = this.id.slice(2);
          document.querySelector(`#${rowId}`).style.opacity = "1";
        });
        row.addEventListener("click", function () {
          unitInfo.style.display = "block";
          document.body.style.overflow = "hidden";
          let rowId = this.id.slice(2);
          console.log(rowId);

          defaultImg.setAttribute(
            "src",
            `./assets/images/${rowId}/floor-plan.webp`
          );

          builidImg.setAttribute(
            "src",
            `./assets/images/${rowId}/builiding.png`
          );
          apartImg.setAttribute(
            "src",
            `./assets/images/${rowId}/floor-plan.webp`
          );
          document.getElementById("defaultOpen").click();
        });
      });
    });
    return rows;
  });

// close modal
btn.addEventListener("click", function () {
  unitInfo.style.display = "none";
  document.body.style.overflow = "auto";
});

// open tab function for model
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
