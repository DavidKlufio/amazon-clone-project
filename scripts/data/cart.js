import {validDelveryOption} from "./deliveryOptions.js";

export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart =  JSON.parse(localStorage.getItem('cart')); // 'export' allows code to be run through another js file directly.

    if(!cart) {
        cart = [{
            productId: `e43638ce-6aa0-4b85-b27f-e1d07eb678c6`,
            quantity: 2,
            deliveryOptionId: '1'
        },{
            productId: `15b6fc6f-327a-4ec4-896f-486349e85a3d`,
            quantity: 1,
            deliveryOptionId: '2'
        }];
    };
};
  


function saveToStorage () {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(quantitySelector.value); // converts string value from DOM back into numbers.

    if(matchingItem) {
        matchingItem.quantity += quantity; 
    } else{
        cart.push({
            productId,
            quantity, 
            deliveryOptionId: '1'
        });
    }
    saveToStorage();
}

export function deleteFromCart(productId) {
    const newCart = [];
    cart.forEach ((cartItem) => {
        if(cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    }) 
    cart = newCart;
    saveToStorage();
}

export function calculateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    matchingItem.quantity = newQuantity;
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if(!matchingItem) {
        return;
    }

    if(!validDelveryOption(deliveryOptionId)) {
        return;
    }

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}

/*
export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}
*/

export async function loadCartFetch() {
    const response = await fetch('https://supersimplebackend.dev/cart')
    const text = await response.text();
    console.log(text);
    return text;
}

export function resetCart() {
    cart = [];
    saveToStorage();
}

loadCartFetch();