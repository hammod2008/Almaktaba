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

const btnLogin = document.getElementById("btnlogin");
const byPhoneButton = document.getElementById("byPhoneButton");
const byEmailButton = document.getElementById("byEmailButton");
const btnSignUp = document.getElementById("btnsignup");
const btnLogout = document.getElementById("btnlogout");

const errorMail = document.getElementById("errorMail");
const errorPass = document.getElementById("errorPass");

const phoneCo = document.getElementById("firebaseui-auth-container");
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

/**/

// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: "index.html",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: "<your-tos-url>",
  // Privacy policy url/callback.
  privacyPolicyUrl: function () {
    window.location.assign("<your-privacy-policy-url>");
  },
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);

byPhoneButton.addEventListener("click", () => {
  phoneCo.style.display = "block";
  byEmailButton.style.display = "block";
  txtEmail.style.display = "none";
  txtPassword.style.display = "none";
  btnLogin.style.display = "none";
  byPhoneButton.style.display = "none";
});
byEmailButton.addEventListener("click", () => {
  phoneCo.style.display = "none";
  byEmailButton.style.display = "none";
  txtEmail.style.display = "block";
  txtPassword.style.display = "block";
  btnLogin.style.display = "block";
  byPhoneButton.style.display = "block";
});
