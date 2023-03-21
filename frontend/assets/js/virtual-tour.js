var intervalRewind;
const tableRow = document.createElement("tr");
const tableBody = document.querySelector("#tabel-body");
const labels = document.querySelectorAll("#cabans .my-label");
const unitInfo = document.querySelector("#unit-info");
const btn = document.querySelector("#unit-info-close");
const builidImg = document.querySelector("#builiding-img");
const apartImg = document.querySelector("#apartement-img");
const defaultImg = document.querySelector("#default-img");
const roomRange = document.querySelector("#room-range");
const typeRange = document.querySelector("#type-range");
const clearBtn = document.querySelector("#clear-btn");
const btnOne = document.querySelector("#btn-1");
const btnTwo = document.querySelector("#btn-2");
const vidOne = document.querySelector("#vid-1");
const controlBtn = document.querySelector("#control-btn");
const list = document.querySelector("#list");
const markBtn = document.querySelector("#mark-btn");
const roadBtn = document.querySelector("#road-btn");
const mosBtn = document.querySelector("#mosque-btn");
const airport = document.querySelector("#airport-mark");
const matroh = document.querySelector("#matroh-mark");

// menu button
controlBtn.addEventListener("click", function () {
  if (list.classList.contains("active")) {
    console.log("first");
    list.classList.replace("active", "hide");
    list.setAttribute("style", "display:none");
  } else {
    list.classList.replace("hide", "active");
    list.setAttribute("style", "display:block");
  }
});

// landmark button
markBtn.addEventListener("click", function () {
  const marks = document.querySelectorAll(".location-marks");
  [...marks].map((mark) => {
    if (mark.classList.contains("active")) {
      mark.classList.remove("active");
      mark.setAttribute("style", "display:none");
    } else {
      mark.classList.add("active");
      mark.setAttribute("style", "display:block");
    }
  });
});

// roads button
roadBtn.addEventListener("click", function () {
  const roads = document.querySelector("#main-road");

  if (roads.classList.contains("d-none")) {
    roads.classList.remove("d-none");
    // roads.setAttribute("style", "display:none");
  } else {
    roads.classList.add("d-none");
    // roads.setAttribute("style", "display:block");
  }
});

// mosque button
mosBtn.addEventListener("click", function () {
  const mosque = document.querySelector("#mosque");

  if (mosque.classList.contains("d-none")) {
    mosque.classList.remove("d-none");
    // mosque.setAttribute("style", "display:none");
  } else {
    mosque.classList.add("d-none");
    // mosque.setAttribute("style", "display:block");
  }
});

matroh.addEventListener("click", function () {
  const path = document.querySelector("#matroh-path");
  const dets = document.querySelector("#matroh-dets");

  if (path.classList.contains("d-none")) {
    path.classList.remove("d-none");
    dets.classList.remove("d-none");
    // path.setAttribute("style", "display:none");
  } else {
    path.classList.add("d-none");
    dets.classList.add("d-none");
    // mosque.setAttribute("style", "display:block");
  }
});

airport.addEventListener("click", function () {
  const path = document.querySelector("#airport-path");
  const dets = document.querySelector("#airport-dets");

  if (path.classList.contains("d-none")) {
    path.classList.remove("d-none");
    dets.classList.remove("d-none");
    // path.setAttribute("style", "display:none");
  } else {
    path.classList.add("d-none");
    dets.classList.add("d-none");
    // mosque.setAttribute("style", "display:block");
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
    // console.log(row.c[1].v)});
    console.log(rows);

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

// moving images
btnOne.addEventListener("click", function () {
  btnOne.setAttribute("disabled", "true");
  btnTwo.setAttribute("disabled", "true");
  vidOne.style.zIndex = "4";
  vidOne.play();

  vidOne.onended = () => {
    console.log("first");
    vidOne.style.zIndex = "2";
    document.querySelector(".wrapper-2").style.zIndex = "4";
    btnOne.removeAttribute("disabled");
    btnTwo.removeAttribute("disabled");
  };
});

btnTwo.addEventListener("click", function () {
  btnOne.setAttribute("disabled", "true");
  btnTwo.setAttribute("disabled", "true");
  vidOne.style.zIndex = "4";
  intervalRewind = setInterval(function () {
    vidOne.playbackRate = 1.0;
    if (vidOne.currentTime == 0) {
      clearInterval(intervalRewind);
      vidOne.pause();
    } else {
      vidOne.currentTime += -0.1;
      if (vidOne.currentTime === 0) {
        console.log("first");
        vidOne.style.zIndex = "2";
        document.querySelector(".wrapper-2").style.zIndex = "2";
        document.querySelector(".wrapper-1").style.zIndex = "4";
        btnOne.removeAttribute("disabled");
        btnTwo.removeAttribute("disabled");
      }
    }
  }, 30);
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
