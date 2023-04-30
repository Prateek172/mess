// Initialize Firebase
const firebaseConfig = {
    // Your Firebase configuration
    // ...
    apiKey: "AIzaSyCSxQCKa7LEVme50SNKc-CHaeUdmleRRkc",
    authDomain: "mess-5f275.firebaseapp.com",
    projectId: "mess-5f275",
    storageBucket: "mess-5f275.appspot.com",
    messagingSenderId: "639477113389",
    appId: "1:639477113389:web:f0751093d01534a61f0ea4",
    measurementId: "G-V7Q6M0JV2F"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Get a reference to the Firebase Authentication service
  const auth = firebase.auth();

const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const registerBtn = document.getElementById("register-btn");

registerBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User registered successfully
      const user = userCredential.user;
      alert(`User ${user.email} registered successfully.`);
      window.location.href = "login.html";
    })
    .catch((error) => {
      // Handle errors during registration
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Registration failed: ${errorCode} - ${errorMessage}`);
      window.location.href = "regester.html";
    });
});
