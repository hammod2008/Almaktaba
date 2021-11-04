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
let displayName;
let uid;
const txtName = document.getElementById("txtname");
const txtEmail = document.getElementById("txtemail");
const txtPassword = document.getElementById("txtpassword");
const btnSignUp = document.getElementById("btnsignup");
const btnLogout = document.getElementById("btnlogout");
const navigationlink = document.getElementById("navigationlink");
const MessageDiv = document.getElementById("MessageDiv");
const SignUpContainer = document.getElementById("SignUpContainer");
const errorMail = document.getElementById("errorMail");
const errorPass = document.getElementById("errorPass");
const errorName = document.getElementById("errorName");

// show message to the form
function showMessage(error) {
  errorMail.style.display = "none";
  errorPass.style.display = "none";
  errorName.style.display = "none";
  if (txtName.value == "") {
    errorName.style.display = "inline";
  } else if (txtEmail.value == "") {
    errorMail.style.display = "inline";
    errorMail.innerText = "يرجى إدخال البريد الإلكتروني";
  } else if (error == "auth/email-already-in-use") {
    errorMail.style.display = "inline";
    errorMail.innerText = "البريد الإلكتروني موجود مسبقاً";
  } else if (error == "auth/invalid-email") {
    errorMail.style.display = "inline";
  } else if (txtPassword.value == "") {
    errorPass.style.display = "block";
    errorPass.innerText = "يرجى إدخال كلمة المرور";
  } else if (error == "auth/weak-password") {
    errorPass.style.display = "block";
    errorPass.innerText = "كلمة المرور ضعيفة، استخدم 6 خانات";
  }
}

// Add signup event
btnSignUp.addEventListener("click", (e) => {
  displayName = null;
  //sign in
  const auth = firebase.auth();
  const email = txtEmail.value;
  const pass = txtPassword.value;
  displayName = txtName.value;
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  storeUserObject(displayName, uid);
  promise.catch((err) => showMessage(err.code));
});

firebase.auth().onAuthStateChanged((firebaseUser) => {
  isUser = false;
  uid = null;
  if (firebaseUser) {
    isUser = true;
    MessageDiv.style.display = "block";
    SignUpContainer.style.display = "none";
    uid = firebaseUser.uid;
    console.log(uid);
  } else {
    isUser = false;
  }
});

function storeUserObject(uid, userName) {
  console.log(uid, userName);
  fetch("http://localhost:9000/api/users", {
    method: "POST",
    body: {
      uid: uid,
      UserName: userName,
    },
  })
    .then((result) => {
      if (result.ok) {
        console.log("signup Successful");
        return result.json();
      } else if (!result.ok) {
        console.log("400", result);
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
