
const submitContactManBtn= document.getElementById('submitcontactman_id');
const backContactManBtn= document.getElementById('returnchomepage_id');

const returnYesBtn = document.getElementById('returnmodal-yes');
const returnNoBtn = document.getElementById('returnmodal-no');

const returnModal = document.getElementById('returnmodal_id');


returnYesBtn.addEventListener('click', () => handleReturnModalChoice('yes'));
returnNoBtn.addEventListener('click', () => handleReturnModalChoice('no'));

/********************************************************************************************/
//
function resetInputFields() {
  document.getElementById("form-add").reset();
}
/********************************************************************************************/
//
submitContactManBtn.addEventListener("click", function() {
  event.preventDefault();

  if(checkInput()){
    sendDetailsToDatabase();
   //displayContactManDetails();
  }
});
//
backContactManBtn.addEventListener("click", function() {
  event.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');
  window.location.href = 'homePageAssociation.html?username=' + encodeURIComponent(username);
});

/**************************************************************************************/
// Function to open the confirmation modal
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

/****************************************************************************************/
function handleReturnModalChoice(choice) {

    if (choice === 'yes') {
      // User clicked "Yes"
      event.preventDefault(); 

      const urlParams = new URLSearchParams(window.location.search);
      const username = urlParams.get('username');
      closeReturnModal();
      window.location.href = 'homePageAssociation.html?username=' + encodeURIComponent(username);
    } else {
      // User clicked "No"
      event.preventDefault();
      resetInputFields();
      closeReturnModal();
    }
}

/********************************************************************************************/
// Add event listener to form submit button
function checkInput() {
  const fullNameField = document.getElementById("fullname_id").value;
  const phoneNumberField = document.getElementById("phonenumber_id").value;
  const repeatPhoneNumberField = document.getElementById("phonenumber-repeat_id").value;
  const roleField = document.getElementById("rule_id").value;

  // Define regex patterns for email and phone validation
  const phoneRegex = /^\d{10}$/;

  console.log("rule: ", roleField);

  // Check if all required fields are filled in
  if (fullNameField === "" || phoneNumberField === "" || repeatPhoneNumberField === "" || roleField === "") {
    // Display a warning message
    alert("Please fill in all fields");
    return false;
  }

  if (!phoneRegex.test(phoneNumberField)) {
    alert('Please enter a valid phone number (10 digits)');
    return false;
  }

  // Check if phone number and repeat phone number fields are the same
  if (phoneNumberField.value !== repeatPhoneNumberField.value) {
    // Display a warning message
    alert("Phone numbers do not match.");
    return false;
  }

  return true;
}
//
function sendDetailsToDatabase() {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('username');

  const fullNameElement = document.getElementById("fullname_id").value;
  const phoneElement = document.getElementById("phonenumber_id").value;
  const roleElement = document.getElementById("rule_id").value;

  let name = capitalizeWords(fullNameElement);

  let phone = phoneElement;

  let role = capitalizeFirstLetter(roleElement.trim());

  const registrationData = {
    name,
    phone,
    role,
    email
  };

  console.log(registrationData);
  // Send POST request to server
  fetch('http://localhost:3001/createContactMan', {
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
        //alert(data.message); // Display the message from the server
        openReturnModal();
        resetInputFields();
      }
      // Optionally, redirect to a new page
      //window.location.href = "homePageNeedy.html";
    })
    .catch(error => {
      console.log(error); // Error message
      // Handle error, e.g., display an error message
      alert("Registration failed. Please try again later.");
      //window.location.href = "registerNeedy.html";
    });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function capitalizeWords(string) {
  return string.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
}
