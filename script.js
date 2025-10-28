let cart = [];

function loadCart() {
  const savedCart = localStorage.getItem('bookHavenCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartDisplay();
  }
}

function saveCart() {
  localStorage.setItem('bookHavenCart', JSON.stringify(cart));
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartCount = document.getElementById('cartCount');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

function addToCart(product, price) {
  cart.push({ product, price });
  saveCart();
  alert(`${product} added to cart!`);
}

function displayCart() {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');

  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty.</p>';
    cartTotal.textContent = '0.00';
    return;
  }

  let total = 0;
  let html = '';

  cart.forEach((item, index) => {
    total += parseFloat(item.price);
    html += `
      <div class="cart-item">
        <span>${item.product}</span>
        <span>$${item.price}</span>
      </div>
    `;
  });

  cartItems.innerHTML = html;
  cartTotal.textContent = total.toFixed(2);
}

function clearCart() {
  if (confirm('Are you sure you want to clear your cart?')) {
    cart = [];
    saveCart();
    displayCart();
  }
}

function processOrder() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  if (confirm('Process your order?')) {
    alert('Thank you for your order! Your books will be ready for pickup during store hours.');
    cart = [];
    saveCart();
    displayCart();
    document.getElementById('cartModal').style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  loadCart();

  const addToCartButtons = document.querySelectorAll('.btn-add');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const product = this.getAttribute('data-product');
      const price = this.getAttribute('data-price');
      addToCart(product, price);
    });
  });

  const viewCartBtn = document.getElementById('viewCartBtn');
  if (viewCartBtn) {
    viewCartBtn.addEventListener('click', function() {
      displayCart();
      document.getElementById('cartModal').style.display = 'block';
    });
  }

  const closeBtn = document.querySelector('.close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      document.getElementById('cartModal').style.display = 'none';
    });
  }

  const clearCartBtn = document.getElementById('clearCartBtn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', clearCart);
  }

  const processOrderBtn = document.getElementById('processOrderBtn');
  if (processOrderBtn) {
    processOrderBtn.addEventListener('click', processOrder);
  }

  window.addEventListener('click', function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
      };

      const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      messages.push(formData);
      localStorage.setItem('contactMessages', JSON.stringify(messages));

      const formMessage = document.getElementById('formMessage');
      formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
      formMessage.className = 'form-message success';

      contactForm.reset();

      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    });
  }

  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for subscribing to our newsletter!');
      form.reset();
    });
  });
});
