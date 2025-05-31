// const bookedTickets = [
//     {
//       event: "Women's Health Workshop",
//       date: "June 15, 2025",
//       tickets: "1 General Admission",
//       ref: "CH-2025-00123"
//     }
//   ];
  
//   const forumPosts = [
//     "Looking forward to the tech workshop!",
//     "Any book suggestions for the book club?"
//   ];
  
//   function loadDashboard() {
//     const ticketContainer = document.getElementById("userTickets");
//     ticketContainer.innerHTML = "";
  
//     bookedTickets.forEach(ticket => {
//       const div = document.createElement("div");
//       div.className = "ticket-card";
//       div.innerHTML = `
//         <p><strong>Event:</strong> ${ticket.event}</p>
//         <p><strong>Date:</strong> ${ticket.date}</p>
//         <p><strong>Tickets:</strong> ${ticket.tickets}</p>
//         <p><strong>Reference:</strong> ${ticket.ref}</p>
//       `;
//       ticketContainer.appendChild(div);
//     });
  
//     const postContainer = document.getElementById("userPosts");
//     postContainer.innerHTML = "";
  
//     forumPosts.forEach(post => {
//       const div = document.createElement("div");
//       div.className = "forum-post-card";
//       div.innerHTML = `<p>${post}</p>`;
//       postContainer.appendChild(div);
//     });
//   }
  
//   document.addEventListener("DOMContentLoaded", loadDashboard);

document.addEventListener("DOMContentLoaded", () => {
  const userTickets = document.getElementById("userTickets");
  const userPosts = document.getElementById("userPosts");

  let posts = [
    "Looking forward to the tech workshop!",
    "Any book suggestions for the book club?"
  ];

  // Load temporary session tickets from the exposed global getter
  const bookings = window.getSessionBookings?.() || [];

  if (bookings.length === 0) {
    userTickets.innerHTML = "<p>No tickets booked yet.</p>";
  } else {
    bookings.forEach(ticket => {
      const div = document.createElement("div");
      div.className = "ticket-card";
      div.innerHTML = `
        <p><strong>Event:</strong> ${ticket.event}</p>
        <p><strong>Date:</strong> ${ticket.date}</p>
        <p><strong>Tickets:</strong> ${ticket.tickets}</p>
        <p><strong>Reference:</strong> ${ticket.ref}</p>
      `;
      userTickets.appendChild(div);
    });
  }

  userPosts.innerHTML = "";
  posts.forEach(post => {
    const p = document.createElement("div");
    p.className = "forum-post-card";
    p.innerHTML = `<p>${post}</p>`;
    userPosts.appendChild(p);
  });
});

document.addEventListener('DOMContentLoaded', function () {
    const userTicketsDiv = document.getElementById('userTickets');
    const bookings = JSON.parse(sessionStorage.getItem('myBookings') || '[]');

    if (!bookings.length) {
        userTicketsDiv.innerHTML = "<p>No tickets booked yet.</p>";
    } else {
        userTicketsDiv.innerHTML = bookings.map(b => `
            <div class="ticket-card">
                <h4>${b.event}</h4>
                <p><strong>Date:</strong> ${b.date}</p>
                <p><strong>Tickets:</strong> ${b.tickets}</p>
                <p><strong>Total:</strong> ${b.total}</p>
                <p><strong>Ref:</strong> ${b.ref}</p>
            </div>
        `).join('');
    }
});


