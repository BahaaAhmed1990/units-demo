const btn = document.querySelector("button[type='submit']");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const unitCode = document.querySelector("#unitCode");
const success = document.querySelector(".alert-success");
const warn = document.querySelector(".alert-warning");

success.style.display = "none";
warn.style.display = "none";

btn.addEventListener("click", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  let name1 = firstName.value;
  let name2 = lastName.value;
  let email1 = email.value;
  let phone1 = phone.value;
  let unitCode1 = unitCode.value;

  //   console.log(name1, name2, email1, phone1, unitCode1);

  let msgBody = {};

  name1 ? (msgBody.firstName = name1) : (msgBody.firstName = "No name");
  name2 ? (msgBody.lastName = name2) : (msgBody.lastName = "No name");

  if (!email1 || !phone1 || !unitCode1) {
    warn.style.display = "block";
    setTimeout(() => {
      warn.style.display = "none";
    }, 3000);
    console.log("wrong input");
    return;
  } else {
    msgBody.email = email1;
    msgBody.phone = phone1;
    msgBody.unitCode = unitCode1;
  }

  //   console.log(msgBody);
  axios({
    method: "post",
    url: "/api/mail",
    data: msgBody,
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (res) {
    if (res.status === 201) {
      success.style.display = "block";
      setTimeout(() => {
        success.style.display = "none";
      }, 3000);
    } else {
      warn.style.display = "block";
      setTimeout(() => {
        warn.style.display = "none";
      }, 3000);
    }
  });
}
