const PRODUCTS = [
{id:1,name:"Classic Oxford Shirt",category:"Men",subcategory:"Shirts & T-Shirts",price:1499,old:1999,size:"M",color:"Blue",sizes:["M", "S", "L", "XL"]},
{id:2,name:"Urban Oversized Tee",category:"Men",subcategory:"Shirts & T-Shirts",price:899,old:null,size:"L",color:"Black",sizes:["L", "S", "M", "XL"]},
{id:3,name:"Slim Fit Chinos",category:"Men",subcategory:"Jeans & Trousers",price:1799,old:null,size:"32",color:"Beige",sizes:["32", "M", "L"]},
{id:4,name:"Street Bomber Jacket",category:"Men",subcategory:"Jackets",price:2499,old:null,size:"L",color:"Olive",sizes:["L", "S", "M", "XL"]},
{id:5,name:"Everyday Sneakers",category:"Men",subcategory:"Footwear",price:2199,old:2699,size:"9",color:"White",sizes:["9", "M", "L"]},
{id:6,name:"Linen Resort Shirt",category:"Men",subcategory:"Shirts & T-Shirts",price:1699,old:null,size:"M",color:"Cream",sizes:["M", "S", "L", "XL"]},
{id:7,name:"Satin Wrap Dress",category:"Women",subcategory:"Dresses & Gowns",price:2299,old:2799,size:"M",color:"Pink",sizes:["M", "S", "L", "XL"]},
{id:8,name:"Pleated Midi Dress",category:"Women",subcategory:"Dresses & Gowns",price:2599,old:null,size:"M",color:"Green",sizes:["M", "S", "L", "XL"]},
{id:9,name:"Ribbed Knit Top",category:"Women",subcategory:"Tops & Blouses",price:1299,old:1799,size:"S",color:"Lavender",sizes:["S", "M", "L", "XL"]},
{id:10,name:"Wide Leg Jeans",category:"Women",subcategory:"Jeans & Skirts",price:1999,old:null,size:"30",color:"Denim",sizes:["30", "M", "L"]},
{id:11,name:"Quilted Shoulder Bag",category:"Women",subcategory:"Accessories",price:1599,old:2099,size:"Free",color:"Blush",sizes:["Free", "M", "L"]},
{id:12,name:"Heeled Sandals",category:"Women",subcategory:"Footwear",price:1899,old:null,size:"7",color:"Tan",sizes:["7", "M", "L"]},
{id:13,name:"Rainbow Hoodie",category:"Kids",subcategory:"Boys Clothing",price:999,old:null,size:"8Y",color:"Blue",sizes:["8Y", "M", "L"]},
{id:14,name:"Floral Party Frock",category:"Kids",subcategory:"Girls Clothing",price:1199,old:1699,size:"6Y",color:"Pink",sizes:["6Y", "M", "L"]},
{id:15,name:"Mini Cargo Pants",category:"Kids",subcategory:"Infant Wear",price:799,old:null,size:"5Y",color:"Olive",sizes:["5Y", "M", "L"]},
{id:16,name:"Kids Canvas Sneakers",category:"Kids",subcategory:"Kids Footwear",price:1099,old:null,size:"3",color:"White",sizes:["3", "M", "L"]},
{id:17,name:"Star Hair Clips Set",category:"Kids",subcategory:"Kids Accessories",price:399,old:null,size:"Free",color:"Multicolor",sizes:["Free", "M", "L"]},
{id:18,name:"Cozy Teddy Sweatshirt",category:"Kids",subcategory:"Girls Clothing",price:899,old:null,size:"7Y",color:"Cream",sizes:["7Y", "M", "L"]}
];

const state = {
  cart: JSON.parse(localStorage.getItem("stylehub_cart") || "[]"),
  wishlist: JSON.parse(localStorage.getItem("stylehub_wishlist") || "[]"),
  users: JSON.parse(localStorage.getItem("stylehub_users") || "[]"),
  currentUser: JSON.parse(localStorage.getItem("stylehub_currentUser") || "null"),
  orders: JSON.parse(localStorage.getItem("stylehub_orders") || "[]"),
  coupon: localStorage.getItem("stylehub_coupon") || "",
  search: ""
};

