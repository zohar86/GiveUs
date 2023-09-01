//button
const registerBtn = document.getElementById("register_id");

const passwordInput = document.getElementById('pwd_id');
const toggleButton = document.getElementById('toggleButton');


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

const repeatPasswordInput= document.getElementById("pwd-repeat_id")
const toggleButtonRepeat = document.getElementById('toggleButtonRepeat');

toggleButtonRepeat.addEventListener('click', function() {
    // Toggle the type attribute of the password input
    if (repeatPasswordInput.type === 'password') {
      repeatPasswordInput.type = 'text';
      toggleButtonRepeat.textContent = 'Hide';
      toggleButtonRepeat.src= "../Images/eye-open.png"
    } else {
      repeatPasswordInput.type = 'password';
      toggleButtonRepeat.textContent = 'Show';
      toggleButtonRepeat.src= "../Images/eye-close.png"
    }
});

// Add event listener to the toggle button
registerBtn.addEventListener("click", function() {
  event.preventDefault();

   // Get all form fields
  const fullNameElement = document.getElementById("Fullname_id").value.trim();
  const email = document.getElementById("Email_id").value.trim();
  const phone = document.getElementById("PhoneNumber_id").value.trim();
  const address = document.getElementById("Address_id").value.trim();
  const cityElement = document.getElementById("City_id").value.trim();
  const password = document.getElementById("pwd_id").value.trim();
  const type = document.getElementById("type").value.trim();

  let fullName = fullNameElement;
  const name = fullName.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

  const tempCity = cityElement;
  const city = tempCity.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

  let emailAgree = "YES";
  let phoneAgree = "YES";

  if(checkFields()){
    const registrationData = {
      name,
      email,
      phone,
      address,
      city,
      password,
      type
    };
   // console.log(JSON.stringify(registrationData))
  
    // Send POST request to server
  fetch('http://localhost:3001/createUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registrationData)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Registration response from the server
      // Handle success response, e.g., display a success message
      if (data.message) {
        alert(data.message); // Display the message from the server
      }

      const registrationData1 = {
        name,
        email,
        phone,
        type,
        emailAgree,
        phoneAgree
      };
      // Send a GET request to the server to update user settings
      fetch('http://localhost:3001/updateNotification', {
        method: 'POST',
        //mode: 'cors', // Add this line
        //mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData1)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data); // Registration response from the server
          // Handle success response, e.g., display a success message
          // Optionally, redirect to a new page
          window.location.href = "../General/homePage.html";
        })
        .catch(error => {
          console.log(error); // Error message
          // Handle error, e.g., display an error message
          //alert("Registration failed. Please try again later.")
        });
          // Optionally, redirect to a new page
          window.location.href = "../General/homePage.html";
        })
    .catch(error => {
      console.log(error); // Error message
      // Handle error, e.g., display an error message
      //alert("Registration failed. Please try again later.");
      //window.location.href = "registerNeedy.html";
    });
  }
}); 

// Add event listener to form submit button
function checkFields(){

  // Get all form fields
  const fullName = document.getElementById("Fullname_id").value.trim();
  const email = document.getElementById("Email_id").value.trim();
  const repeatemail = document.getElementById("RepeatEmail_id").value.trim();
  const phone = document.getElementById("PhoneNumber_id").value.trim();
  const repeatphone = document.getElementById("RepeatPhoneNumber_id").value.trim();
  const addressField = document.getElementById("Address_id").value.trim();
  const cityField = document.getElementById("City_id").value.trim();
  const passwordField = document.getElementById("pwd_id").value.trim();
  const repeatPasswordField = document.getElementById("pwd-repeat_id").value.trim();

  let minNumberofChars = 4;
  let maxNumberofChars = 8;

    //console.log(email.value)
    //console.log(passwordField.value)
    
// Define regex patterns for email and phone validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;
  //const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{4,8}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{4,8}$/;

  // Check if all required fields are filled in
  /* if (fullName.value === "" || email.value === "" || repeatemail.value === "" ||
      phone.value === "" || repeatphone.value === "" || addressField.value === "" ||
      cityField.value === "" || passwordField.value === "" || repeatPasswordField.value === "") {
        // Display a warning message
      alert("Please fill in all required fields.");
      return false;
  } */
  
   // Check if all required fields are filled in
   if (fullName === "" || email === "" || repeatemail === "" ||
   phone === "" || repeatphone === "" || addressField === "" ||
   cityField === "" || passwordField === "" || repeatPasswordField === "") {
     // Display a warning message
      alert("Please fill in all required fields.");
      return false;
  }
  if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      //console.log(email.value)
      return false;
  }
  // Check if email and repeat email fields are the same
  if (email !== repeatemail) {
      // Display a warning message
      alert("Emails do not match.");
      return false;
  }
  if (!phoneRegex.test(phone)) {
      alert('Please enter a valid phone number (10 digits)');
      return false;
  }
    // Check if phone number and repeat phone number fields are the same
  if (phone !== repeatphone) {
      // Display a warning message
      alert("Phone numbers do not match.");
      return false;
  }
  /*if(passwordField.value.length < minNumberofChars || passwordField.value.length > maxNumberofChars){
      alert("The password must contain between 4 and 8 characters.")
      return false;
  }
  // Check if password meets criteria
  if (!passwordRegex.test(passwordField.value)) {
      alert("The password must contain at least one letter, one number, one special character! ");
      return false;
  } */
  if (passwordField !== repeatPasswordField) {
    alert("Passwords do not match.");
    return false;
  } 
  return true;  
}
