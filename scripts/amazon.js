import {products, loadProductsAsync} from "../data/products.js";
import { cart, addToCart } from "../data/cart.js";

async function loadPageAsync(){
 try{
    await loadProductsAsync();
    renderProductsHTML();
    console.log(products);
   
 }
 catch(error){
    console.log(error);
 }
}
loadPageAsync();

function renderProductsHTML(){
    let html = '';
    products.forEach(product=>{
      html += `
      <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsURL()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary 
            js-add-to-cart-button" data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>`
   });
    
   
    document.querySelector('.js-products-grid').innerHTML = html;
    document.querySelector(`.js-cart-quantity`).innerHTML = cart.length;
    document.querySelectorAll('.js-add-to-cart-button')
       .forEach((button)=>{
        button.addEventListener('click', ()=>{
        const {productId} = button.dataset;
        addToCart(productId);
        document.querySelector(`.js-cart-quantity`).innerHTML = cart.length;
        });
       });  
}