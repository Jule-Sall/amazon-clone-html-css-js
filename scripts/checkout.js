import { products, getProduct, loadProductsAsync } from "../data/products.js";
import { renderOrderSummary} from "../data/checkout/orderSummary.js";
import { renderPaymentSummary } from "../data/checkout/paymentSummary.js";

async function loadPageAsync(){
    
    try
    {
    await loadProductsAsync();
    renderOrderSummary();
    renderPaymentSummary();
    }
    catch(error){
        console.log(error);
    }
}

loadPageAsync();
