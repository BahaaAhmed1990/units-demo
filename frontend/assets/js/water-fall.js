const switchButton = document.getElementById("toggle-switch_body");
const toggleTxt = document.getElementById("toggle-txt");
const toggleSwitchTrigger = document.getElementById("toggle-switch_trigger");
const d3 = document.querySelector(".wrapper-3d");
const d2 = document.querySelector(".wrapper-2d");
const tableRow = document.createElement("tr");
const tableBody = document.querySelector("#tabel-body");
const labels = document.querySelectorAll("#cabans .my-label");
//  filter form IDs for the select  input fields
const areaMinSelect = document.getElementById("area-min");
const areaMaxSelect = document.getElementById("area-max");
const priceMinInput = document.getElementById("price-min");
const priceMaxInput = document.getElementById("price-max");
const roomsMinSelect = document.getElementById("rooms-min");
const roomsMaxSelect = document.getElementById("rooms-max");
const typesSelect = document.getElementById("form-types");
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
  // return row data
  .then((rep) => {
    let data = JSON.parse(rep.substr(47).slice(0, -2));
    let rows = data.table.rows;

    // console.log(rows);
    return rows;
  })
  // create table and filter it using the form
  .then((rows) => {
    console.log(rows);

    createTable(rows);
    createLabels(rows);

    // Bind change event listeners to the filter elements
    areaMinSelect.addEventListener("change", function (e) {
      filterData();
      setLabel(e);
    });
    areaMaxSelect.addEventListener("change", function (e) {
      filterData();
      setLabel(e);
    });
    priceMinInput.addEventListener("change", function (e) {
      filterData();
      setLabel(e);
    });
    priceMaxInput.addEventListener("change", function (e) {
      filterData();
      setLabel(e);
    });
    typesSelect.addEventListener("change", filterData);
    roomsMinSelect.addEventListener("change", function (e) {
      filterData();
      setLabel(e);
    });
    roomsMaxSelect.addEventListener("change", function (e) {
      filterData();
      setLabel(e);
    });
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
      console.log(rows);
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

          // If all filters pass, include the row in the filtered data
          return true;
        });
        // Update the table to display the filtered data
        console.log(filteredData);
        createTable(filteredData);
        createLabels(filteredData);
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
        createLabels(filteredData);
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
        createLabels(filteredData);
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
        createLabels(filteredData);
      }
    }
    // set label content
    function setLabel(e) {
      console.log(e.target.id);
      console.log();
      document.querySelector(`label[for=${e.target.id}]`).textContent =
        e.target.value;
    }
    // return rows;
  })
  .catch((error) => {
    console.log(error);
  });

// create the table
function createTable(rows) {
  // clear table
  tableBody.innerHTML = "";

  // hide all labels
  // const d2Labels = document.querySelectorAll(".d2-label");
  // [...d2Labels].map((label) => {
  //   label.style.display = "none";
  // });

  // create the table and add listeners to its rows
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

    // add listeners to table rows and pop up
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
        document.querySelector(`#r-${rowId}`).classList.add("clicked");
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
        document
          .querySelector(".close-pop-up")
          .addEventListener("click", function () {
            console.log("close");
            popUp.style.display = "none";
            document.querySelector(`#r-${rowId}`).classList.remove("clicked");
          });
      });
    });
  });
}

// create Labels on image
function createLabels(rows) {
  const allD2Labels = document.querySelectorAll(".d2-label");
  allD2Labels.forEach((lable) => {
    lable.remove();
  });
  rows.map((row) => {
    const spanElem = document.createElement("span");
    spanElem.classList.add("d2-label");
    spanElem.setAttribute("id", `d2-${row.c[3].v}`);
    spanElem.addEventListener("mouseover", function () {
      // console.log(this);
      this.classList.add("anime");
      document.querySelector(`#r-${row.c[3].v}`).classList.add("active");
    });
    spanElem.addEventListener("mouseout", function () {
      console.log("ouy");
      this.classList.remove("anime");
      document.querySelector(`#r-${row.c[3].v}`).classList.remove("active");
    });
    spanElem.addEventListener("click", function () {
      document.querySelector(`#r-${row.c[3].v}`).classList.add("clicked");
      // console.log(tableRow);
      const label = document.querySelector(`#d2-${row.c[3].v}`);
      const labelPosition = label.getBoundingClientRect();
      const imagePosition = label.parentElement.getBoundingClientRect();
      const labelTop =
        ((labelPosition.top - imagePosition.top) / imagePosition.height) * 100;
      const labelLeft =
        ((labelPosition.left - imagePosition.left) / imagePosition.width) * 100;
      // console.log(labelTop, labelLeft);
      // get the data from row element
      const unitId = document.querySelector(
        `#r-${row.c[3].v} .unit-id`
      ).innerText;
      const unitArea = document.querySelector(
        `#r-${row.c[3].v} .unit-area`
      ).innerText;
      const unitRoom = document.querySelector(
        `#r-${row.c[3].v} .unit-room`
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
      // close the pop up
      document
        .querySelector(".close-pop-up")
        .addEventListener("click", function () {
          console.log("close");
          popUp.style.display = "none";
          document
            .querySelector(`#r-${row.c[3].v}`)
            .classList.remove("clicked");
        });
    });
    document.querySelector("#d2-img-container").append(spanElem);
  });
}
// close the pop up
// document.querySelector(".close-pop-up").addEventListener("click", function () {
//   console.log("close");
//   popUp.style.display = "none";
//   document.querySelector(`#r-${row.c[3].v}`).classList.remove("clicked");
// });
