import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { cart, getCartItem} from './cart.js';
import { formatCurrency } from '../utils/money.js'; 

export let deliveryOptions = [
    {
        id: '1',
        dueDate: dayjs().format('dddd, MMMM DD'),
        shippingPriceCents: 0
    },
    {
        id: '2',
        dueDate: dayjs().add(2, 'day').format('dddd, MMMM DD'),
        shippingPriceCents: 499
    },
    {
        id: '3',
        dueDate: dayjs().add(6, 'days').format('dddd, MMMM DD'),
        shippingPriceCents: 999
    }

]; 

export function deliveryOptionsHTML(productId){
    let html = '';
    deliveryOptions.forEach(
        deliveryOption=>{
        const matchingCartItem = getCartItem(productId);
        const isChecked = matchingCartItem.deliveryOptionId === deliveryOption.id;
            html += `
                <div class="delivery-option js-delivery-option">
                    <input type="radio" ${isChecked ? 'checked' : ''}
                    class="delivery-option-input js-delivery-option-input"
                    name="delivery-option-${productId}"
                    data-product-id = "${productId}"
                    data-delivery-option-id = "${deliveryOption.id}"
                    >
                    <div>
                    <div class="delivery-option-date">
                        ${deliveryOption.dueDate}
                    </div>
                    <div class="delivery-option-price">
                        ${deliveryOption.shippingPriceCents === 0
                            ?
                            'FREE'
                            :
                            `$${formatCurrency(deliveryOption.shippingPriceCents)}`
                        }
                        Shipping
                    </div>
                    </div>
                </div>
            `; 
        }
    )
    return html;
}


export function getDeliveryOption(deliveryOptionId){
    const deliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId);  
    return deliveryOption || deliveryOptions[0];   
}
