import { deliveryOptions } from "./deliveryOptions.js";

export let cart = [];
loadFromLocalStorage('cart');

export function getCartItem(productId){
    return cart.find(cartItem=> cartItem.productId === productId);
}

export function addToCart(productId){
   if(getCartItem(productId) === undefined){
      const cartItem = {productId: productId, quantity: 1, deliveryOptionId: '1'};
      cart.push(cartItem);
      saveToLocalStorage('cart');
   }
   else{
    const cartItem = getCartItem(productId);
    cartItem.quantity++;
    saveToLocalStorage('cart');
   }
}

export function updateCartQuantity(productId,quantity){
    const cartItem = getCartItem(productId);
    cartItem.quantity = quantity;
    saveToLocalStorage('cart');
}

export function updateCartDeliveryOption(productId, deliveryOptionId){
    try{
    const cartItem = getCartItem(productId);
    cartItem.deliveryOptionId = deliveryOptionId;
    saveToLocalStorage('cart');
    }
    catch(error){
        console.log(error);
    }
}

export function getCartQuantity(){
    return cart.length;
}
export function removeFromCart(productId){
    const newCart = cart.filter(cartItem =>{
        if(cartItem.productId === productId)
            return false;
        else
            return true;
    });
    cart = newCart;
    saveToLocalStorage('cart');
}

function loadFromLocalStorage(localStorageKey){
    cart = JSON.parse(localStorage.getItem(localStorageKey)) 
           || 
           [
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            },
            {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            },
            {
                productId: '77919bbe-0e56-475b-adde-4f24dfed3a04',
                quantity: 1,
                deliveryOptionId: '3'
            }

           ];

}

function saveToLocalStorage(localStorageKey){
    localStorage.setItem(localStorageKey, JSON.stringify(cart));
}


 