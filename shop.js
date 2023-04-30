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

// Assuming there is an HTML element with an "id" attribute of "product-container"
const productContainer = document.getElementById("product-container");

// Fetch products from Firestore
db.collection("products")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // Get the product data from the document
      const product = doc.data();
      // Create a Bootstrap card for the product
      const card = `
 
      <div class="col-md-12 col-lg-4 mb-4 mb-lg-0">
      <div class="card text-black">
        <img src="${product.image}"
          class="card-img-top" alt="iPhone" />
        <div class="card-body">
          <div class="text-center mt-1">
            <h4 class="card-title">${product.name}</h4>
            <h6 class="text-primary mb-1 pb-3">₹${product.price}</h6>
          </div>

          <div class="text-center">
            <div class="p-3 mx-n3 mb-4" style="background-color: #eff1f2;">
              <h5 class="mb-0">${product.description}</h5>
            </div>
          <div class="d-flex flex-row">
            <button type="button" class="btn btn-danger add-to-cart" data-id="${doc.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
      `;
      // Add the card to the product container
      productContainer.innerHTML += card;
    });
    // Add event listeners to the "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Get the product ID, name, and price from the button's data attributes
        const productId = button.dataset.id;
        const productName = button.dataset.name;
        const productPrice = button.dataset.price;
        
        console.log("button clicked");
        console.log(productId);
        console.log(productName);
        console.log(productPrice);
        
        // Get the current user's ID
        const userId = firebase.auth().currentUser.uid;
        
        // Add the product to the user's cart in Firestore
        const cartItem = {
          id: productId,
          name: productName,
          price: productPrice,
        };
        firebase.firestore()
          .collection("users")
          .doc(userId)
          .collection("cart")
          .add(cartItem)
          .then(() => {
            alert("Product added to cart.");
          })
          .catch((error) => {
            console.error("Error adding product to cart:", error);
          });
      });
    });
  })
  .catch((error) => {
    console.error("Error fetching products: ", error);
  });


// Wait for the Firebase SDK to initialize before checking the auth state
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
      alert("login to continue")
      window.location.href = "login.html";
    }
  });

  const cartButton = document.getElementById("cartButton");
cartButton.addEventListener("click", () => {
  // Redirect to cart page
  window.location.href = "cart.html";
});
