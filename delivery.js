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

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const userId = user.uid;
  
      // Get the user's cart items from Firestore
      const cartItemsRef = firebase.firestore().collection("users").doc(userId).collection("cart");
  
      // Get references to the form inputs
      const firstNameInput = document.getElementById("firstName");
      const lastNameInput = document.getElementById("lastName");
      const cityInput = document.getElementById("city");
      const zipInput = document.getElementById("zip");
      const deliveryInput = document.getElementById("delivery");
  
      // Add a submit event listener to the delivery form
      const deliveryForm = document.getElementById("delivery-form");
      deliveryForm.addEventListener("submit", (event) => {
        event.preventDefault();
  
        // Get the values from the form inputs
        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;
        const city = cityInput.value;
        const zip = zipInput.value;
        const delivery = deliveryInput.value;
  
        // Create a new order object with the cart items and address information
        const order = {
          userId: userId,
          items: [],
          total: 0,
          firstName: firstName,
          lastName: lastName,
          city: city,
          zip: zip,
          delivery: delivery,
          timestamp: firebase.firestore.Timestamp.now()
        };
  
        // Get the cart items and add them to the order object
        cartItemsRef.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            order.items.push(doc.data());
            order.total += Number(doc.data().price);
          });
  
          // Add the order to the "orders" collection in Firestore
          const ordersRef = firebase.firestore().collection("orders");
          ordersRef.add(order).then((docRef) => {
            console.log("Order added to Firestore with ID:", docRef.id);
            alert("order placed");
  
            // Delete the cart items from the user's cart in Firestore
            querySnapshot.forEach((doc) => {
              doc.ref.delete().then(() => {
                console.log("Cart item deleted from cart");
              }).catch((error) => {
                console.error("Error deleting cart item from cart:", error);
              });
            });
  
            // Redirect the user to the delivery page
            window.location.href = "orders.html";
          }).catch((error) => {
            console.error("Error adding order to Firestore:", error);
          });
        }).catch((error) => {
          console.error("Error fetching cart items:", error);
        });
      });
    } else {
      console.log("User is not logged in");
    }
  });