function save(){
  localStorage.setItem("stylehub_cart", JSON.stringify(state.cart));
  localStorage.setItem("stylehub_wishlist", JSON.stringify(state.wishlist));
  localStorage.setItem("stylehub_users", JSON.stringify(state.users));
  localStorage.setItem("stylehub_currentUser", JSON.stringify(state.currentUser));
  localStorage.setItem("stylehub_orders", JSON.stringify(state.orders));
  localStorage.setItem("stylehub_coupon", state.coupon);
  updateHeader();
}
function money(n){return "₹"+Number(n).toLocaleString("en-IN")}
function product(id){return PRODUCTS.find(p=>p.id===Number(id))}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove("show"),2300)}
function cartCount(){return state.cart.reduce((s,x)=>s+x.qty,0)}
function updateHeader(){
  document.getElementById("cartCount").textContent=cartCount();
  document.getElementById("wishCount").textContent=state.wishlist.length;
  document.getElementById("authNav").innerHTML=state.currentUser
    ? `<a class="auth-link" href="#account">${state.currentUser.name.split(" ")[0]}</a><button class="auth-link logout-link" type="button" onclick="logout()">Logout</button>`
    : `<a class="auth-link" href="#login">Login</a>`;
}
function img(p){return `assets/product-${p.id}.jpg`}
function productCard(p){
  const wished=state.wishlist.includes(p.id);
  return `<article class="product-card">
    <button class="wish ${wished?"active":""}" onclick="toggleWish(${p.id})">${wished?"♥":"♡"}</button>
    <a href="#product/${p.id}"><img class="product-image" src="${img(p)}" alt="${p.name}" onerror="this.onerror=null;this.src='assets/product-${p.id}.svg'"></a>
    <div class="product-body">
      <div class="product-meta">${p.category} · ${p.subcategory}</div>
      <a href="#product/${p.id}" class="product-title">${p.name}</a>
      <div><span class="price">${money(p.price)}</span>${p.old?`<span class="old-price">${money(p.old)}</span>`:""}</div>
      <div class="card-actions"><button class="btn btn-primary btn-small" onclick="addToCart(${p.id})">Add to Cart</button><a class="btn btn-outline btn-small" href="#product/${p.id}">View</a></div>
    </div>
  </article>`
}
function renderHome(){
  const featured=PRODUCTS.slice(0,8);
  return `<section class="hero"><div class="container hero-inner"><div>
    <div class="eyebrow">New season · 2026 collection</div>
    <h1>Wear your <span>confidence.</span></h1>
    <p>Discover curated fashion, footwear and accessories for every mood. Clean silhouettes, expressive details and everyday luxury.</p>
    <div class="hero-buttons"><a class="btn btn-primary" href="#shop">Shop Collection →</a><a class="btn btn-outline" href="#about">Our Story</a></div>
  </div><div class="hero-art"><img src="assets/product-8.jpg" alt="Fashion model wearing a modern seasonal look"></div></div></section>
  <section class="section"><div class="container"><div class="section-head"><div><div class="eyebrow">Explore</div><h2>Shop by collection</h2><p>Find your next signature look.</p></div></div>
    <div class="category-grid">
      <a class="category-card cat-men" href="#shop?category=Men"><h3>Men's Collection</h3><p>Shirts · Denim · Footwear</p><span class="btn btn-outline btn-small">Explore</span></a>
      <a class="category-card cat-women" href="#shop?category=Women"><h3>Women's Collection</h3><p>Dresses · Tops · Accessories</p><span class="btn btn-outline btn-small">Explore</span></a>
      <a class="category-card cat-kids" href="#shop?category=Kids"><h3>Kids Collection</h3><p>Playful · Comfortable · Cool</p><span class="btn btn-outline btn-small">Explore</span></a>
    </div>
  </div></section>
  <section class="section" style="background:#fff8fa"><div class="container"><div class="section-head"><div><div class="eyebrow">Trending now</div><h2>Featured pieces</h2><p>Popular styles selected for you.</p></div><a class="link-arrow" href="#shop">View all →</a></div>
    <div class="product-grid">${featured.map(productCard).join("")}</div>
  </div></section>
  <section class="section"><div class="container"><div class="promo"><div><div class="eyebrow" style="color:#ff8eb7">StyleHub edit</div><h2>10% off your first order</h2><p>Use coupon <b>STYLE10</b> at checkout.</p></div><a href="#shop" class="btn btn-primary">Shop now</a></div></div></section>
  <section class="section"><div class="container"><div class="section-head"><div><div class="eyebrow">Why StyleHub</div><h2>Made for modern wardrobes</h2></div></div><div class="feature-grid">
    <div class="feature"><div class="feature-icon">✦</div><h3>Curated style</h3><p>Fashion-forward pieces organized by collection, size and color.</p></div>
    <div class="feature"><div class="feature-icon">↺</div><h3>Easy shopping</h3><p>Wishlist, cart, simulated checkout and order history in one place.</p></div>
    <div class="feature"><div class="feature-icon">♡</div><h3>Personal account</h3><p>Create an account and keep your preferences and orders in your browser.</p></div>
  </div></div></section>`;
}
function renderShop(params){
  const category=params.get("category")||"All";
  const q=state.search.toLowerCase();
  let list=PRODUCTS.filter(p=>(category==="All"||p.category===category)&&(!q||`${p.name} ${p.category} ${p.subcategory}`.toLowerCase().includes(q)));
  return `<section class="page"><div class="container"><div class="eyebrow">StyleHub store</div><h1 class="page-title">Shop ${category==="All"?"all styles":category}</h1><p class="page-subtitle">Browse fashion, footwear and accessories.</p>
  <div class="shop-layout"><aside class="filters"><div class="filter-group"><h4>Category</h4>${["All","Men","Women","Kids"].map(c=>`<label><input type="radio" name="cat" ${category===c?"checked":""} onchange="location.hash='shop?category=${c}'"> ${c}</label>`).join("")}</div>
  <div class="filter-group"><h4>Price</h4><label><input type="checkbox" onchange="filterPrice(this)"> Under ₹1,000</label><label><input type="checkbox" onchange="filterPrice(this)"> ₹1,000–₹2,000</label><label><input type="checkbox" onchange="filterPrice(this)"> ₹2,000+</label></div>
  <div class="filter-group"><h4>Size</h4><label><input type="checkbox"> S</label><label><input type="checkbox"> M</label><label><input type="checkbox"> L</label><label><input type="checkbox"> XL</label></div></aside>
  <div><div class="shop-top"><b>${list.length} products</b><select class="select" onchange="sortProducts(this.value)"><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="name">Name</option></select></div>
  <div class="product-grid">${list.length?list.map(productCard).join(""):`<div class="empty" style="grid-column:1/-1"><h3>No products found</h3><p>Try another search or category.</p></div>`}</div></div></div></div></section>`;
}
function renderProduct(id){
  const p=product(id); if(!p)return renderNotFound();
  const sizes=p.sizes||[p.size,"M","L","XL"].filter((x,i,a)=>a.indexOf(x)===i);
  return `<section class="page"><div class="container"><div class="detail">
    <img class="detail-image" src="${img(p)}" alt="${p.name}" onerror="this.onerror=null;this.src='assets/product-${p.id}.svg'">
    <div><div class="eyebrow">${p.category} · ${p.subcategory}</div><h1>${p.name}</h1><p class="detail-price">${money(p.price)} ${p.old?`<span class="old-price">${money(p.old)}</span>`:""}</p>
    <p class="muted">A premium StyleHub pick designed for comfort, versatility and a polished everyday look. Product details are simulated for this frontend internship project.</p>
    <div class="option-row"><h4>Size</h4><div class="chips" id="sizeChips">${sizes.map((s,i)=>`<button class="chip ${i===0?"selected":""}" onclick="selectChip(this)">${s}</button>`).join("")}</div></div>
    <div class="option-row"><h4>Color</h4><div class="chips">${[p.color,"Black","White"].filter((x,i,a)=>a.indexOf(x)===i).map((c,i)=>`<button class="chip ${i===0?"selected":""}" onclick="selectChip(this)">${c}</button>`).join("")}</div></div>
    <div class="option-row"><h4>Quantity</h4><div class="qty"><button onclick="detailQty(-1)">−</button><span id="detailQty">1</span><button onclick="detailQty(1)">+</button></div></div>
    <div class="detail-actions"><button class="btn btn-primary" onclick="addDetailToCart(${p.id})">Add to Cart</button><button class="btn btn-outline" onclick="toggleWish(${p.id})">♡ Wishlist</button></div>
    </div></div></section>`;
}
function renderCart(){
  const items=state.cart.map(x=>({...x,p:product(x.id)})).filter(x=>x.p);
  if(!items.length)return `<section class="page"><div class="container"><div class="empty"><div style="font-size:44px">🛍</div><h3>Your cart is empty</h3><p>Add a few pieces and they will appear here.</p><a class="btn btn-primary" href="#shop">Continue Shopping</a></div></div></section>`;
  const subtotal=items.reduce((s,x)=>s+x.p.price*x.qty,0), discount=state.coupon==="STYLE10"?Math.round(subtotal*.1):0, shipping=subtotal>=3000?0:149, total=subtotal-discount+shipping;
  return `<section class="page"><div class="container"><div class="eyebrow">Your bag</div><h1 class="page-title">Shopping Cart</h1><div class="cart-layout"><div class="cart-list">${items.map(x=>`<div class="cart-row"><img src="${img(x.p)}" alt="${x.p.name}" onerror="this.onerror=null;this.src='assets/product-${x.p.id}.svg'"><div><b>${x.p.name}</b><div class="muted" style="font-size:12px">${x.p.category} · ${x.p.color}</div><div class="cart-controls"><button onclick="changeQty(${x.id},-1)">−</button><span>${x.qty}</span><button onclick="changeQty(${x.id},1)">+</button><button class="btn btn-small" onclick="removeCart(${x.id})">Remove</button></div></div><strong>${money(x.p.price*x.qty)}</strong></div>`).join("")}</div>
  <aside class="summary"><h3>Order Summary</h3><div class="sum-line"><span>Subtotal</span><b>${money(subtotal)}</b></div><div class="sum-line"><span>Shipping</span><b>${shipping?money(shipping):"Free"}</b></div>${discount?`<div class="sum-line"><span>STYLE10</span><b>−${money(discount)}</b></div>`:""}<div class="coupon"><input id="couponInput" placeholder="Coupon code" value="${state.coupon}"><button class="btn btn-outline btn-small" onclick="applyCoupon()">Apply</button></div><div class="sum-line sum-total"><span>Total</span><b>${money(total)}</b></div><button class="btn btn-primary" style="width:100%;margin-top:15px" onclick="startCheckout()">Proceed to Checkout</button></aside></div></div></section>`;
}
function renderWishlist(){
  const list=state.wishlist.map(id=>product(id)).filter(Boolean);
  return `<section class="page"><div class="container"><div class="eyebrow">Saved for later</div><h1 class="page-title">Wishlist</h1><p class="page-subtitle">Your favorite pieces in one place.</p>${list.length?`<div class="product-grid">${list.map(productCard).join("")}</div>`:`<div class="empty"><div style="font-size:44px">♡</div><h3>No saved items</h3><p>Tap the heart on a product to save it.</p><a class="btn btn-primary" href="#shop">Explore Products</a></div>`}</div></section>`;
}
function renderAuth(mode="login"){
  const register=mode==="register";
  return `<section class="auth-wrap"><div class="auth-card"><div class="brand" style="margin-bottom:18px"><span class="brand-mark">✦</span>StyleHub</div><h1>${register?"Create your account":"Welcome back"}</h1><p class="muted">${register?"Join StyleHub to save your wishlist and orders.":"Login to continue shopping."}</p>
  <form onsubmit="submitAuth(event,'${register?"register":"login"}')">${register?`<div class="field"><label>FULL NAME</label><input id="authName" required placeholder="Your name"></div>`:""}<div class="field"><label>EMAIL</label><input id="authEmail" type="email" required placeholder="you@example.com"></div><div class="field"><label>PASSWORD</label><input id="authPassword" type="password" required minlength="4" placeholder="••••••••"></div>${register?`<div class="field"><label>CONFIRM PASSWORD</label><input id="authConfirm" type="password" required minlength="4"></div>`:""}<button class="btn btn-primary" style="width:100%;margin-top:8px">${register?"Create Account":"Login"}</button></form>
  <div class="switch-auth">${register?"Already have an account?":"New to StyleHub?"} <a href="#${register?"login":"register"}">${register?"Login":"Create a new account"}</a></div></div></section>`;
}
function renderAccount(){
  if(!state.currentUser)return renderAuth("login");
  const myOrders=state.orders.filter(o=>o.email===state.currentUser.email);
  return `<section class="page"><div class="container"><div class="eyebrow">My StyleHub</div><h1 class="page-title">Account</h1><div class="account-grid"><aside class="account-nav"><div class="account-nav-heading">Account menu</div><div class="account-nav-user">${state.currentUser.name}</div><a class="active" href="#account">Overview</a><a href="#orders">Order History</a><a href="#wishlist">Wishlist</a><a href="#cart">Cart</a><button class="btn btn-outline account-logout" type="button" onclick="logout()">↪ Sign out</button></aside><div class="account-content"><h2>Welcome, ${state.currentUser.name.split(" ")[0]}!</h2><div class="stat-grid"><div class="stat"><span class="muted">Orders</span><b>${myOrders.length}</b></div><div class="stat"><span class="muted">Wishlist</span><b>${state.wishlist.length}</b></div><div class="stat"><span class="muted">Cart items</span><b>${cartCount()}</b></div></div><h3 style="margin-top:30px">Profile</h3><div class="info-card"><p><b>Name:</b> ${state.currentUser.name}</p><p><b>Email:</b> ${state.currentUser.email}</p><p><b>Account type:</b> Frontend demo account</p><p class="muted">Your information is stored in localStorage for this internship project. No real payment or backend account system is connected.</p></div></div></div></div></section>`;
}
function renderOrders(){
  if(!state.currentUser)return renderAuth("login");
  const orders=state.orders.filter(o=>o.email===state.currentUser.email).reverse();
  return `<section class="page"><div class="container"><div class="eyebrow">My account</div><h1 class="page-title">Order History</h1>${orders.length?orders.map(o=>`<div class="form-card" style="margin-bottom:15px"><div style="display:flex;justify-content:space-between;gap:15px;flex-wrap:wrap"><b>Order #${o.id}</b><span class="muted">${new Date(o.date).toLocaleString("en-IN")}</span><strong>${money(o.total)}</strong></div><p class="muted">${o.items.length} item(s) · ${o.status}</p></div>`).join(""):`<div class="empty"><h3>No orders yet</h3><p>Your completed checkout orders will appear here.</p><a class="btn btn-primary" href="#shop">Start Shopping</a></div>`}</div></section>`;
}
function renderCheckout(){
  if(!state.currentUser)return renderAuth("login");
  if(!state.cart.length)return renderCart();
  const subtotal=state.cart.reduce((s,x)=>s+product(x.id).price*x.qty,0), discount=state.coupon==="STYLE10"?Math.round(subtotal*.1):0, shipping=subtotal>=3000?0:149, total=subtotal-discount+shipping;
  return `<section class="page"><div class="container"><div class="eyebrow">Secure demo checkout</div><h1 class="page-title">Checkout</h1><div class="cart-layout"><form class="form-card" onsubmit="placeOrder(event)"><h2>Shipping Details</h2><div class="info-grid"><div class="field"><label>FULL NAME</label><input required value="${state.currentUser.name}"></div><div class="field"><label>PHONE</label><input required placeholder="+91 98765 43210"></div></div><div class="field"><label>ADDRESS</label><textarea required rows="3" placeholder="House / street / area"></textarea></div><div class="info-grid"><div class="field"><label>CITY</label><input required placeholder="Hyderabad"></div><div class="field"><label>PINCODE</label><input required pattern="[0-9]{6}" placeholder="500001"></div></div><h2>Payment Method</h2><label class="chip selected" style="display:inline-flex"><input type="radio" checked> Cash / Demo Payment</label><p class="muted" style="font-size:12px">This project does not connect to a real payment gateway.</p><button class="btn btn-primary" style="width:100%;margin-top:15px">Place Order · ${money(total)}</button></form><aside class="summary"><h3>Order Summary</h3>${state.cart.map(x=>`<div class="sum-line"><span>${product(x.id).name} × ${x.qty}</span><b>${money(product(x.id).price*x.qty)}</b></div>`).join("")}<div class="sum-line"><span>Shipping</span><b>${shipping?money(shipping):"Free"}</b></div>${discount?`<div class="sum-line"><span>Discount</span><b>−${money(discount)}</b></div>`:""}<div class="sum-line sum-total"><span>Total</span><b>${money(total)}</b></div></aside></div></div></section>`;
}
function renderAbout(){
 return `<section class="page"><div class="container"><div class="eyebrow">About StyleHub</div><h1 class="page-title">Fashion with a modern point of view.</h1><p class="page-subtitle">StyleHub is a simulated premium online fashion and apparel store created for a web development internship project.</p><div class="info-grid"><div class="info-card"><h3>Our brand</h3><p>We bring together everyday essentials, trend-led pieces and accessories for men, women and kids in a clean, image-focused shopping experience.</p></div><div class="info-card"><h3>Sustainability</h3><p>Our concept encourages thoughtful wardrobes through versatile products, clear categories and a simple digital shopping journey.</p></div><div class="info-card"><h3>Design language</h3><p>Pink, white, dark ink and subtle gold accents create the elegant, trendy and luxurious visual direction requested for the project.</p></div><div class="info-card"><h3>Technology</h3><p>HTML5, CSS3 and JavaScript power the site. Product, cart, order and user data are simulated with browser localStorage.</p></div></div></div></section>`;
}
function renderContact(){
 return `<section class="page"><div class="container"><div class="eyebrow">We'd love to hear from you</div><h1 class="page-title">Contact Us</h1><div class="contact-grid"><div class="info-card"><h3>Store information</h3><p><b>Email:</b> hello@stylehub.demo</p><p><b>Phone:</b> +91 90000 12345</p><p><b>Hours:</b> Mon–Sat · 10:00 AM–7:00 PM</p><p class="muted">Demo contact details for the internship project.</p></div><form class="form-card" onsubmit="sendMessage(event)"><div class="field"><label>NAME</label><input required></div><div class="field"><label>EMAIL</label><input type="email" required></div><div class="field"><label>MESSAGE</label><textarea rows="5" required></textarea></div><button class="btn btn-primary">Send Message</button></form></div></div></section>`;
}
function renderNotFound(){return `<section class="page"><div class="container"><div class="empty"><h3>Page not found</h3><a class="btn btn-primary" href="#home">Go Home</a></div></div></section>`}

