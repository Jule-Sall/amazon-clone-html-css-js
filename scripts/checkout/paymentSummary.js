import { cart, getCartQuantity } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../../utils/money.js";


export function renderPaymentSummary(){
    let totalItemsPriceCents = 0;
    let totalShippingCents = 0;
    cart.forEach(cartItem=>{
        const product = getProduct(cartItem.productId);
        totalItemsPriceCents += cartItem.quantity * product.priceCents;
        totalShippingCents += getDeliveryOption(cartItem.deliveryOptionId).shippingPriceCents;
    });
    let totalBeforeTaxCents = totalItemsPriceCents + totalShippingCents;
    let totalTaxCents = (totalBeforeTaxCents * 10) / 100;
    let totalPriceCents = totalBeforeTaxCents + totalTaxCents;
   
    let html = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${cart.length}):</div>
            <div class="payment-summary-money">$${formatCurrency(totalItemsPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(totalShippingCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(totalTaxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalPriceCents)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
        </div>

    `;
     document.querySelector('.js-payment-summary').innerHTML = html;
}
