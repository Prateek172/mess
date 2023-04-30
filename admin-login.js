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
  
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const allowedUserEmail = "padmin@test.com"; // replace with the email of the allowed user
      const allowedUserId = "kXC0oPd3EOXbOdHCpyQ33EP6pVn1"; // replace with the user ID of the allowed user
  
      if (user.email === allowedUserEmail || user.uid === allowedUserId) {
        // User is allowed to login
        // Proceed with your code for authenticated users
        window.location.href = "admin-dashbord.html";
        alert("admin login success");

      } else {
        // User is not allowed to login
        firebase.auth().signOut(); // sign out the user
        alert("You are not allowed to access this site.");
        window.location.href = "admin-login.html";
      }
    } else {
      // User is not logged in
      // Proceed with your code for anonymous users
    }
  });
  
  
  
  
  
  
  
  
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
        window.location.href = "admin-dashbord.html";
        alert("User logged in:", user);
      })
      .catch((error) => {
        // Handle login error
        console.error("Error logging in user:", error);
        // TODO: Add code to display error messages to the user
      });
  });
  