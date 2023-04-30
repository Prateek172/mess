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
  
  // Handle login button click
  const loginButton = document.getElementById("loginButton");
  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // Sign in an existing user with email and password
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User login successful
        const user = userCredential.user;
        console.log("User logged in:", user);
        // Redirect the user to the shop page
        window.location.href = "shop.html";
        alert("User logged in:", user);
      })
      .catch((error) => {
        // Handle login error
        alert("Error logging in user:", error);
        // TODO: Add code to display error messages to the user
      });
  });
  