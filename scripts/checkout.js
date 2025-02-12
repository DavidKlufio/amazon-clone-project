import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {loadProducts, loadProductsFetch} from "./data/products.js";
import {loadCartFetch} from "./data/cart.js";
// import './data/cart-class.js';
// import './data/car.js';
// import './data/backend-practice.js';


async function loadPage() {

    try{

        // throw 'error1';

        await Promise.all([

             loadProductsFetch(),
             loadCartFetch()

        ]);

    } catch (error) {
        console.log('unexpected error. Please try again later.');
    }

    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();
/*
Promise.all([
    loadProductsFetch(), 
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    }),  

]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve('value1');
    });

}).then((value) => {
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });

}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/


/*
loadProducts(() => {
    loadCart(() => {
        renderOrderSummary();
        renderPaymentSummary();
    }); 
});
*/

// 'promises' are code which let asynchronus code run before the rest of the code runs.
// '.then()' is a promise method which gives the 'promise' follow up code to run.
// 'Promise.all([])' waits for all promises in its array to finish running before moving to the next step. ie. '.then()'.
// 'async' makes functions return promises automatically. it has an 'await' feature which acts as '.then()' but shorter and simpler.
// 'try' receives code which might encounter unexpected errors when run. if an error is encountered, the code within 'try' will be skipped and 'catch' code will run.
// 'throw' allows us to manually create errors to test the 'try/catch' method. it can be used within promises.
// 'catch' receives and handles errors by running the code within it if an error is encountered. 
// 'reject();' is a function which allows us to manually create errors in the future.