

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
  const seatPrices = {
    front: 25,
    middle: 15,
    back: 10,
    any: null // use base price
  };

  const qtyMinus = document.querySelector(".qty-minus");
  const qtyPlus = document.querySelector(".qty-plus");

  // Open ticket modal
  document.querySelectorAll(".buy-ticket").forEach(button => {
    button.addEventListener("click", () => {
      eventTitle.textContent = button.dataset.event;
      basePrice = parseFloat(button.dataset.price);
      seatSelect.value = "any"; // reset seat selection
      ticketQtyInput.value = 1;
      updateTotal();
      modal.style.display = "flex";
    });
  });

  // Get current seat price
  function getCurrentSeatPrice() {
    const seat = seatSelect.value;
    return seatPrices[seat] || basePrice;
  }

  function updateTotal() {
    const qty = parseInt(ticketQtyInput.value);
    const pricePerTicket = getCurrentSeatPrice();
    const total = qty * pricePerTicket;
    ticketQuantitySpan.textContent = qty;
    ticketPriceSpan.textContent = `$${pricePerTicket.toFixed(2)}`;
    ticketTotal.textContent = `$${total.toFixed(2)}`;
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



document.addEventListener("DOMContentLoaded", function () {
  const ticketForm = document.getElementById("ticket-form");
  const ticketModal = document.getElementById("ticket-modal");

  if (ticketForm) {
    ticketForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // ...your booking logic here...

      // Show success popup
      // alert("Tickets booked successfully!");

      // Optionally close the modal
      ticketModal.style.display = "none";
      ticketForm.reset();
    });
  }
});

modal.style.display = "none";
document.getElementById("success-popup").style.display = "flex";

document.querySelector(".close-success").onclick = () => {
  document.getElementById("success-popup").style.display = "none";
};
