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
const txtEmail = document.getElementById("txtemail");
const txtPassword = document.getElementById("txtpassword");
const txtPhone = document.getElementById("txtphone");
const codeDiv = document.querySelector("#code-div");

const byPhoneButton = document.getElementById("byPhoneButton");
const byEmailButton = document.getElementById("byEmailButton");
const btnLogin = document.getElementById("btnlogin");
const btnSend = document.querySelector("#btnSend");
const btnSignUp = document.getElementById("btnsignup");
const btnLogout = document.getElementById("btnlogout");

const errorMail = document.getElementById("errorMail");
const errorPass = document.getElementById("errorPass");

const phoneCo = document.getElementById("recaptcha-container");
const phonetitle = document.getElementById("phonetitle");
const phoneDiv = document.querySelector(".phone-div");
const mailTitle = document.getElementById("mailTitle");

const resetbtn = document.getElementById("resetbtn");
const link = document.querySelector("#signupLink");
const recaptchaContainer = document.querySelector("#recaptcha-container");
let error;

// show message to the form
function showMessage(error) {
  errorMail.style.display = "none";
  errorPass.style.display = "none";

  if (txtEmail.value == "") {
    errorMail.style.display = "inline";
    errorMail.innerText = "يرجى إدخال البريد الإلكتروني";
  } else if (txtPassword.value == "") {
    errorPass.style.display = "block";
    errorPass.innerText = "يرجى إدخال كلمة المرور";
  } else if (error == "auth/user-not-found" || error == "auth/invalid-email") {
    errorMail.style.display = "inline";
  } else if (error == "auth/wrong-password") {
    errorPass.style.display = "block";
  }
}

//Add login event
btnLogin.addEventListener("click", (e) => {
  // Get email and pass
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  //sign in
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch((err) => showMessage(err.code));
  //console.log(error);
});

// Add realtime listener
firebase.auth().onAuthStateChanged((firebaseUser) => {
  isUser = false;
  if (firebaseUser) {
    isUser = true;
    console.log(firebaseUser, isUser);
    MessageDiv.style.display = "block";
    LogInContainer.style.display = "none";
  } else {
    isUser = false;
    console.log("not logged in", isUser);
  }
});


byPhoneButton.addEventListener("click", () => {
  phoneCo.style.display = "block";
  phoneDiv.style.display = "block";
  byEmailButton.style.display = "block";
  phonetitle.style.display = "block";
  txtPhone.style.display = "inline";
  txtEmail.style.display = "none";
  txtPassword.style.display = "none";
  btnLogin.style.display = "none";
  btnSend.style.display = "block";
  byPhoneButton.style.display = "none";
  mailTitle.style.display = "none";
  resetbtn.style.display = "none";
  link.style.display = "none";
  recaptchaContainer.style.display = "block";
});
byEmailButton.addEventListener("click", () => {
  phoneCo.style.display = "none";
  phoneDiv.style.display = "none";
  byEmailButton.style.display = "none";
  phonetitle.style.display = "none";
  txtEmail.style.display = "inline";
  txtPassword.style.display = "inline";
  btnLogin.style.display = "block";
  byPhoneButton.style.display = "block";
  mailTitle.style.display = "block";
  txtPhone.style.display = "none";
  codeDiv.style.display = "none";
});

resetbtn.addEventListener("click", () => {
  txtPassword.style.display = "none";
  if (txtEmail.value == "") {
    errorMail.style.display = "inline";
    errorMail.innerText = "يرجى إدخال البريد الإلكتروني";
    return;
  }
  txtEmail.style.display = "none";
  btnLogin.style.display = "none";
  resetbtn.style.display = "none";
  byPhoneButton.style.display = "none";
  link.style.display = "none";
});

window.onload = function () {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container"
  );
  recaptchaVerifier.render();
};

function phoneAuth() {
  codeDiv.style.display = "block";
  phoneDiv.style.display = "none";
  link.style.display = "none";
  byEmailButton.style.display = "none";
  //get num
  const number = txtPhone.value;
  const appVerifier = window.recaptchaVerifier;

  firebase
    .auth()
    .signInWithPhoneNumber(number, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;

      coderesult = confirmationResult;

      console.log(coderesult);
      alert("message sent");
    })
    .catch((error) => {
      alert(error.message);
    });
}

function codeVerify() {
  const code = document.getElementById("txtcode").value;
  coderesult
    .confirm(code)
    .then((result) => {
      alert("success");
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      alert(error.message);
    });
}
