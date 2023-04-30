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
        // User is logged in
        const userId = user.uid;
    
        // Get the user's cart items from Firestore
        const cartItemsRef = firebase.firestore().collection("users").doc(userId).collection("cart");
        cartItemsRef.get().then((querySnapshot) => {
          const cartItemsContainer = document.getElementById("cart-items-container");
          cartItemsContainer.innerHTML = ""; // clear the container
          let total = 0;
          querySnapshot.forEach((doc) => {
            // Display each cart item in a product card
            const cartItem = doc.data();
            const card = document.createElement("div");
            card.classList.add("card", "mb-3");
            card.innerHTML = `
              <div class="row g-0">
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${cartItem.name}</h5>
                    <p class="card-text"><strong>₹${cartItem.price}</strong></p>
                    <button class="btn btn-danger delete-btn" data-id="${doc.id}">Delete</button>
                  </div>
                </div>
              </div>
            `;
            cartItemsContainer.appendChild(card);
            total += Number(cartItem.price);
    
            // Add a click event listener to the delete button
            const deleteBtn = card.querySelector(".delete-btn");
            deleteBtn.addEventListener("click", (event) => {
              const itemId = event.target.dataset.id;
              cartItemsRef.doc(itemId).delete().then(() => {
                alert("Cart item deleted");
                location.reload();
              }).catch((error) => {
                console.error("Error deleting cart item:", error);
              });
            });
          });
    
          // Display the total price of all items in the cart
          const totalCard = document.createElement("div");
          totalCard.classList.add("card", "mt-3");
          totalCard.innerHTML = `
            <div class="card-body">
              <h5 class="card-title">Total</h5>
              <p class="card-text"><strong>₹${total}</strong></p>
              <button class="btn btn-primary checkout-btn">Checkout</button>
            </div>
          `;
          cartItemsContainer.appendChild(totalCard);
    
          // Add a click event listener to the checkowindow.location.href = "delivery.html";ut button
          const checkoutBtn = totalCard.querySelector(".checkout-btn");
          checkoutBtn.addEventListener("click", (event) => {
            console.log("Checkout clicked");
            window.location.href = "delivery.html";
          });
        }).catch((error) => {
          console.error("Error fetching cart items:", error);
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
    