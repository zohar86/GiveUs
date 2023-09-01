/* var https = require('https');
https.globalAgent.options.secureProtocol = 'SSLv3_method'; */

const loginBtn = document.getElementById("login");

const passwordInput = document.getElementById('pwd');
const toggleButton = document.getElementById('toggleButton');

/*************************************************************************/
//
// Check if email is valid
function isValidEmail() {

  let email = document.getElementById("username_id").value;

  email= email.trim();
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);

}
// Add event listener to the toggle button
toggleButton.addEventListener('click', function() {
  // Toggle the type attribute of the password input
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleButton.textContent = 'Hide';
    toggleButton.src= "../Images/eye-open.png"
  } else {
    passwordInput.type = 'password';
    toggleButton.textContent = 'Show';
    toggleButton.src= "../Images/eye-close.png"
  }
});


// Add event listener to the login button
loginBtn.addEventListener('click', function() {
 
  event.preventDefault(); 

  let email = document.getElementById("username_id").value;
  let password = document.getElementById("pwd").value;

  email= email.trim();
  // heck if all required fields are filled in
  if (email === "" || password === "") {
     // Display a warning message
      alert("Please fill in all required fields.");
      return false;
  }
  if(isValidEmail()){
      loginUser();
  }
});

function loginUser() {
  // Get the value of the username and password fields
  let email = document.getElementById("username_id").value;
  let password = document.getElementById("pwd").value;
  
  email = email.trim();
   
  //Send POST request to server to check user existence
  fetch('http://localhost:3001/loginUser', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => response.json())
    .then(data => {
      const username = data.email; // Use the correct variable name: username

      // Handle response based on user existence
      if (data.exists) {
        // User exists, open the respective homepage based on the value
        if (data.type === "Large Organization") {
          window.location.href = "../LargeOrg/homePageLargeOrg.html?username=" + encodeURIComponent(username);
        } else if (data.type === "Small Organization") {
          window.location.href = "../SmallOrg/homePageSmallOrg.html?username=" + encodeURIComponent(username);
        } else if (data.type === "Association") {
          window.location.href = "../Association/homePageAssociation.html?username=" + encodeURIComponent(username);
        } else if (data.type === "Private needy") {
          window.location.href = "../Needy/homePageNeedy.html?username=" + encodeURIComponent(username);
        } else {
          // Handle other user types or display an error message
          alert("Invalid user type. Please contact support.");
        }
      } else if(data.message === "Incorrect"){
        alert(data.message)
      }
      else{
        alert(data.message);
      }
        // User does not exist, display an error message
        
      
    })
    .catch(error => {
      console.log(error); // Error message
      // Handle error, e.g., display an error message
      alert("An error occurred. Please try again later.");
    });     
} 