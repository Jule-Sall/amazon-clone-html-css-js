import { cart, updateCartQuantity, updateCartDeliveryOption, removeFromCart } from "../../data/cart.js";
import { products, getProduct, loadProductsAsync } from "../../data/products.js";
import { deliveryOptions, deliveryOptionsHTML, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary(){
    console.log(cart);
    let html = '';
    cart.forEach(cartItem=>{   
    const matchingProduct = getProduct(cartItem.productId);
    
    if(matchingProduct){
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    
    html += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date js-delivery-date">
                Delivery date: ${deliveryOption.dueDate}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link 
                        js-update-quantity-link link-primary" 
                        data-product-id= "${matchingProduct.id}">
                    Update
                    </span>
                    <span class="delete-quantity-link 
                    js-delete-quantity-link link-primary"
                     data-product-id= "${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                <div style="display: none" class="update-product-quantity
                     js-update-product-quantity-${matchingProduct.id}">
                    <span>
                    Quantity: <input type="text" class="js-quantity-${matchingProduct.id}"
                     style = "width: 50px">
                    </span>
                    <span class="save-update-quantity-link js-save-update-quantity-link 
                    link-primary"
                    data-product-id= "${matchingProduct.id}"
                    >
                    Save
                    </span>
                    <span class="delete-update-quantity-link 
                        js-delete-update-quantity-link
                        link-primary"
                        data-product-id= "${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>
                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                      ${deliveryOptionsHTML(matchingProduct.id)}
                </div>
            </div>
            </div>`;   
    }});

    document.querySelector('.js-return-to-home-link').innerHTML = `${cart.length} items`
    document.querySelector('.js-order-summary').innerHTML = html;
    
    
    // handle the update product quantity event 
    document.querySelectorAll('.js-update-quantity-link ')
        .forEach(updateButton=>{
            updateButton.addEventListener('click', ()=>{
                const {productId} = updateButton.dataset;
                document.querySelector(`.js-product-quantity-${productId}`)
                    .style.display = "none";
                
                document.querySelector(`.js-update-product-quantity-${productId}`)
                    .style.display = "block";
            });
    });
    
    // handle the save of the update 
    document.querySelectorAll('.js-save-update-quantity-link')
        .forEach(saveButton=>{
            saveButton.addEventListener('click', ()=>{
                const {productId} = saveButton.dataset;
                document.querySelector(`.js-update-product-quantity-${productId}`)
                .style.display = "none";

                document.querySelector(`.js-product-quantity-${productId}`)
                    .style.display = "block";
                
                const quantity = document.querySelector(`.js-quantity-${productId}`).value;
              
                 updateCartQuantity(productId, quantity);
                 renderOrderSummary();
                 renderPaymentSummary();
                 console.log(cart);
                
               
            });
    });

    // handle the delete of the update 
    document.querySelectorAll('.js-delete-update-quantity-link')
        .forEach(cancelButton=>{
            cancelButton.addEventListener('click', ()=>{
                const {productId} = cancelButton.dataset;

                document.querySelector(`.js-update-product-quantity-${productId}`)
                .style.display = "none";

                document.querySelector(`.js-product-quantity-${productId}`)
                    .style.display = "block";
                
            })
    })
    
    // handle the remove product from cart event
    document.querySelectorAll('.js-delete-quantity-link')
        .forEach(deleteButton=>{
            deleteButton.addEventListener('click', ()=>{
                const {productId} = deleteButton.dataset;
                removeFromCart(productId);
                renderOrderSummary();
                renderPaymentSummary();
            });
        });
    
    // handle the event for the delivery option 
    document.querySelectorAll(`.js-delivery-option`)
        .forEach(deliveryOptionContainer=>{
            const options = deliveryOptionContainer.querySelectorAll('.js-delivery-option-input')
            options.forEach(option=>{
                    option.addEventListener('click', ()=>{
                    const {productId, deliveryOptionId} = option.dataset;
                    console.log(deliveryOptionId);
                    updateCartDeliveryOption(productId, deliveryOptionId);
                    renderOrderSummary();
                    renderPaymentSummary();
                    })
                })
        })

}
