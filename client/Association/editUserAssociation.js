const passwordInput = document.getElementById('pwd_id');
const toggleButton = document.getElementById('toggleButton');

const repeatPasswordInput= document.getElementById("pwd-repeat_id")
const toggleButtonRepeat = document.getElementById('toggleButtonRepeat');

//button
const submitButton = document.getElementById('submitchange');
const backButton = document.getElementById('returnhomepage');

//modal
const returnModal = document.getElementById('returnmodal_id');
const confirmModal = document.getElementById('confirmodal_id');

//modal button
const confirmYesBtn = document.getElementById('confirmodal-yes');
const confirmNoBtn = document.getElementById('confirmodal-no');
const returnYesBtn = document.getElementById('return-yes');


// Add event listener to the "Yes" button in the confirmation modal
confirmYesBtn.addEventListener('click', () => handleConfirmModalChoice('yes'));
// Add event listener to the "No" button in the confirmation modal
confirmNoBtn.addEventListener('click', () => handleConfirmModalChoice('no'));

returnYesBtn.addEventListener('click', () => handleReturnModalChoice('back'));
//returnNoBtn.addEventListener('click', () => handleReturnModalChoice('no'));
////////////////////////////////////////////////////////////////////////////
//var:
let newEmail = '';
let oldEmail = '';
//////////////////////////////////////////////////////////////////////
//
function resetInputFields() {
  document.getElementById("form-edit_id").reset();
}

/////////////////////////////////////////////////////////////////////////
//
backButton.addEventListener("click", function() {
  event.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');

  resetInputFields();
  window.location.href = 'homePageAssociation.html?username=' + encodeURIComponent(username);
});
//
submitButton.addEventListener("click", function() {
  event.preventDefault();

  if(checkInput()){
    openConfirmModal();
  }
});

////////////////////////////////////////////////////////////////////////////////////
// Function to open the confirmation modal
function openConfirmModal() {
  if (confirmModal) {
    confirmModal.style.display = 'block';
  }
}
// Function to close the thanks modal
function closeConfirmModal() {
  if (confirmModal) {
    confirmModal.style.display = 'none';
  }
}
//
function openReturnModal() {
  if (returnModal) {
      returnModal.style.display = 'block';
  }
}
// Function to close the thanks modal
function closeReturnModal() {
  if (returnModal) {
      returnModal.style.display = 'none';
  }
}
///////////////////////////////////////////////////////////////////
//
function handleConfirmModalChoice(choice) {

  if (choice === 'yes') {
    // User clicked "Yes"
    event.preventDefault();
    sendDetailsToDatabase();
    closeConfirmModal();
  } 
  else {
    // User clicked "No"
    event.preventDefault();
    // Close the confirmation modal
    closeConfirmModal();
  } 
}
//
function handleReturnModalChoice(choice) {

  if (choice === 'back') {
    // User clicked "Yes"
    event.preventDefault(); 
    const urlParams = new URLSearchParams(window.location.search);
    let username = urlParams.get('username');
    if(newEmail !== oldEmail){
      username=newEmail;
    }
    closeReturnModal();
    resetInputFields();
    window.location.href = 'homePageAssociation.html?username=' + encodeURIComponent(username);

  }
}

