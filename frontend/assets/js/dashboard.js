console.log("dash");
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Task", "Hours per Day"],
    ["unrelased", 11],
    ["reserved", 2],
    ["contracted", 2],
    ["available", 2],
    ["Blocked", 7],
  ]);

  var options = {
    title: "Realse to sales",
    legend: { position: "none" },
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );

  chart.draw(data, options);
}

// fetch google sheet
const sheetId = "1ulvazoLPKQFicCIHS8aRrKTsGAX49fZLBxFvx9HMXZw";
const sheetTitle = "Sheet1";
const sheetRange = "A2:E22";
let fullUrl =
  "https://docs.google.com/spreadsheets/d/" +
  sheetId +
  "/gviz/tq?sheet=" +
  sheetTitle +
  "&range=" +
  sheetRange;

fetch(fullUrl)
  .then((res) => res.text())
  // extract all rows
  .then((rep) => {
    let data = JSON.parse(rep.substr(47).slice(0, -2));
    let allRows = data.table.rows;
    console.log(allRows);

    return allRows;
    //create labels
  })
  .then((allRows) => {
    createLabels(allRows);
    return allRows;
  })
  // filter labels
  .then((allRows) => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const checkedBoxes = {
          A: document.getElementById("unrelased").checked,
          B: document.getElementById("reserved").checked,
          C: document.getElementById("contracted").checked,
          D: document.getElementById("Blocked").checked,
          E: document.getElementById("available").checked,
        };
        const filteredLabels = filterLabels(allRows, checkedBoxes);
        console.log(filteredLabels);
        // do something with filteredArray, like display it on the page
        createLabels(filteredLabels);
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });

// create label function
function createLabels(rows) {
  // get all labels
  const allD2Labels = document.querySelectorAll(".d2-label");
  // remove all labels
  allD2Labels.forEach((lable) => {
    lable.remove();
  });
  rows.forEach((row) => {
    // Create a new HTML element called "spanElem" using the "createElement" method
    const spanElem = document.createElement("span");

    // Add a class called "d2-label" to the element using the "classList.add" method
    spanElem.classList.add("d2-label");

    // Set an attribute called "id" to the element using the "setAttribute" method, with the value of "d2-" followed by the value of the fifth column of the "row" object
    spanElem.setAttribute("id", `d2-${row.c[4].v}`);

    switch (row.c[0].v) {
      case "unrelased":
        spanElem.style.backgroundColor = "rgb(51, 102, 204)";
        break;
      case "reserved":
        spanElem.style.backgroundColor = "rgb(220, 57, 18)";
        break;
      case "contracted":
        spanElem.style.backgroundColor = "rgb(255, 153, 0)";
        break;
      case "Blocked":
        spanElem.style.backgroundColor = "rgb(153, 0, 153)";
        break;
      case "available":
        spanElem.style.backgroundColor = "#109618";
        break;
      default:
        spanElem.style.backgroundColor = "yellow";
        break;
    }

    // Append the "spanElem" element to an HTML element with the ID "d2-img-container" using the "append" method
    document.querySelector("#d2-img-container").append(spanElem);
  });
}

// filter labels
function filterLabels(array, checkedBoxes) {
  console.log(checkedBoxes);
  const filteredArray = [];
  const checked = [];
  const propMap = {
    A: "unrelased",
    B: "reserved",
    C: "contracted",
    D: "Blocked",
    E: "available",
  };
  Object.keys(checkedBoxes).forEach((checkbox) => {
    if (checkedBoxes[checkbox]) {
      checked.push(propMap[checkbox]);
    }
  });
  console.log(checked);
  array.forEach((row) => {
    let match = true;
    Object.keys(checkedBoxes).forEach((checkbox) => {
      if (checkedBoxes[checkbox] && !checked.includes(row.c[0].v)) {
        match = false;
      }
    });
    if (match) {
      filteredArray.push(row);
    }
  });

  return filteredArray;
}
