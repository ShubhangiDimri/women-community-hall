// Modal logic
const loginModal = document.getElementById("login-modal");
const loginBtn = document.getElementById("login-btn");
const closeBtns = document.querySelectorAll(".close");

if (loginBtn && loginModal) {
  loginBtn.addEventListener("click", () => {
    loginModal.style.display = "flex";
  });
}

// closeBtns.forEach(btn => {
//   btn.onclick = () => {
//     btn.closest(".modal").style.display = "none";
//   };
// });

document.querySelectorAll('.modal .close').forEach(btn => {
  btn.onclick = function() {
    this.closest('.modal').style.display = 'none';
  };
});

const closeLoginSuccessBtn = document.getElementById("close-login-success-btn");
if (closeLoginSuccessBtn) {
  closeLoginSuccessBtn.onclick = function() {
    document.getElementById("login-success-popup").style.display = "none";
  };
}

window.onclick = function(event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};

// Login/signup toggle
const showSignup = document.getElementById("show-signup");
const showLogin = document.getElementById("show-login");

if (showSignup && showLogin) {
  showSignup.onclick = () => {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
  };
  showLogin.onclick = () => {
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
  };
}



const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    // ...your login logic here...

    // Show login success popup
    document.getElementById("login-success-popup").style.display = "flex";
    // Optionally, close the login modal
    document.getElementById("login-modal").style.display = "none";
  });
}

