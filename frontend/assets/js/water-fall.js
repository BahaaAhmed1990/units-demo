const switchButton = document.getElementById("toggle-switch_body");
const toggleTxt = document.getElementById("toggle-txt");
const toggleSwitchTrigger = document.getElementById("toggle-switch_trigger");
const d3 = document.querySelector(".wrapper-3d");
const d2 = document.querySelector(".wrapper-2d");
const tableRow = document.createElement("tr");
const tableBody = document.querySelector("#tabel-body");
const labels = document.querySelectorAll("#cabans .my-label");
// Assume your filter form has IDs for the select elements and input fields
const areaMinSelect = document.getElementById("area-min");
const areaMaxSelect = document.getElementById("area-max");
const priceMinInput = document.getElementById("price-min");
const priceMaxInput = document.getElementById("price-max");
const roomsMinSelect = document.getElementById("rooms-min");
const roomsMaxSelect = document.getElementById("rooms-max");
const typesSelect = document.getElementById("types");
const statusSelect = document.getElementById("status");
// full screen mode
const fullScreenContent = document.querySelector(".main");
const fullScreenBtn = document.querySelector("#fullscreenBtn");
// pop-up
const popUp = document.querySelector(".pop-up");

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
const sheetTitle = "waterfall";
const sheetRange = "A2:N216";
let fullUrl =
  "https://docs.google.com/spreadsheets/d/" +
  sheetId +
  "/gviz/tq?sheet=" +
  sheetTitle +
  "&range=" +
  sheetRange;

