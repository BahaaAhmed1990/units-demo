const switchButton = document.getElementById("toggle-switch_body");
const toggleTxt = document.getElementById("toggle-txt");
const toggleSwitchTrigger = document.getElementById("toggle-switch_trigger");
const d3 = document.querySelector(".wrapper-3d");
const d2 = document.querySelector(".wrapper-2d");
const tableRow = document.createElement("tr");
const tableBody = document.querySelector("#tabel-body");
const labels = document.querySelectorAll("#cabans .my-label");
// toggle the 2d ,3d maps
switchButton.addEventListener("click", () => {
  console.log("done");
  if (d2.classList.contains("active")) {
    d2.classList.toggle("active");
    d3.classList.toggle("active");
    toggleTxt.innerText = "3D";

    toggleSwitchTrigger.style.left = "59%";
  } else {
    d2.classList.toggle("active");
    d3.classList.toggle("active");
    toggleTxt.innerText = "2D";
    toggleSwitchTrigger.style.left = "9%";
  }
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

    console.log(rows);

    rows.map((row) => {
      if (row.c[5].v === "available") {
        let unitId = `#${row.c[1].v}`;
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
      if (row.c[5].v === "available") {
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
    // filters for table
    roomRange.addEventListener("change", function (e) {
      tableBody.replaceChildren();
      [...labels].map((label) => {
        label.style.visibility = "hidden";
      });
      rows.map((row) => {
        if (
          row.c[1].v === "available" &&
          row.c[4].v === Number(e.target.value)
        ) {
          // console.log(typeRange.value);
          // console.log(row.c[3].v);
          // console.log(typeRange.value == row.c[3].v);
          if (typeRange.value === "all" || typeRange.value === row.c[3].v) {
            document.querySelector(`#${row.c[2].v}`).style.visibility =
              "visible";
            tableBody.innerHTML += `
            <tr class='units-rows' id='r-${row.c[2].v}'>
            <td>${row.c[2].v}</td>
            <td>${row.c[4].v}</td>
            <td>${row.c[3].v}</td>
            <td>${row.c[5].v}</td>
            </tr>`;
          }
        }
      });
    });

    typeRange.addEventListener("change", function (e) {
      console.log(e.target.value);
      console.log(roomRange.value);
      tableBody.replaceChildren();
      [...labels].map((label) => {
        label.style.visibility = "hidden";
      });
      rows.map((row) => {
        if (row.c[1].v === "available" && e.target.value === "all") {
          document.querySelector(`#${row.c[2].v}`).style.visibility = "visible";
          tableBody.innerHTML += `
            <tr class='units-rows' id='r-${row.c[2].v}'>
            <td>${row.c[2].v}</td>
            <td>${row.c[4].v}</td>
            <td>${row.c[3].v}</td>
            <td>${row.c[5].v}</td>
            </tr>`;
        }
        if (row.c[1].v === "available" && e.target.value === row.c[3].v) {
          document.querySelector(`#${row.c[2].v}`).style.visibility = "visible";
          tableBody.innerHTML += `
            <tr class='units-rows' id='r-${row.c[2].v}'>
            <td>${row.c[2].v}</td>
            <td>${row.c[4].v}</td>
            <td>${row.c[3].v}</td>
            <td>${row.c[5].v}</td>
            </tr>`;
        }
      });
    });

    clearBtn.addEventListener("click", function (e) {
      e.preventDefault();
      tableBody.replaceChildren();
      [...labels].map((label) => {
        label.style.visibility = "hidden";
      });
      rows.map((row) => {
        if (row.c[1].v === "available") {
          document.querySelector(`#${row.c[2].v}`).style.visibility = "visible";
          tableBody.innerHTML += `
            <tr class='units-rows' id='r-${row.c[2].v}'>
            <td>${row.c[2].v}</td>
            <td>${row.c[4].v}</td>
            <td>${row.c[3].v}</td>
            <td>${row.c[5].v}</td>
            </tr>`;
        }
      });
    });
    return rows;
  })
  .catch((error) => {
    console.log(error);
  });
