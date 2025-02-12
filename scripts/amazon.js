import {cart, addToCart, calculateCartQuantity} from './data/cart.js'; // 'import' fetches code from external js file using th filepath and rns it. '..' in file path indicates that imported code is in a file in a different folder.
import {products, loadProducts} from './data/products.js'; // imports are put at the top of the file. Imports only work when files are viewed using live server.
import {currencyFormat} from './utilities/money.js';

loadProducts(renderProductsGrid);

function renderProductsGrid() {

    let productsHTML = '';

        const url = new URL(window.location.href);
        const search = url.searchParams.get('search');

        let filteredProducts = products;

        if(search) {
          filteredProducts = products.filter((product) => {
            let matchingKeyword = false;

            product.keywords.forEach((keyword) => {
              if(keyword.toLowerCase().includes(search.toLowerCase())) {
                matchingKeyword = true;
              }
            });

            return matchingKeyword || product.name.toLowerCase().includes(search.toLowerCase());
          });
        }

        filteredProducts.forEach((product) => {

          productsHTML += `
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
                    src="${product.getStars()}">
                  <div class="product-rating-count link-primary">
                    ${product.rating.count}
                  </div>
                </div>

                <div class="product-price">
                ${product.getPrice()}
                </div>

                <div class="product-quantity-container">
                  <select class="js-quantity-selector-${product.id}">
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

                ${product.extraInfoHtml()} <!--'polymorphism' is a technique which allows methods to run without specifing which class is called. ie. it allows methods to be shared between classes.-->

                <div class="product-spacer"></div>

                <div class="added-to-cart js-added-to-cart-${product.id}">
                  <img src="icons/checkmark.png">
                  Added
                </div>

                <button class="add-to-cart-button button-primary js-add-to-cart"
                data-product-id = "${product.id}"> <!-- html feature which adds a data attribute to an item. eg. name, type etc. -->
                  Add to Cart
                </button>
              </div>
            `;
        });



    document.querySelector(".js-product-grid")
        .innerHTML = productsHTML;


    function cartQuantityUpdate() {
        const cartQuantity = calculateCartQuantity(); 

        if(cartQuantity === 0) {
          document.querySelector('.js-cart-quantity')
            .innerHTML = '0';
        }else {
          document.querySelector('.js-cart-quantity')
            .innerHTML = cartQuantity;
        }

        // const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
        // addedMessage.classList.add(`added-message`);

        // setTimeout(() => {
        //    addedMessage.classList.remove(`added-message`);
        // }, 2000);
    }

    cartQuantityUpdate();

    document.querySelectorAll('.js-add-to-cart')
        .forEach((button) => {
            button.addEventListener('click', () => {
                const {productId} = button.dataset;

                addToCart(productId);

                cartQuantityUpdate();

              });
        });

      document.querySelector('.js-search-button')
        .addEventListener('click', () => {
          const search = document.querySelector('.js-search-bar').value;
          window.location.href = `index.html?search=${search}`; 
        });

        document.querySelector('.js-search-bar')
        .addEventListener('keydown', (event) => {
          if(event.key === 'Enter') {
            const searchTerm = document.querySelector('.js-search-bar').value;
            window.location.href = `index.html?search=${searchTerm}`;
          } 
        });
}


