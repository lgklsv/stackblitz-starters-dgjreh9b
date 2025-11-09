let cart = [];

function loadCart() {
	const savedCart = sessionStorage.getItem("bookHavenCart");
	if (savedCart) {
		cart = JSON.parse(savedCart);
		updateCartDisplay();
	}
}

function saveCart() {
	sessionStorage.setItem("bookHavenCart", JSON.stringify(cart));
	updateCartDisplay();
}

function updateCartDisplay() {
	const cartCount = document.getElementById("cartCount");
	if (cartCount) {
		cartCount.textContent = cart.length;
	}
}

function addToCart(product, price) {
	cart.push({ product, price });
	saveCart();
	alert("Item added to the cart");
}

function displayCart() {
	const cartItems = document.getElementById("cartItems");
	const cartTotal = document.getElementById("cartTotal");

	if (cart.length === 0) {
		cartItems.innerHTML = "<p>Your cart is empty.</p>";
		cartTotal.textContent = "0.00";
		return;
	}

	let total = 0;
	let html = "";

	cart.forEach((item, _index) => {
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
	if (cart.length === 0) {
		alert("No items to clear.");
	} else {
		cart = [];
		saveCart();
		displayCart();
		alert("Cart cleared");
	}
}

function processOrder() {
	if (cart.length === 0) {
		alert("Cart is empty.");
		return;
	}

	alert("Thank you for your order");
	cart = [];
	saveCart();
	displayCart();
	document.getElementById("cartModal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
	loadCart();

	const addToCartButtons = document.querySelectorAll(".btn-add");
	addToCartButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const product = this.getAttribute("data-product");
			const price = this.getAttribute("data-price");
			addToCart(product, price);
		});
	});

	const viewCartBtn = document.getElementById("viewCartBtn");
	if (viewCartBtn) {
		viewCartBtn.addEventListener("click", () => {
			displayCart();
			document.getElementById("cartModal").style.display = "block";
		});
	}

	const closeBtn = document.querySelector(".close");
	if (closeBtn) {
		closeBtn.addEventListener("click", () => {
			document.getElementById("cartModal").style.display = "none";
		});
	}

	const clearCartBtn = document.getElementById("clearCartBtn");
	if (clearCartBtn) {
		clearCartBtn.addEventListener("click", clearCart);
	}

	const processOrderBtn = document.getElementById("processOrderBtn");
	if (processOrderBtn) {
		processOrderBtn.addEventListener("click", processOrder);
	}

	window.addEventListener("click", (event) => {
		const modal = document.getElementById("cartModal");
		if (event.target === modal) {
			modal.style.display = "none";
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			const modal = document.getElementById("cartModal");
			if (modal) {
				const modalStyle = window.getComputedStyle(modal);
				if (modalStyle.display === "block") {
					modal.style.display = "none";
				}
			}
		}
	});

	const contactForm = document.getElementById("contactForm");
	if (contactForm) {
		contactForm.addEventListener("submit", (e) => {
			e.preventDefault();

			const formData = {
				name: document.getElementById("name").value,
				email: document.getElementById("email").value,
				subject: document.getElementById("subject").value,
				message: document.getElementById("message").value,
				timestamp: new Date().toISOString(),
			};

			const messages = JSON.parse(
				localStorage.getItem("contactMessages") || "[]",
			);
			messages.push(formData);
			localStorage.setItem("contactMessages", JSON.stringify(messages));

			alert(`Thank you for your message, ${formData.name}`);

			contactForm.reset();
		});
	}

	const newsletterForms = document.querySelectorAll(".newsletter-form");
	newsletterForms.forEach((form) => {
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			alert("Thank you for subscribing.");
			form.reset();
		});
	});
});
