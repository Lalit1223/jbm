document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  }

  // Modified Carousel functionality - auto-scroll only
  function initCarousel(carouselContainer) {
    const wrapper = carouselContainer.querySelector(".carousel-wrapper");
    const slides = carouselContainer.querySelectorAll(".carousel-slide");

    // Only setup if there are multiple slides
    if (slides.length <= 1) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Remove navigation elements but keep the wrappers
    const prevButton = carouselContainer.querySelector(".prev");
    const nextButton = carouselContainer.querySelector(".next");
    const dotsContainer = carouselContainer.querySelector(".carousel-dots");

    if (prevButton) prevButton.style.display = "none";
    if (nextButton) nextButton.style.display = "none";
    if (dotsContainer) dotsContainer.style.display = "none";

    function goToSlide(index) {
      currentIndex = index;
      wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      goToSlide(currentIndex);
    }

    // Auto-play carousel
    setInterval(nextSlide, 4000);
  }

  // Initialize all carousels
  document.querySelectorAll(".carousel-container").forEach(initCarousel);

  // Elements for the order form
  const menuCategorySelect = document.getElementById("menuCategory");
  const menuItemSelect = document.getElementById("menuItem");
  const quantityInput = document.getElementById("quantity");
  const decreaseBtn = document.getElementById("decreaseQuantity");
  const increaseBtn = document.getElementById("increaseQuantity");
  const addToOrderBtn = document.getElementById("addToOrder");
  const selectedItemsContainer = document.getElementById("selectedItems");
  const orderItemsList = document.getElementById("orderItemsList");
  const orderTotal = document.getElementById("orderTotal");
  const orderTotalHidden = document.getElementById("orderTotalHidden");
  const orderItemsHidden = document.getElementById("orderItemsHidden");
  const orderForm = document.getElementById("orderForm");

  // Menu items data with prices
  const menuItems = {
    thali: [
      {
        value: "bangda-thali",
        text: "Bangda Thali (Indian Mackerel)",
        price: 499,
      },
      {
        value: "surmai-thali",
        text: "Surmai Thali (King Fish)",
        price: 799,
      },
      {
        value: "paplet-thali",
        text: "Paplet Thali (Pomfret)",
        price: 899,
      },
      {
        value: "bombil-thali",
        text: "Bombil Thali (Bombay Duck)",
        price: 499,
      },
      {
        value: "prawns-thali",
        text: "Prawns Thali (King Prawns)",
        price: 699,
      },
      {
        value: "rawas-thali",
        text: "Rawas Thali (Indian Salmon)",
        price: 799,
      },
      { value: "mandeli-thali", text: "Mandeli Thali", price: 399 },
    ],
    fry: [
      { value: "bangda-fry", text: "Bangda Fry (Mackerel)", price: 299 },
      {
        value: "surmai-fry",
        text: "Surmai Fry Large (King Fish)",
        price: 799,
      },
      { value: "paplet-fry", text: "Paplet Fry (Pomfret)", price: 899 },
      {
        value: "bombil-fry",
        text: "Bombil Fry (Bombay Duck) 3 pieces",
        price: 399,
      },
      { value: "prawns-fry", text: "Prawns Fry", price: 599 },
      {
        value: "rawas-fry",
        text: "Rawas Fry (Indian Salmon)",
        price: 699,
      },
      { value: "mandeli-fry", text: "Mandeli Fry", price: 299 },
    ],
    bread: [
      { value: "chapati", text: "Chapati", price: 25 },
      { value: "rice-bhakri", text: "Rice Bhakri", price: 45 },
      { value: "steam-rice", text: "Steam Rice", price: 110 },
    ],
    beverage: [
      { value: "soulkurry", text: "SoulKurry", price: 100 },
      { value: "pineapple", text: "Tropical Pineapple", price: 60 },
      { value: "orange", text: "Zesty Orange", price: 60 },
      { value: "nimbustan", text: "Nimbustan", price: 60 },
      { value: "kokam", text: "Bloody Kokam", price: 60 },
      { value: "mango", text: "Juicy Mango", price: 60 },
      { value: "pink-panther", text: "Pink Panther", price: 60 },
    ],
  };

  // Store the selected items
  let selectedItems = [];
  let total = 0;

  // Event listener for category selection
  if (menuCategorySelect) {
    menuCategorySelect.addEventListener("change", function () {
      // Clear current options
      menuItemSelect.innerHTML = "";

      const category = this.value;
      if (!category) {
        // If no category selected, show default option
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "First select a category";
        menuItemSelect.appendChild(defaultOption);
        menuItemSelect.disabled = true;
        addToOrderBtn.disabled = true;
        return;
      }

      // Enable the item select
      menuItemSelect.disabled = false;

      // Add default option
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Select an item";
      menuItemSelect.appendChild(defaultOption);

      // Add options based on selected category
      const items = menuItems[category] || [];
      items.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.value;
        option.textContent = `${item.text} - ₹${item.price}`;
        option.dataset.price = item.price;
        option.dataset.name = item.text;
        menuItemSelect.appendChild(option);
      });
    });
  }

  // Enable/disable Add to Order button based on menu item selection
  if (menuItemSelect) {
    menuItemSelect.addEventListener("change", function () {
      addToOrderBtn.disabled = !this.value;
    });
  }

  // Quantity buttons
  if (decreaseBtn) {
    decreaseBtn.addEventListener("click", function () {
      let value = parseInt(quantityInput.value);
      if (value > 1) {
        quantityInput.value = value - 1;
      }
    });
  }

  if (increaseBtn) {
    increaseBtn.addEventListener("click", function () {
      let value = parseInt(quantityInput.value);
      if (value < 10) {
        quantityInput.value = value + 1;
      }
    });
  }

  // Add to order button
  if (addToOrderBtn) {
    addToOrderBtn.addEventListener("click", function () {
      const selectedOption =
        menuItemSelect.options[menuItemSelect.selectedIndex];
      const itemName = selectedOption.dataset.name;
      const itemPrice = parseFloat(selectedOption.dataset.price);
      const quantity = parseInt(quantityInput.value);
      const itemTotal = itemPrice * quantity;

      // Create a unique ID for this item
      const itemId = `item-${Date.now()}`;

      // Add to selected items array
      selectedItems.push({
        id: itemId,
        name: itemName,
        price: itemPrice,
        quantity: quantity,
        total: itemTotal,
      });

      // Update the UI
      updateOrderUI();

      // Reset form for next item
      menuItemSelect.value = "";
      quantityInput.value = "1";
      addToOrderBtn.disabled = true;
    });
  }

  // Remove item from order
  function removeItem(itemId) {
    selectedItems = selectedItems.filter((item) => item.id !== itemId);
    updateOrderUI();
  }

  // Update order UI
  function updateOrderUI() {
    // Show the selected items container if there are items
    if (selectedItems.length > 0) {
      selectedItemsContainer.style.display = "block";
    } else {
      selectedItemsContainer.style.display = "none";
    }

    // Clear the list
    orderItemsList.innerHTML = "";

    // Reset total
    total = 0;

    // Add each item to the list
    selectedItems.forEach((item) => {
      total += item.total;

      const itemElement = document.createElement("div");
      itemElement.className = "selected-item";
      itemElement.innerHTML = `
            <div class="selected-item-left">
              <span class="remove-item" data-id="${item.id}">✕</span>
              <span>${item.name} x ${item.quantity}</span>
            </div>
            <div>₹${item.total}</div>
          `;
      orderItemsList.appendChild(itemElement);

      // Add event listener to remove button
      const removeBtn = itemElement.querySelector(".remove-item");
      removeBtn.addEventListener("click", function () {
        removeItem(this.dataset.id);
      });
    });

    // Update total
    orderTotal.textContent = `₹${total}`;

    // Update hidden fields for Formspree
    if (orderItemsHidden) {
      orderItemsHidden.value = JSON.stringify(selectedItems);
    }

    if (orderTotalHidden) {
      orderTotalHidden.value = total;
    }
  }

  // Form submission for Formspree
  if (orderForm) {
    orderForm.addEventListener("submit", function (e) {
      // Only validate, don't prevent default to allow Formspree processing
      if (selectedItems.length === 0) {
        e.preventDefault(); // Prevent form submission only if validation fails
        alert("Please add at least one item to your order.");
        return;
      }

      // Update submission button to show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        // If the form successfully submits, Formspree will handle the redirect
        // If there's an error, enable the button again after 5 seconds as a fallback
        setTimeout(() => {
          if (document.activeElement !== submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }
        }, 5000);
      }
    });
  }

  // Check for Formspree success parameter in URL
  function checkFormspreeSuccess() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("success") === "true") {
      // Create success message
      const successMsg = document.createElement("div");
      successMsg.style.backgroundColor = "#e6f7e6";
      successMsg.style.color = "#2e7d32";
      successMsg.style.padding = "15px";
      successMsg.style.borderRadius = "8px";
      successMsg.style.margin = "20px 0";
      successMsg.style.textAlign = "center";
      successMsg.style.fontWeight = "bold";
      successMsg.textContent =
        "Your order has been successfully submitted! We will contact you soon to confirm details.";

      // Add message to the page
      if (orderForm && orderForm.parentNode) {
        orderForm.parentNode.insertBefore(successMsg, orderForm);
        orderForm.style.display = "none"; // Hide the form
      }

      // Scroll to the message
      successMsg.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  // Run success check on page load
  checkFormspreeSuccess();
});
