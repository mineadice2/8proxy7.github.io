var currentUser = null;

// Go back to login page
function goBackToLogin() {
  window.location.href = "login.html";
}

// Check if user is logged in
function checkLogin() {
    // Existing code ...

    // Rest of your existing code ...
}

// Rest of your existing functions ...

// Add event listener for Shift + T key combination
document.addEventListener('keydown', function(event) {
  if (event.shiftKey && event.code === 'KeyT') {
    // If user is logged in, go back one page, otherwise go back to login page
    if (currentUser !== null) {
      goBack();
    } else {
      goBackToLogin();
    }
  }
});

// Call checkLogin function on page load
window.onload = checkLogin;

// Check if user is logged in
function checkLogin() {
    if (localStorage.getItem("currentUser") !== null) {
        currentUser = JSON.parse(localStorage.getItem("currentUser"));
        // Show logged in user's name
        document.getElementById("user-name").textContent = currentUser.name;
        // Show website functionality
        document.getElementById("website-container").style.display = "block";
    } else {
        // Hide website functionality
        document.getElementById("website-container").style.display = "none";
        // Show login form
        document.getElementById("login-form").style.display = "block";
    }
}

// User login function
function login() {
    var username = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;

    // Check if user exists and passwords match
    var users = JSON.parse(localStorage.getItem("users"));
    var userExists = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].username == username && users[i].password == password) {
            currentUser = users[i];
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            userExists = true;
            break;
        }
    }

    // Show logged in user's name and website functionality
    if (userExists) {
        document.getElementById("user-name").textContent = currentUser.name;
        document.getElementById("website-container").style.display = "block";
        document.getElementById("login-form").style.display = "none";
    } else {
        alert("Invalid username/password");
    }
}

// User signup function
function signup() {
    var name = document.getElementById("signup-name").value;
    var username = document.getElementById("signup-username").value;
    var password = document.getElementById("signup-password").value;

    // Check if the username already exists
    var users = JSON.parse(localStorage.getItem("users"));
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            alert("Username already taken. Please choose a different username.");
            return;
        }
    }

    // Add new user to local storage
    var newUser = {name: name, username: username, password: password};
    if (users === null) {
        users = [];
    }
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Login new user
    currentUser = newUser;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Show logged in user's name and website functionality
    document.getElementById("user-name").textContent = currentUser.name;
    document.getElementById("website-container").style.display = "block";
    document.getElementById("signup-form").style.display = "none";
}

// User logout function
function logout() {
    localStorage.removeItem("currentUser");
    currentUser = null;
    checkLogin();
}

// Call checkLogin function on page load
window.onload = checkLogin;

// Website functionality
const form = document.getElementById('website-form');
const websiteInput = document.getElementById('website');
const websiteContainer = document.getElementById('website-container');
const fullscreenBtn = document.getElementById('fullscreen-btn');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    websiteContainer.innerHTML = `<iframe src="${websiteInput.value}"></iframe>`;
});

fullscreenBtn.addEventListener('click', function() {
    const iframe = document.querySelector('#website-container iframe');
    if(iframe) {
        if(iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if(iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
        } else if(iframe.msRequestFullscreen) {
            iframe.msRequestFullscreen();
        }
    }
});

document.addEventListener('keydown', function(e) {
    if(e.shiftKey && e.which == 73) {
        window.open('index.html');
    }
});

// Add event listener to custom button 1
document.getElementById("custom-btn1").addEventListener("click", function() {
    var iframe = document.createElement("iframe");
    iframe.src = "https://bandit.rip/"; // Replace with URL of embedded page
    document.getElementById("website-container").innerHTML = '';
    document.getElementById("website-container").appendChild(iframe);
});

// Add event listener to custom button 2
document.getElementById("custom-btn2").addEventListener("click", function() {
    var iframe = document.createElement("iframe");
    iframe.src = "https://www.bing.com/"; // Replace with URL of embedded page
    document.getElementById("website-container").innerHTML = '';
    document.getElementById("website-container").appendChild(iframe);
});
