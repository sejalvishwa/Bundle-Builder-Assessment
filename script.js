const bundleButtons = document.querySelectorAll(".add-btn");
const progressBar = document.querySelector(".progress-bar");
const discountPrice = document.getElementById("discount-value");
const subtotalPrice = document.getElementById("subtotal-value");
const cartBtn = document.querySelector(".cart-btn");

let selectedCount = 0;
const maxSelection = 3;

bundleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const image = btn.dataset.image;
    const heading = btn.dataset.heading;
    const price = btn.dataset.price;

    if (btn.classList.contains("added-style")) return;

    // Create bundle container
    const bundleContainer = document.createElement("div");
    bundleContainer.classList.add("bundle-container");

    bundleContainer.innerHTML = `
      <img src="${image}" alt="${heading}" />
      <div class="bundle-items">
        <h4>${heading}</h4>
        <p class="bundle-price">$${price}</p>
        <div class="quantity-control">
          <div class="quantity-btn">
            <span>-</span>
            <span>1</span>
            <span>+</span>
          </div>
          <img src="./assets/icons/delete.svg" alt="Delete" />
        </div>
      </div>
    `;

    // Append to cart
    const cartBundle = document.getElementById("cart-bundle-id");
const placeholders = cartBundle.querySelectorAll(".bundle-placeholder");

let replaced = false;

for (let i = 0; i < placeholders.length; i++) {
  const placeholder = placeholders[i];
  if (!placeholder.classList.contains("filled") && !replaced) {
    placeholder.replaceWith(bundleContainer);
    replaced = true;
  }
}


    // Update button state
    if (selectedCount < maxSelection) {
      btn.innerHTML = `
        <p>Added to Bundle</p>
        <img src="./assets/icons/check.svg" alt="check-icon" />
      `;
      btn.classList.add("added-style");
      selectedCount++;

      const progressPercent = (selectedCount / maxSelection) * 100;
      progressBar.style.width = `${progressPercent}%`;

      if (selectedCount === maxSelection) {
        // Disable other buttons
        bundleButtons.forEach((b) => {
          if (!b.classList.contains("added-style")) {
            b.classList.add("disabled-style");
            b.style.pointerEvents = "none";
          }
        });

        // Update cart button text
        cartBtn.innerHTML = `
          <p>Add 3 Items to Cart</p>
          <img src="./assets/icons/caret-right.svg" alt="cart-icon" />
        `;
        cartBtn.classList.add("ready-to-cart");

        // Add click listener
        if (!cartBtn.classList.contains("click-attached")) {
          cartBtn.classList.add("click-attached");

          cartBtn.addEventListener("click", () => {
            if (cartBtn.classList.contains("ready-to-cart")) {
              cartBtn.innerHTML = `
                <p>Added to Cart</p>
                <img src="./assets/icons/check.svg" alt="check-icon" />
              `;
              cartBtn.classList.remove("ready-to-cart");
              cartBtn.classList.add("cart-added");

              cartBtn.style.pointerEvents = "none";
            }
          });
        }
      }
    }

    // Recalculate prices
    const discountPrices = document.querySelectorAll(".bundle-price");
    let total = 0;

    discountPrices.forEach((priceEl) => {
      const price = parseFloat(priceEl.textContent.replace(/[^0-9.]/g, ""));
      if (!isNaN(price)) {
        total += price;
      }
    });

    const currDiscount = 0.3 * total;
    const finalValue = total - currDiscount;

    discountPrice.innerHTML = `${currDiscount.toFixed(2)}`;

    // Append (30%)
    const parentPara = discountPrice.parentElement;
    let existing = parentPara.querySelector(".discount-percent");
    if (!existing) {
      const percentSpan = document.createElement("span");
      percentSpan.classList.add("discount-percent");
      percentSpan.textContent = " (30%)";
      parentPara.appendChild(percentSpan);
    }

    subtotalPrice.innerHTML = `${finalValue.toFixed(2)}`;
  });
});
