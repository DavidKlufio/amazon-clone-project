export function currencyFormat(priceCents) {
    return (Math.round(priceCents) / 100).toFixed(2); // displays the number in 2 decimal places.
};