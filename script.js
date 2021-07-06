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
// Get element
let isUser;
let userName;
const logout = document.getElementById("logout");
const settings = document.getElementById("settings");
const tab = document.getElementById("tab");
const loggedOutDiv = document.getElementById("loggedOut-div");
const loggedInDiv = document.getElementById("loggedin-div");

const libraryImage = document.querySelector(".sidebar #one img");
const library = document.querySelector(".sidebar #one");
const discussionImage = document.querySelector(".sidebar #two img");
const discussion = document.querySelector(".sidebar #two");
const settingsImage = document.querySelector(".sidebar #settings img");

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

firebase.auth().onAuthStateChanged((firebaseUser) => {
  isUser = false;

  if (firebaseUser) {
    isUser = true;
    hover("add");
  } else {
    isUser = false;
    loggedInDiv.style.display = "none";
    loggedOutDiv.style.display = "block";
    hover("remove");
  }
});

function hover(method) {
  if (method == "add") {
    logout.addEventListener("click", () => {
      firebase.auth().signOut();
      logout.style.display = "none";
    });

    settings.addEventListener("mouseenter", () => {
      tab.style.display = "block";
    });
    tab.addEventListener("mouseenter", () => {
      tab.style.display = "block";
    });
    tab.addEventListener("mouseleave", () => {
      tab.style.display = "none";
    });
    settings.addEventListener("mouseleave", () => {
      tab.style.display = "none";
    });
  } else if (method == "remove") {
    settings.removeEventListener("mouseenter");
    tab.removeEventListener("mouseenter");
  }
}
