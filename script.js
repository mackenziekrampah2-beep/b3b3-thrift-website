const products = [

{
id:1,
name:"Vintage Shirt",
price:120,
image:"images/product1.jpg"
},

{
id:2,
name:"Ladies Dress",
price:180,
image:"images/product2.jpg"
},

{
id:3,
name:"Denim Jacket",
price:220,
image:"images/product3.jpg"
},

{
id:4,
name:"Cargo Trouser",
price:150,
image:"images/product4.jpg"
}

];

const container =
document.getElementById("featured-products");

if(container){

products.forEach(product=>{

container.innerHTML += `

<div class="product-card">

<img src="${product.image}">

<div class="product-info">

<h3>${product.name}</h3>

<p>GH₵${product.price}</p>

<button
class="add-btn"
onclick="addToCart(${product.id})">
Add To Cart
</button>

</div>

</div>

`;

});

}

function addToCart(id){

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

const product =
products.find(p=>p.id===id);

cart.push(product);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

updateCartCount();

alert("Added to cart");

}

function updateCartCount(){

const cart =
JSON.parse(localStorage.getItem("cart")) || [];

const count =
document.getElementById("cart-count");

if(count){
count.textContent = cart.length;
}

}

updateCartCount();
function sendWhatsApp(order){

let text = `NEW ORDER%0A%0A`;

text += `Order ID: ${order.orderId}%0A`;
text += `Name: ${order.customer.name}%0A`;
text += `Phone: ${order.customer.phone}%0A%0A`;

order.items.forEach(item=>{
text += `${item.name} x${item.qty || 1} - GH₵${item.price}%0A`;
});

text += `%0ATotal: GH₵${order.total}`;

window.open(
`https://wa.me/233594461421?text=${text}`,
"_blank"
);
}
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbJiGfWoTlGNlGMoHxnYQaAoz613uOnPQ",
  authDomain: "b3b3-s-thrift.firebaseapp.com",
  projectId: "b3b3-s-thrift",
  storageBucket: "b3b3-s-thrift.firebasestorage.app",
  messagingSenderId: "724813980343",
  appId: "1:724813980343:web:da3e5bd83ab5eb371ae332",
  measurementId: "G-HPYHETPRLW"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent page reload
  
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  errorMsg.textContent = '';
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Logged in:', userCredential.user.email);
    
    // Success - go to dashboard
    window.location.href = 'dashboard.html';
    
  } catch (error) {
    console.error(error);
    errorMsg.textContent = error.message.replace('Firebase: ', '');
  }
});