function parseRoute(){
  const raw=location.hash.slice(1)||"home"; const [path,query]=raw.split("?"); const params=new URLSearchParams(query||""); const app=document.getElementById("app");
  if(path==="home")app.innerHTML=renderHome();
  else if(path==="shop")app.innerHTML=renderShop(params);
  else if(path.startsWith("product/"))app.innerHTML=renderProduct(path.split("/")[1]);
  else if(path==="cart")app.innerHTML=renderCart();
  else if(path==="wishlist")app.innerHTML=renderWishlist();
  else if(path==="login")app.innerHTML=renderAuth("login");
  else if(path==="register")app.innerHTML=renderAuth("register");
  else if(path==="account")app.innerHTML=renderAccount();
  else if(path==="orders")app.innerHTML=renderOrders();
  else if(path==="checkout")app.innerHTML=renderCheckout();
  else if(path==="about")app.innerHTML=renderAbout();
  else if(path==="contact")app.innerHTML=renderContact();
  else app.innerHTML=renderNotFound();
  window.scrollTo({top:0,behavior:"smooth"}); updateHeader();
}
function addToCart(id,qty=1){const x=state.cart.find(i=>i.id===id);if(x)x.qty+=qty;else state.cart.push({id,qty});save();toast("Added to cart");}
function addDetailToCart(id){addToCart(id,Number(document.getElementById("detailQty").textContent)||1);location.hash="cart"}
function changeQty(id,d){const x=state.cart.find(i=>i.id===id);if(!x)return;x.qty+=d;if(x.qty<=0)state.cart=state.cart.filter(i=>i.id!==id);save();parseRoute()}
function removeCart(id){state.cart=state.cart.filter(i=>i.id!==id);save();parseRoute();toast("Removed from cart")}
function toggleWish(id){state.wishlist=state.wishlist.includes(id)?state.wishlist.filter(x=>x!==id):[...state.wishlist,id];save();parseRoute();toast(state.wishlist.includes(id)?"Added to wishlist":"Removed from wishlist")}
function selectChip(el){el.parentElement.querySelectorAll(".chip").forEach(x=>x.classList.remove("selected"));el.classList.add("selected")}
function detailQty(d){const el=document.getElementById("detailQty");let n=Number(el.textContent)+d;el.textContent=Math.max(1,n)}
function applyCoupon(){const c=(document.getElementById("couponInput").value||"").trim().toUpperCase();if(c==="STYLE10"){state.coupon=c;save();parseRoute();toast("Coupon applied — 10% off")}else{state.coupon="";save();parseRoute();toast("Invalid coupon")}}
function startCheckout(){if(!state.currentUser){toast("Please login or create an account");location.hash="login"}else location.hash="checkout"}
function submitAuth(e,mode){e.preventDefault();const email=document.getElementById("authEmail").value.trim().toLowerCase(),password=document.getElementById("authPassword").value;
 if(mode==="register"){const name=document.getElementById("authName").value.trim(),confirm=document.getElementById("authConfirm").value;if(password!==confirm)return toast("Passwords do not match");if(state.users.some(u=>u.email===email))return toast("Account already exists");state.users.push({name,email,password});state.currentUser={name,email};save();toast("Account created");location.hash="account"}
 else{const u=state.users.find(u=>u.email===email&&u.password===password);if(!u)return toast("Invalid email or password");state.currentUser={name:u.name,email:u.email};save();toast("Login successful");location.hash="account"}}
