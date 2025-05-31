
const sessionBookings = [];

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("ticket-modal");
  const eventTitle = document.getElementById("event-title");
  const ticketQtyInput = document.getElementById("ticket-qty");
  const ticketTotal = document.getElementById("ticket-total");
  const ticketQuantitySpan = document.getElementById("ticket-quantity");
  const ticketPriceSpan = document.getElementById("ticket-price");
  const seatSelect = document.getElementById("ticket-seats");

  let basePrice = 0;
 

  const qtyMinus = document.querySelector(".qty-minus");
  const qtyPlus = document.querySelector(".qty-plus");

  // Get current seat price
    const seatMultipliers = {
    front: 2,
    middle: 1.5,
    back: 1.2,
    any: 1
  };





  let currentButton = null;

document.querySelectorAll(".buy-ticket").forEach(button => {
  button.addEventListener("click", () => {
    eventTitle.textContent = button.dataset.event;
    basePrice = parseFloat(button.dataset.price);
    seatMultipliers = {
      front: parseFloat(button.dataset.seatFront || "2"),
      middle: parseFloat(button.dataset.seatMiddle || "1.5"),
      back: parseFloat(button.dataset.seatBack || "1.2"),
      any: parseFloat(button.dataset.seatAny || "1")
    };
    seatSelect.value = "any";
    ticketQtyInput.value = 1;
    updateTotal();
    modal.style.display = "flex";
    currentButton = button;
  });
});



  function getCurrentSeatPrice() {
    const seat = seatSelect.value;
    if (basePrice === 0) return 0; // Free event, seats are free
    return basePrice * seatMultipliers[seat];
  }

  function updateTotal() {
    const qty = parseInt(ticketQtyInput.value);
    const pricePerTicket = getCurrentSeatPrice();
    const total = qty * pricePerTicket;
    ticketQuantitySpan.textContent = qty;
    ticketPriceSpan.textContent = `₹${pricePerTicket.toFixed(2)}`;
    ticketTotal.textContent = `₹${total.toFixed(2)}`;
  }

  // Quantity events
  qtyPlus.addEventListener("click", () => {
    let val = parseInt(ticketQtyInput.value);
    if (val < 10) {
      ticketQtyInput.value = val + 1;
      updateTotal();
    }
  });

  qtyMinus.addEventListener("click", () => {
    let val = parseInt(ticketQtyInput.value);
    if (val > 1) {
      ticketQtyInput.value = val - 1;
      updateTotal();
    }
  });

  ticketQtyInput.addEventListener("input", updateTotal);

  // Update on seat change
  seatSelect.addEventListener("change", updateTotal);

  // Form submit
  document.getElementById("ticket-form").addEventListener("submit", e => {
    e.preventDefault();
    const qty = parseInt(ticketQtyInput.value);
    const event = eventTitle.textContent;
    const seat = seatSelect.value;
    const ticketLabel = seat.charAt(0).toUpperCase() + seat.slice(1);
    const ticketCountLabel = `${qty} ${ticketLabel} Seat(s)`;
    const total = `$${(qty * getCurrentSeatPrice()).toFixed(2)}`;

    const booking = {
      event,
      date: "June 15, 2025",
      tickets: ticketCountLabel,
      ref: `CH-${Date.now()}`,
      total
    };

    sessionBookings.push(booking);

    // Save to sessionStorage
    let stored = JSON.parse(sessionStorage.getItem('myBookings') || '[]');
    stored.push(booking);
    sessionStorage.setItem('myBookings', JSON.stringify(stored));

    modal.style.display = "none";
    document.getElementById("success-popup").style.display = "flex";
  });

  document.querySelector(".close-success").onclick = () => {
    document.getElementById("success-popup").style.display = "none";
  };

  window.getSessionBookings = () => sessionBookings;
});

// Event filtering logic
document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove 'active' from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add 'active' to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            eventCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