/////////////////////////////////////////////////////////////////////////////////
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
//
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
///////////////////////////////////////////////////////////////////////
//
function checkInput() {

  // Prevent form from submitting
    event.preventDefault();
  // Get all form fields
   
    const emailField = document.getElementById("email_id");
    const repeatEmailField = document.getElementById("email-repeat_id");
    const phoneNumberField = document.getElementById("phonenumber_id");
    const repeatPhoneNumberField = document.getElementById("phonenumber-repeat_id");
    const addressField = document.getElementById("address_id");
    const cityField = document.getElementById("city_id");
    const passwordField = document.getElementById("pwd_id");
    const repeatPasswordField = document.getElementById("pwd-repeat_id");

    let minNumberofChars = 4;
    let maxNumberofChars = 8;

// Define regex patterns for email and phone validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    //const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{4,8}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{4,8}$/;

  // Check if all required fields are filled in
    if (emailField.value === "" && repeatEmailField.value === "" &&
        phoneNumberField.value === "" && repeatPhoneNumberField.value === "" && addressField.value === "" &&
        cityField.value === "" && passwordField.value === "" && repeatPasswordField.value === "") {
        // Display a warning message
      alert("What details would you like to change?");
      return false;
    }
    if ((emailField.value === "" && repeatEmailField.value !== "") || (emailField.value !== "" && repeatEmailField.value === "")){
      alert("Please fill in both email fields.");
      return false;
    }
  
    if ((phoneNumberField.value === "" && repeatPhoneNumberField.value !== "") || (phoneNumberField.value !== "" && repeatPhoneNumberField.value === "")) {
      alert("Please fill in both phone number fields.");
      return false;
    }
  
    if ((passwordField.value === "" && repeatPasswordField.value !== "") ||(passwordField.value !== "" && repeatPasswordField.value === "")) {
      alert("Please fill in both password fields.");
      return false;
    }
  
    if(emailField.value === "" && repeatEmailField.value !== ""){
      alert("Also fill in the email field");
      return false;
    }
    if(emailField.value !== ""){
      if (!emailRegex.test(emailField.value)) {
          alert('Please enter a valid email address');
          console.log(emailField.value)
          return false;
      }
      // Check if email and repeat email fields are the same
      if (emailField.value !== repeatEmailField.value) {
          // Display a warning message
          alert("Emails do not match.");
          return false;
      }
    }
    if(phoneNumberField.value !== ""){
      if (!phoneRegex.test(phoneNumberField.value)) {
          alert('Please enter a valid phone number (10 digits)');
          return false;
      }
      // Check if phone number and repeat phone number fields are the same
      if (phoneNumberField.value !== repeatPhoneNumberField.value) {
          // Display a warning message
          alert("Phone numbers do not match.");
          return false;
      }
    }
    /* if(passwordField.value !== ""){
      if(passwordField.value.length < minNumberofChars || passwordField.value.length > maxNumberofChars){
          alert("The password must contain between 4 and 8 characters.")
          return false;
      }
      // Check if password meets criteria
      if (!passwordRegex.test(passwordField.value)) {
          alert("The password must contain at least one letter, one number, one special character! ");
          return false;
      }
      if (passwordField.value !== repeatPasswordField.value) {
        alert("Passwords do not match.");
        return false;
      }  
  }*/
  return true;
  //alert("The change was made successfully")
}
//
function sendDetailsToDatabase() {
  const urlParams = new URLSearchParams(window.location.search);
  let email = urlParams.get('username');

  // Send GET request to retrieve user details
  fetch(`http://localhost:3001/getUsers?email=${encodeURIComponent(email)}`)
    .then((response) => response.json())
    .then((data) => {
      // Process the retrieved user details
      console.log("User Details:", data);
      const name = data.name;
      //email= data.email;
      let phone= data.phone;
      let address= data.address;
      let city = data.city;
      let password = data.password;
      let type = data.type;

      // Check if user details are available
      oldEmail = email;
      newEmail = document.getElementById("email_id").value;
      if (newEmail !== '') {
        email = newEmail;
      }
      else{
        newEmail=oldEmail;
      }
      let newPhone = document.getElementById("phonenumber_id").value;
      if (newPhone !== '') {
        phone = newPhone;
       
      }
      let newAddress = document.getElementById("address_id").value;
      if (newAddress !== '') {
        address = newAddress;
      }
      let newCity = document.getElementById("city_id").value;
      if (newCity !== '') {
          city = capitalizeFirstLetter(newCity);
      }
      let newPassword = document.getElementById("pwd_id").value;
      if (newPassword !== '') {
          password = newPassword;
      }

      const registrationData = {
        name,
        email,
        oldEmail,
        phone,
        address,
        city,
        password,
        type
      };
      
      // Send POST request to update user details
      fetch('http://localhost:3001/updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
      })
        .then(response => response.json())
        .then(data => {
          // Handle success response
          if (data.message) {
            // Display success message and perform any other necessary actions
            openReturnModal();
            resetInputFields();
          }
      })
      .catch(error => {
        console.log(error); // Error message
        // Handle error, e.g., display an error message
        alert("Update failed. Please try again later.");
      });
    })
    .catch(error => {
      console.log(error); // Error message
      // Handle error, e.g., display an error message
      alert("Failed to retrieve user details. Please try again later.");
    });
}
//
function capitalizeFirstLetter(string) {
  const words = string.split(' ');
  const capitalizedWords = words.map(word => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1);
    return firstLetter + restOfWord;
  });
  return capitalizedWords.join(' ');
}

/*************************************END**********************************/