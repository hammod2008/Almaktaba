var firebaseConfig = {
  apiKey: "AIzaSyBSh0kpWLJjkjcfhXqHcXh381iHMOUZ33c",
  authDomain: "rohain-dev.firebaseapp.com",
  projectId: "rohain-dev",
  storageBucket: "rohain-dev.appspot.com",
  messagingSenderId: "1003300175188",
  appId: "1:1003300175188:web:1fd67c332ffc850bcc1cc1",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// server domain
const backend = "http://localhost:9000/";

// Get element
let isUser;
let userName;
let user;
let id;

const logout = document.getElementById("logout");
const loggedInDiv = document.getElementById("loggedin-div");
const loginLink = document.getElementById("loginLink");

const libraryImage = document.querySelector(".sidebar #one img");
const library = document.querySelector(".sidebar #one");
const discussionImage = document.querySelector(".sidebar #two img");
const discussion = document.querySelector(".sidebar #two");
const settingsImage = document.querySelector(".sidebar #settings img");
const settings = document.getElementById("settings");
const sidebar = document.querySelector(".sidebar");
const content = document.querySelector(".content");
const modalContainer = document.querySelector(".modalContainer");
const imgModal = document.querySelector(".imgModal");
const changeImageButton = document.querySelector("#changeImageButton");
const closebtn = document.querySelector("#closebtn");
const closeimgbtn = document.querySelector("#closeimgbtn");
const close_btn = document.querySelector(".close-btn");
const alertTab = document.querySelector(".alert");
const succesTab = document.querySelector(".succes");
const saveimgbtn = document.querySelector("#saveimgbtn");
const savebtn = document.querySelector("#savebtn");

settings.addEventListener("click", () => {
  modalContainer.classList.add("show");
});
savebtn.addEventListener("click", () => {
  modalContainer.classList.remove("show");
  SubmitSet();
});
changeImageButton.addEventListener("click", () => {
  imgModal.classList.add("show");
});
closebtn.addEventListener("click", () => {
  modalContainer.classList.remove("show");
});
closeimgbtn.addEventListener("click", () => {
  imgModal.classList.remove("show");
});

library.addEventListener("mouseenter", () => {
  libraryImage.src = "./icons/librraryActive.svg";
});
library.addEventListener("mouseleave", () => {
  libraryImage.src = "./icons/librrary.svg";
});

discussion.addEventListener("mouseenter", () => {
  discussionImage.src = "./icons/discusstionActive.svg";
});
discussion.addEventListener("mouseleave", () => {
  discussionImage.src = "./icons/discusstion.svg";
});
settings.addEventListener("mouseenter", () => {
  settingsImage.src = "./icons/settingsActive.svg";
});
settings.addEventListener("mouseleave", () => {
  settingsImage.src = "./icons/settings.svg";
});

firebase.auth().onAuthStateChanged((firebaseUser) => {
  isUser = false;
  user = null;
  if (firebaseUser) {
    isUser = true;
    loggedInDiv.style.display = "block";
    user = firebaseUser.uid;
    console.log(user);
    FetchName(user);
    FetchId(user);
  } else {
    isUser = false;
    loggedInDiv.style.display = "none";
    loginLink.click();
  }
});

function logoutfunc() {
  if (isUser) {
    firebase.auth().signOut();
    logout.style.display = "none";
    console.log("sign out");
  } else {
    console.error("no user");
  }
}

function ShowAlertFunc(text, type) {
  succesTab.classList.remove("hide");
  alertTab.classList.remove("hide");

  alertTab.innerText = "حدث خطأ ما";
  succesTab.innerText = "تم بنجاح";
  console.log("func ecute");
  if (text !== "normal") {
    console.log("log");
    alertTab.innerText = text;
    succesTab.innerText = text;
  }

  if (type == "alert") {
    alertTab.classList.add("show");
    window.setTimeout(() => {
      console.log("time's up");
      alertTab.classList.add("hide");
    }, 3500);
  } else if (type == "succes") {
    succesTab.classList.add("show");
    window.setTimeout(() => {
      console.log("time's up");
      succesTab.classList.add("hide");
    }, 3500);
  }
}

const settingsNameInput = document.querySelector("#txtinputCo input");
function setNameInputValue(value) {
  settingsNameInput.value = value;
}

function SubmitSet() {
  let inputVal = settingsNameInput.value;
  console.log(inputVal);
  ShowAlertFunc("normal", "succes");
  /* fetch("http://localhost:9000/api/users", {
    method: "POST",
    body: {},
  })
    .then((response) => {
      if (!response.ok) {
        console.log("error");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));*/
}

const FetchName = (uid) => {
  fetch("http://localhost:9000/api/users")
    .then((response) => {
      if (!response.ok) {
        console.log("404 server error");
      }
      return response.json();
    })
    .then((data) => {
      for (i = 0; i < data.length; i++) {
        if (data[i].uid == uid) {
          loggedInDiv.innerHTML =
            loggedInDiv.innerHTML + `مرحبا ${data[i].UserName}`;
          setNameInputValue(data[i].UserName);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Find id Func
let UserId;
function FetchId(user) {
  fetch("http://localhost:9000/api/users")
    .then((response) => {
      if (!response.ok) {
        console.log("404 server error");
      }
      return response.json();
    })
    .then((data) => {
      for (i = 0; i < data.length; i++) {
        if (data[i].uid == user) {
          UserId = data[i]._id;
        }
      }
    });
}

/*image picker*/
const wrapper = document.querySelector(".wrapper");
const wrapperImg = document.querySelector(".wrapper .image");

const fileName = document.querySelector(".file-name");
const defaultBtn = document.querySelector("#default-btn");
const customBtn = document.querySelector("#custom-btn");
const image = document.querySelector(".image img");
const uploudIcon = document.querySelector(".uploudIcon");
const uploudText = document.querySelector(".uploudText");
let regExp = /[0-9a-zA-A\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;

function defaultBtnActive() {
  defaultBtn.click();
}

defaultBtn.addEventListener("change", function () {
  let file = null;
  file = this.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function () {
      const result = reader.result;
      image.src = result;
      image.style.display = "block";
      uploudIcon.style.display = "none";
      uploudText.style.display = "none";
      wrapper.classList.add("active");
      imgModal.style.cssText = "  max-height: 90%;   max-width: 500px;";
      wrapper.style.cssText =
        "  max-height: 100%;   max-width: 100%;   margin-bottom: 0px;   height: 420px; ";
      wrapperImg.style.height = "450px";
      customBtn.innerText = "تغيير الصورة";
      customBtn.style.background = "none";
      customBtn.style.color = "#56c0f5";
      customBtn.style.border = "4px solid #56c0f5";
      console.log("clicked");
      SendProfile(file);
      closeimgbtn.click();
    };
    reader.readAsDataURL(file);
  }
  if (this.value) {
    let valueStore = this.value.match(regExp);
    console.log(valueStore[0]);
    console.log(fileName);
    fileName.innerText = valueStore;
  }
});

function SendProfile(image) {
  console.log(image);
  let array;
  id = null;
  const Formdata = new FormData();
  Formdata.append("profileImage", image);

  fetch(`http://localhost:9000/api/profile/${id}`, {
    method: "POST",
    body: Formdata,
  })
    .then((response) => {
      if (!response.ok) {
        console.log("404 server error");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}
