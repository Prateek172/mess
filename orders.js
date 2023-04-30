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



  const auth = firebase.auth();

  const db = firebase.firestore();
  // Listen for the authentication state to change
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const userId = user.uid;
      const ordersRef = firebase.firestore().collection("orders");
  
      // Get the orders for the current user
      ordersRef.where("userId", "==", userId).get().then((querySnapshot) => {
        const ordersContainer = document.getElementById("orders-container");
        ordersContainer.innerHTML = ""; // clear the container
  
        querySnapshot.forEach((doc) => {
          // Display each order in a product card
          const order = doc.data();
          const card = document.createElement("div");
          card.classList.add("card", "mb-3");
          card.innerHTML = `
            <div class="row g-0">
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Order Placed: ${order.timestamp.toDate().toLocaleString()}</h5>
                  <p class="card-text">${order.items.map(item => `${item.name}`).join("<br>")}</p>
                  <p class="card-text"><strong>Total: ₹${order.total}</strong></p>
                </div>
              </div>
            </div>
          `;
          ordersContainer.appendChild(card);
        });
      }).catch((error) => {
        console.error("Error fetching orders:", error);
      });
    } else {
      // User is not logged in
      console.log("User is not logged in");
    }
  });
  const cartButton = document.getElementById("cartButton");
  cartButton.addEventListener("click", () => {
    // Redirect to cart page
    window.location.href = "cart.html";
  });

  
  const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", (event) => {
  event.preventDefault();
  auth.signOut()
    .then(() => {
      // User has been signed out
      console.log("User logged out");
      // Redirect the user to the home page
      window.location.href = "login.html";
    })
    .catch((error) => {
      // Handle logout error
      console.error("Error logging out user:", error);
    });
});