const data = fetch(fullUrl)
  .then((res) => res.text())
  // modify spans
  .then((rep) => {
    let data = JSON.parse(rep.substr(47).slice(0, -2));
    let rows = data.table.rows;

    // console.log(rows);

    rows.map((row) => {
      if (row.c[0].v === "available") {
        // let unitId = `#${row.c[1].v}`;
        // document.querySelector(unitId).style.visibility = "visible";
        // console.log(row.c);
      }
    });
    return rows;
  })
  // create table and filter it using the form
  .then((rows) => {
    console.log(rows);

    createTable(rows);

    // Bind change event listeners to the filter elements
    areaMinSelect.addEventListener("change", filterData);
    areaMaxSelect.addEventListener("change", filterData);
    priceMinInput.addEventListener("change", filterData);
    priceMaxInput.addEventListener("change", filterData);
    typesSelect.addEventListener("change", filterData);
    roomsMinSelect.addEventListener("change", filterData);
    roomsMaxSelect.addEventListener("change", filterData);
    statusSelect.addEventListener("change", filterData);
    // Define the filterData function to filter the data based on the current values of the filter elements
    function filterData() {
      // Get the current values of all the filter elements
      const filters = {
        area: {
          min: Number(areaMinSelect.value),
          max: Number(areaMaxSelect.value),
        },
        price: {
          min: Number(priceMinInput.value) * 1000000,
          max: Number(priceMaxInput.value) * 1000000,
        },
        rooms: {
          min: Number(roomsMinSelect.value),
          max: Number(roomsMaxSelect.value),
        },
        types: typesSelect.value,
        status: statusSelect.value,
      };

      console.log(filters);
      // check all types

      // types all and status all
      if (filters.types === "all" && filters.status === "all") {
        const filteredData = rows.filter((row) => {
          // Check if the area matches the filter
          if (
            filters.area &&
            (row.c[9].v < filters.area.min || row.c[9].v > filters.area.max)
          ) {
            return false;
          }

          // // Check if the price is within the filter range
          if (
            filters.price &&
            (row.c[12].v < filters.price.min || row.c[12].v > filters.price.max)
          ) {
            return false;
          }
          // // Check if the room number matches the filter
          if (
            filters.rooms &&
            (row.c[5].v + row.c[6].v < filters.rooms.min ||
              row.c[5].v + row.c[6].v > filters.rooms.max)
          ) {
            return false;
          }

          // // // Check if the type matches the filter
          // if (filters.types && row.c[13].v !== filters.types) {
          //   return false;
          // }

          // Check if the status matches the filter
          // if (filters.status && row.c[0].v !== filters.status) {
          //   return false;
          // }

          // If all filters pass, include the row in the filtered data
          return true;
        });
        // Update the table to display the filtered data
        console.log(filteredData);
        createTable(filteredData);
      }

      // types all
      else if (filters.types === "all") {
        const filteredData = rows.filter((row) => {
          // Check if the area matches the filter
          if (
            filters.area &&
            (row.c[9].v < filters.area.min || row.c[9].v > filters.area.max)
          ) {
            return false;
          }

          // // Check if the price is within the filter range
          if (
            filters.price &&
            (row.c[12].v < filters.price.min || row.c[12].v > filters.price.max)
          ) {
            return false;
          }
          // // Check if the room number matches the filter
          if (
            filters.rooms &&
            (row.c[5].v + row.c[6].v < filters.rooms.min ||
              row.c[5].v + row.c[6].v > filters.rooms.max)
          ) {
            return false;
          }

          // // // Check if the type matches the filter
          // if (filters.types && row.c[13].v !== filters.types) {
          //   return false;
          // }

          // Check if the status matches the filter
          if (filters.status && row.c[0].v !== filters.status) {
            return false;
          }

          // If all filters pass, include the row in the filtered data
          return true;
        });
        // Update the table to display the filtered data
        console.log(filteredData);
        createTable(filteredData);
      } else if (filters.status === "all") {
        const filteredData = rows.filter((row) => {
          // Check if the area matches the filter
          if (
            filters.area &&
            (row.c[9].v < filters.area.min || row.c[9].v > filters.area.max)
          ) {
            return false;
          }

          // // Check if the price is within the filter range
          if (
            filters.price &&
            (row.c[12].v < filters.price.min || row.c[12].v > filters.price.max)
          ) {
            return false;
          }
          // // Check if the room number matches the filter
          if (
            filters.rooms &&
            (row.c[5].v + row.c[6].v < filters.rooms.min ||
              row.c[5].v + row.c[6].v > filters.rooms.max)
          ) {
            return false;
          }

          // // // Check if the type matches the filter
          if (filters.types && row.c[13].v !== filters.types) {
            return false;
          }

          // Check if the status matches the filter
          // if (filters.status && row.c[0].v !== filters.status) {
          // return false;
          // }

          // If all filters pass, include the row in the filtered data
          return true;
        });
        // Update the table to display the filtered data
        console.log(filteredData);
        createTable(filteredData);
      } else {
        // Filter the data based on the filter values
        const filteredData = rows.filter((row) => {
          // Check if the area matches the filter
          if (
            filters.area &&
            (row.c[9].v < filters.area.min || row.c[9].v > filters.area.max)
          ) {
            return false;
          }

          // // Check if the price is within the filter range
          if (
            filters.price &&
            (row.c[12].v < filters.price.min || row.c[12].v > filters.price.max)
          ) {
            return false;
          }
          // // Check if the room number matches the filter
          if (
            filters.rooms &&
            (row.c[5].v + row.c[6].v < filters.rooms.min ||
              row.c[5].v + row.c[6].v > filters.rooms.max)
          ) {
            return false;
          }

          // // // Check if the type matches the filter
          if (filters.types && row.c[13].v !== filters.types) {
            return false;
          }

          // Check if the status matches the filter
          if (filters.status && row.c[0].v !== filters.status) {
            return false;
          }

          // If all filters pass, include the row in the filtered data
          return true;
        });

        // Update the table to display the filtered data
        console.log(filteredData);
        createTable(filteredData);
      }
    }
    return rows;
  })
  .catch((error) => {
    console.log(error);
  });

// create the table
function createTable(rows) {
  tableBody.innerHTML = "";
  rows.map((row) => {
    // console.log(row.c);
    if (row.c[6].v === 1) {
      tableBody.innerHTML += `
              <tr class='units-rows' id='r-${row.c[3].v}'>
                <td>${row.c[3].v}</td>
              <td>${row.c[9].v}m2</td>
              <td>${row.c[12].v}</td>
              <td>${row.c[5].v}+1</td>
              <td>${row.c[13].v}</td>
              </tr>`;
    } else {
      tableBody.innerHTML += `
              <tr class='units-rows' id='r-${row.c[3].v}'>
              <td class="unit-id">${row.c[3].v}</td>
              <td class="unit-area">${row.c[9].v}m2</td>
              <td class="unit-price">${row.c[12].v}</td>
              <td class="unit-room">${row.c[5].v}</td>
              <td class="unit-type">${row.c[13].v}</td>
              </tr>`;
    }

    const unitsRows = document.querySelectorAll(".units-rows");
    [...unitsRows].map((row) => {
      row.addEventListener("mouseenter", function () {
        let rowId = String(this.id.slice(2));
        console.log(rowId);
        document.querySelector(`#d2-${rowId}`).classList.add("anime");
      });
      row.addEventListener("mouseleave", function () {
        let rowId = this.id.slice(2);
        document.querySelector(`#d2-${rowId}`).classList.remove("anime");
      });
      row.addEventListener("click", function () {
        let rowId = this.id.slice(2);
        console.log(rowId);
        const label = document.querySelector(`#d2-${rowId}`);
        const labelPosition = label.getBoundingClientRect();
        const imagePosition = label.parentElement.getBoundingClientRect();
        const labelTop =
          ((labelPosition.top - imagePosition.top) / imagePosition.height) *
          100;
        const labelLeft =
          ((labelPosition.left - imagePosition.left) / imagePosition.width) *
          100;
        console.log(labelTop, labelLeft);
        // get the data from row element
        const unitId = document.querySelector(`#r-${rowId} .unit-id`).innerText;
        const unitArea = document.querySelector(
          `#r-${rowId} .unit-area`
        ).innerText;
        const unitRoom = document.querySelector(
          `#r-${rowId} .unit-room`
        ).innerText;
        console.log(unitId, unitArea, unitRoom);
        popUp.style.display = "flex";
        popUp.style.top = `${labelTop}%`;
        popUp.style.left = `${labelLeft}%`;
        popUp.querySelector(
          ".pop-up-heading span:first-child"
        ).innerText = `ID :${unitId}`;
        popUp.querySelector(".pop-up-rooms span").innerText = unitRoom;
        popUp.querySelector(".pop-up-area span").innerText = unitArea;
      });
    });
  });
}

