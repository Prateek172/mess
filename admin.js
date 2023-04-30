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


// Get the logout button element from the HTML
// Wait for the Firebase SDK to initialize before checking the auth state
const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", (event) => {
  event.preventDefault();
  auth.signOut()
    .then(() => {
      // User has been signed out
      alert("User logged out");
      // Redirect the user to the home page
      window.location.href = "admin-login.html";
    })
    .catch((error) => {
      // Handle logout error
      console.error("Error logging out user:", error);
    });
});


auth.onAuthStateChanged((user) => {
    const loginButton = document.getElementById("loginButton");
    const greeting = document.getElementById("greeting");
    if (user) {
      // User is logged in
      const email = user.email;
      greeting.textContent = "Hello, " + email;
      // Show the logout button
      logoutButton.style.display = "block";
      // Hide the login button
      loginButton.style.display = "none";
    } else {
      // User is not logged in
      alert("pleas login");
      window.location.href = "admin-login.html";


    }
  });

  const ordersContainer = document.getElementById("orders-container");

// Query the orders collection and listen for changes
db.collection("orders").onSnapshot((snapshot) => {
  // Clear the container
  ordersContainer.innerHTML = "";

  // Initialize variables to calculate the total price
  let totalPrice = 0;
  let numOrders = 0;

  // Loop through each order document in the snapshot
  snapshot.forEach((doc) => {
    // Get the order data
    const order = doc.data();

    // Create a product card to display the order
    const card = document.createElement("div");
    card.classList.add("card", "mb-3");
    card.innerHTML = `
      <div class="row g-0">
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${order.items.map(item => `${item.name}}`).join("<br>")}</h5>
            <p class="card-text"><strong>₹${order.items.map(item => `${item.price}`).join("<br>")}</strong></p>
            <p class="card-text">${order.firstName} ${order.lastName}</p>
            <p class="card-text">${order.delivery}, ${order.zip}</p>
          </div>
        </div>
      </div>
    `;
    ordersContainer.appendChild(card);

    // Increment the total price and number of orders
    totalPrice += Number(order.total);
    numOrders++;
  });

  // Display the total price of all orders
  const totalCard = document.createElement("div");
  totalCard.classList.add("card", "mt-3");
  totalCard.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">Total (${numOrders} orders)</h5>
      <p class="card-text"><strong>₹${totalPrice.toFixed(2)}</strong></p>
    </div>
  `;
  ordersContainer.appendChild(totalCard);
});