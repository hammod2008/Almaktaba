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
const backend = "https://localhost:9000/";

// Get element
let isUser;
let userName;
const logout = document.getElementById("logout");
const tab = document.getElementById("tab");
const loggedOutDiv = document.getElementById("loggedOut-div");
const loggedInDiv = document.getElementById("loggedin-div");

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
const alert = document.querySelector(".alert");
const saveimgbtn = document.querySelector("#saveimgbtn");

settings.addEventListener("click", () => {
  modalContainer.classList.add("show");
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

  if (firebaseUser) {
    isUser = true;
    loggedInDiv.style.display = "block";
  } else {
    isUser = false;
    loggedInDiv.style.display = "none";
    loggedOutDiv.style.display = "block";
    sidebar.style.display = "none";
    content.style.border = "none";
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
/*
close_btn.addEventListener("click", () => {
  alert.classList.add("hide");
});
*/
/*image picker*/
const wrapper = document.querySelector(".wrapper");

const fileName = document.querySelector(".file-name");
const defaultBtn = document.querySelector("#default-btn");
const customBtn = document.querySelector("#custom-btn");
const image = document.querySelector(".image img");
const uploudIcon = document.querySelector(".uploudIcon");
const uploudText = document.querySelector(".uploudText");

function defaultBtnActive() {
  defaultBtn.click();
}

defaultBtn.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function () {
      const result = reader.result;
      image.style.display = "block";
      image.src = result;
      uploudIcon.style.display = "none";
      uploudText.style.display = "none";
      wrapper.classList.add("active");
      imgModal.style.cssText = "  max-height: 90%;   max-width: 90%;";
      wrapper.style.cssText = "  max-height: 100%;   max-width: 100%;";
      customBtn.innerText = "تغيير الصورة";
      customBtn.style.background = "none";
      customBtn.style.color = "#56c0f5";
      customBtn.style.border = "4px solid #56c0f5";
      saveimgbtn.addEventListener("click", () => {
        SendProfile(result);
      });
    };
    reader.readAsDataURL(file);
  }
});

const imageCo = document.querySelector(".image");
const img = document.querySelector(".image img");

function SendProfile(image) {
  const data = new FormData();

  data.append("profileImage", image);

  fetch(backend + "uploadProfile", {
    method: "POST",
    body: data,
  })
    .then((result) => {
      console.log("file Sent Successful");
    })
    .catch((err) => {
      console.log(err.message);
    });
}
