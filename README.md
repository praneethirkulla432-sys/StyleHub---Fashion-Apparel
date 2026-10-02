# StyleHub — Fashion & Apparel

A complete frontend-only fashion e-commerce website based on the supplied StyleHub internship brief.

## Included
- Responsive Home page
- Men / Women / Kids collections
- Product listing and product detail pages
- Search, category controls, price/size filter UI
- Shopping cart with quantity adjustment
- Wishlist
- Coupon code `STYLE10` (10% demo discount)
- Checkout with shipping details
- Simulated order placement and order history
- Login / logout
- Create new account / registration
- User account dashboard
- About Us and Contact Us
- LocalStorage data persistence
- Locally stored fashion photos for all products, with the original SVG artwork retained as fallback

## Run
No build step is required. Open `index.html` in a browser.

## Important
This is a frontend-only internship project. Authentication, payments, orders and user data are simulated with browser `localStorage`; there is no real backend, database, payment gateway, or secure production authentication.

Product and collection photography is sourced from Unsplash and stored locally in `assets/`, so the images load without a network connection. The photos illustrate the products and are not exact product listings.

## Demo
1. Open `index.html`.
2. Click **Create a new account**.
3. Browse products and add items to the cart.
4. Apply `STYLE10`.
5. Checkout using the demo payment option.
6. View the order under **Account → Order History**.
