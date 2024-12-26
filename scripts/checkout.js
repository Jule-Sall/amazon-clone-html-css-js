import { products, getProduct, loadProductsAsync } from "../data/products.js";
import { renderOrderSummary} from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

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