function logout(){state.currentUser=null;save();toast("Logged out");location.hash="home"}
function placeOrder(e){e.preventDefault();const subtotal=state.cart.reduce((s,x)=>s+product(x.id).price*x.qty,0),discount=state.coupon==="STYLE10"?Math.round(subtotal*.1):0,shipping=subtotal>=3000?0:149,total=subtotal-discount+shipping;const order={id:"SH"+Date.now().toString().slice(-7),date:new Date().toISOString(),email:state.currentUser.email,total,status:"Confirmed",items:state.cart.map(x=>({...x}))};state.orders.push(order);state.cart=[];state.coupon="";save();toast("Order placed successfully");location.hash="orders"}
function sendMessage(e){e.preventDefault();e.target.reset();toast("Thanks! Your message was submitted in this demo.")}
function filterPrice(){/* Visual filter controls included per project brief; category/search are functional. */}
function sortProducts(v){let url=location.hash;sessionStorage.setItem("stylehub_sort",v);parseRoute()}
document.addEventListener("click",e=>{if(e.target.closest('[data-action="search"]')){document.querySelector(".searchbar")?.classList.toggle("show")}})
document.getElementById("mobileMenu").addEventListener("click",()=>document.getElementById("navLinks").classList.toggle("open"));
window.addEventListener("hashchange",parseRoute);
window.addEventListener("load",parseRoute);

document.addEventListener("click",e=>{
  const b=e.target.closest('[data-action="search"]');
  if(!b)return;
  const q=prompt("Search StyleHub products");
  if(q!==null){state.search=q;location.hash="shop";}
});
