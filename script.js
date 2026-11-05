
const WHATSAPP_NUMBER = "233546135160";
// Replace with your real WhatsApp number.

const products = [
  {
    id: "black-gloves",
    name: "Black Nitrile Gloves",
    desc: "High quality and durable",
    image: "WhatsApp Image 2026-11-04 at 04.24.10.jpeg"
  },
  {
    id: "blue-gloves",
    name: "Blue Examination Gloves",
    desc: "Comfortable fit",
    image: "WhatsApp Image 2026-11-04 at 04.24.18.jpeg"
  },
  {
    id: "coveralls",
    name: "Disposable Coveralls",
    desc: "Full body protection",
    image: "WhatsApp Image 2026-11-04 at 04.24.17.jpeg"
  },
  {
    id: "beard-covers",
    name: "Disposable Beard Covers",
    desc: "Hygienic protection",
    image: "WhatsApp Image 2026-11-04 at 04.24.16.jpeg"
  },
  {
    id: "hair-caps",
    name: "Disposable Hair Caps",
    desc: "Hygienic and breathable",
    image: "WhatsApp Image 2026-11-04 at 04.24.14.jpeg"
  },
  {
    id: "shoe-covers",
    name: "Disposable Shoe Covers",
    desc: "Helps keep areas clean",
    image: "WhatsApp Image 2026-11-04 at 04.24.13.jpeg"
  },
  {
    id: "ffp2",
    name: "FFP2 Face Mask",
    desc: "High filtration protection",
    image: "WhatsApp Image 2026-11-05 at 13.08.09.jpeg"
  },
  {
    id: "ffp3",
    name: "FFP3 Face Mask",
    desc: "High filtration protection",
    image: "WhatsApp Image 2026-11-05 at 13.08.08.jpeg"
  },
  {
    id: "kn95",
    name: "KN95 Face Mask",
    desc: "Reliable face protection",
    image: "WhatsApp Image 2026-11-05 at 13.08.00.jpeg"
  },
  {
    id: "surgical-mask",
    name: "Blue Surgical Mask",
    desc: "Everyday hygiene protection",
    image: "WhatsApp Image 2026-11-05 at 13.43.46.jpeg"
  }
];

let cart = [];

const productGrid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");

function renderProducts(list = products) {
  productGrid.innerHTML = list.map(product => `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}"
        onerror="this.src='https://placehold.co/500x350/f5f6fa/222?text=Baawah+Ventures'">
      <h3>${product.name}</h3>
      <p>${product.desc}</p>
      <div class="carton-tag">▦ Carton Only · Bulk Sale</div>
      <button class="add-btn" onclick="addToCart('${product.id}')">
        🛒 Add to Cart
      </button>
    </article>
  `).join("");
}

function addToCart(id) {
  const found = cart.find(item => item.id === id);

  if (found) {
    found.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }

  renderCart();
}

function changeQuantity(id, amount) {
  const item = cart.find(entry => entry.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(entry => entry.id !== id);
  }

  renderCart();
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

function renderCart() {
  const total = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  document.getElementById("cartCount").textContent = total;
  document.getElementById("cartHeadingCount").textContent =
    `(${total} cartons)`;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <div class="empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add your favourite safety products to get started.</p>
      </div>
    `;
    return;
  }

  cartItems.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);

    return `
      <div class="cart-row">
        <img src="${product.image}" alt="${product.name}">
        <div>
          <h4>${product.name}</h4>
          <small>Carton only</small>

          <div class="cart-actions">
            <button onclick="changeQuantity('${item.id}', -1)">−</button>
            <b>${item.quantity}</b>
            <button onclick="changeQuantity('${item.id}', 1)">+</button>
          </div>
        </div>

        <button class="remove"
          onclick="removeItem('${item.id}')">
          ✕ Remove
        </button>
      </div>
    `;
  }).join("");
}

document.getElementById("clearCart").addEventListener("click", () => {
  cart = [];
  renderCart();
});

document.getElementById("cartJump").addEventListener("click", () => {
  document.getElementById("cart").scrollIntoView({
    behavior: "smooth"
  });
});

document.getElementById("searchForm").addEventListener("submit", event => {
  event.preventDefault();

  const query = document.getElementById("searchInput")
    .value.trim().toLowerCase();

  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.desc.toLowerCase().includes(query)
  );

  renderProducts(filtered);
});

document.getElementById("whatsappOrder").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty. Please add products first.");
    return;
  }

  const name = prompt("Please enter your name:");
  if (!name || !name.trim()) return;

  const location = prompt("Please enter your delivery location:");
  if (!location || !location.trim()) return;

  const lines = cart.map(item => {
    const product = products.find(p => p.id === item.id);

    return `• ${product.name} — ${item.quantity} carton(s)`;
  });

  const message =
    `Hello Baawah Ventures, I would like to place an order:\n\n` +
    `${lines.join("\n")}\n\n` +
    `Name: ${name.trim()}\n` +
    `Location: ${location.trim()}\n\n` +
    `Please confirm prices and availability. Thank you.`;

  if (WHATSAPP_NUMBER === "233000000000") {
    alert("Please add your real WhatsApp number in script.js first.");
    return;
  }

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
});

document.getElementById("contactTop").href =
  `https://wa.me/${WHATSAPP_NUMBER}`;

renderProducts();
renderCart();
