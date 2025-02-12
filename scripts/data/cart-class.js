class Cart {

    cartItems;
    #localStorageKey; // '#' is a class feature which makes a property or method "private". This means that the property or method can only be accessed inside the class.

    constructor(localStorageKey) { // "constructor() {}" is a feature method of OOP classes which allows us to run setup code within the class after creating an object. Constructors run automatically after creating the object(s).
        
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    };

    #loadFromStorage() {
        this.cartItems =  JSON.parse(localStorage.getItem(this.#localStorageKey)); // 'this' is a js feature which references an outer object which contains the property requested. 
    
        if(!this.cartItems) {
            this.cartItems = [{
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

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    };

    addToCart(productId) {
        let matchingItem;
    
        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });
    
        // const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        // const quantity = Number(quantitySelector.value); // converts string value from DOM back into numbers.
    
        if(matchingItem) {
            matchingItem.quantity += 1; // matchingItem.quantity += quantity;
        } else{
            this.cartItems.push({
                productId,
                quantity: 1, // quantity,
                deliveryOptionId: '1'
            });
        }
        this.saveToStorage();
    };

    deleteFromCart(productId) {
        const newCart = [];
        this.cartItems.forEach ((cartItem) => {
            if(cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        }) 
        this.cartItems = newCart;
        this.saveToStorage();
    };

    calculateCartQuantity() {
        let cartQuantity = 0;
    
        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });
        return cartQuantity;
    };
    
    updateQuantity(productId, newQuantity) {
        let matchingItem;
    
        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });
        matchingItem.quantity = newQuantity;
        this.saveToStorage();
    };

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
    
        this.cartItems.forEach((cartItem) => {
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
    
        this.saveToStorage();
    }
};


const cart = new Cart('cart-oop'); // the string parameter used here is saved into the constructor parametr variable and then run.
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);