// close the pop up
document.querySelector(".close-pop-up").addEventListener("click", function () {
  console.log("close");
  popUp.style.display = "none";
});

// go full screen mode
fullScreenBtn.addEventListener("click", () => {
  if (document.fullscreenElement === fullScreenContent) {
    document.exitFullscreen();
    console.log("first");
  } else {
    fullScreenContent.requestFullscreen();
  }
});
// // filters for table
// roomRange.addEventListener("change", function (e) {
//   tableBody.replaceChildren();
//   [...labels].map((label) => {
//     label.style.visibility = "hidden";
//   });
//   rows.map((row) => {
//     if (
//       row.c[1].v === "available" &&
//       row.c[4].v === Number(e.target.value)
//     ) {
//       // console.log(typeRange.value);
//       // console.log(row.c[3].v);
//       // console.log(typeRange.value == row.c[3].v);
//       if (typeRange.value === "all" || typeRange.value === row.c[3].v) {
//         document.querySelector(`#${row.c[2].v}`).style.visibility =
//           "visible";
//         tableBody.innerHTML += `
//         <tr class='units-rows' id='r-${row.c[2].v}'>
//         <td>${row.c[2].v}</td>
//         <td>${row.c[4].v}</td>
//         <td>${row.c[3].v}</td>
//         <td>${row.c[5].v}</td>
//         </tr>`;
//       }
//     }
//   });
// });

// typeRange.addEventListener("change", function (e) {
//   console.log(e.target.value);
//   console.log(roomRange.value);
//   tableBody.replaceChildren();
//   [...labels].map((label) => {
//     label.style.visibility = "hidden";
//   });
//   rows.map((row) => {
//     if (row.c[1].v === "available" && e.target.value === "all") {
//       document.querySelector(`#${row.c[2].v}`).style.visibility = "visible";
//       tableBody.innerHTML += `
//         <tr class='units-rows' id='r-${row.c[2].v}'>
//         <td>${row.c[2].v}</td>
//         <td>${row.c[4].v}</td>
//         <td>${row.c[3].v}</td>
//         <td>${row.c[5].v}</td>
//         </tr>`;
//     }
//     if (row.c[1].v === "available" && e.target.value === row.c[3].v) {
//       document.querySelector(`#${row.c[2].v}`).style.visibility = "visible";
//       tableBody.innerHTML += `
//         <tr class='units-rows' id='r-${row.c[2].v}'>
//         <td>${row.c[2].v}</td>
//         <td>${row.c[4].v}</td>
//         <td>${row.c[3].v}</td>
//         <td>${row.c[5].v}</td>
//         </tr>`;
//     }
//   });
// });

// clearBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   tableBody.replaceChildren();
//   [...labels].map((label) => {
//     label.style.visibility = "hidden";
//   });
//   rows.map((row) => {
//     if (row.c[1].v === "available") {
//       document.querySelector(`#${row.c[2].v}`).style.visibility = "visible";
//       tableBody.innerHTML += `
//         <tr class='units-rows' id='r-${row.c[2].v}'>
//         <td>${row.c[2].v}</td>
//         <td>${row.c[4].v}</td>
//         <td>${row.c[3].v}</td>
//         <td>${row.c[5].v}</td>
//         </tr>`;
//     }
//   });
// });
