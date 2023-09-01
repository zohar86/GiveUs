     
//fields
const phoneNumberField = document.getElementById("phonenumber_id");
const repeatPhoneNumberField = document.getElementById("phonenumber-repeat_id");
const roleField = document.getElementById("rule_id");
     
///////////////////////////////////////////////////////////////////////////
//form
const formUpDate = document.querySelector(".form-update-modal");
const formDisplayDetails = document.getElementById('details_id');

//////////////////////////////////////////////////////////////////////
//select
const pickUpContactMan = document.getElementById('contactman-select_id');

/////////////////////////////////////////////////////////////////////////////////
//modal
const updateContactManModal = document.getElementById('updatecontactman_id');
const returnModal = document.getElementById('returnmodal_id');

///////////////////////////////////////////////////////////////////////////////////////////////
//modal button
const returnYesButton = document.getElementById('return-yes');
const returnNoButton = document.getElementById('return-no');

/////////////////////////////////////////////////////////////////////////////////////
//main button
const showBtn = document.getElementById('choosecontact');
const resetBtn = document.getElementById("reset");
const backBtn = document.getElementById("backhome");

//confirm update button
const submitUpDate = document.getElementById("submitupdate");
const closeUpdate = document.getElementById("closeupdate_id");

//button
returnYesButton.addEventListener('click', () => handleReturnModalChoice('yes'));
returnNoButton.addEventListener('click', () => handleReturnModalChoice('no'));

///////////////////////////////////////////////////////////////////////////////////////
//var
const emailUser='';

let selectedContactManName = '';
let nameContactMan='';
let phoneContactMan='';
let roleContactMan='';

let flagUpdateOpen = 0;
/***********************************************************************************************************************/
//
function scrollToModal() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

//////////////////////////////////////////////////////////////////////////////////////////
//
backBtn.addEventListener("click", function() {
  event.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');
  flagUpdateOpen = 0;
  window.location.href = "homePageAssociation.html?username=" + encodeURIComponent(username);
});
//show details of contact man
showBtn.addEventListener("click", function() {
  event.preventDefault();

  if(flagUpdateOpen === 0){
    flagUpdateOpen = 1;
    openUpDateModal();
    displayContactManDetails()
  }
  else{
    alert("You are in the process of updating contact man details");
  }

});
//remove dateils 
resetBtn.addEventListener("click", function() {
  event.preventDefault();

  if(flagUpdateOpen === 1){
    alert("You are in the process of updating contact man details");
    return;
  }
  resetFormFields();
  closeUpDateModal();
  let selectElement = document.getElementById('contactman-select_id');
  selectElement.selectedIndex = -1;
});
//confirm update
submitUpDate.addEventListener("click", function() {
   event.preventDefault();

   if(checkFields()){
    sendDetailsToDatabase();
   }
});
//close update
closeUpdate.addEventListener("click", function() {
  event.preventDefault();

  flagUpdateOpen = 0;
  closeUpDateModal();
});

/////////////////////////////////////////////////////////////////////////////////////
//
function resetFormFields() {
  document.getElementById('user-name').textContent = '';
  document.getElementById('user-phone').textContent = '';
  document.getElementById('user-rule').textContent = '';
  let selectElement = document.getElementById('contactman-select_id');
  selectElement.selectedIndex = -1;
}
//
function resetFieldsUpDate(){
  document.getElementById('phonenumber_id').value = '';
  document.getElementById('phonenumber-repeat_id').value = '';
  document.getElementById('rule_id').value = '';
}

//////////////////////////////////////////////////////////////////////////////////////////
//
function openUpDateModal() {
  if (updateContactManModal) {
    updateContactManModal.style.display = 'block';
  }
}
function closeUpDateModal() {
  if (updateContactManModal) {
    updateContactManModal.style.display = 'none';
  }
}

function openReturnModal() {
  if (returnModal) {
    returnModal.style.display = 'block';
  }
}

function closeReturnModal() {
  if (returnModal) {
    returnModal.style.display = 'none';
  }
}

////////////////////////////////////////////////////////////////////////////////////////
//
function handleUpDateModalChoice(choice) {
  if (choice === 'open') {
    // User clicked "Yes"
    event.preventDefault();
    openUpDateModal();
    
  } else {
    // User clicked "No"
    event.preventDefault();
    // Reset the form fields
    resetFormFields();
    closeUpDateModal();
  }
}
//
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
    flagUpdateOpen = 0;
    closeReturnModal();
    resetFormFields();
    closeUpDateModal();
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////  
// Add event listener to form submit button
function checkFields(){

  // Get all form fields
  //Define regex patterns for email and phone validation
  const phoneRegex = /^\d{10}$/;

  // Check if all required fields are filled in
  if (phoneNumberField.value === "" && repeatPhoneNumberField.value === "" && ruleField.value === "") {
    // Display a warning message
      alert("Please fill in the fields you want to change");
      return false;
  } 
  if(phoneNumberField.value !== repeatPhoneNumberField.value) {
      // Display a warning message
      alert("Phone numbers do not match.");
      return false;
  }
  if (!phoneRegex.test(phoneNumberField.value)) {
      alert('Please enter a valid phone number (10 digits)');
       return false;
  }

  return true;
}
// Function to handle form submission and update contact man details
function sendDetailsToDatabase() {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('username');

  const name = nameContactMan;

  let phone = document.getElementById("phonenumber_id").value;
  if (phone === ' ') {
    phone = phoneContactMan;
  }

  let role = document.getElementById("rule_id").value;
  if (role === '') {
    role = ruleContactMan;
  } else {
    role = capitalizeFirstLetter(role);
  }

  const registrationData = {
    name,
    phone,
    role,
    email
  };

  // Send POST request to server
  fetch('http://localhost:3001/updateContactMan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registrationData)
  })
    .then(response => response.json())
    .then(data => {
      // Registration response from the server
      // Handle success response, e.g., display a success message
      if (data.message) {
        //alert(data.message); // Display the message from the server
        //displayContactManDetails();
        openReturnModal();
        closeUpDateModal();
        resetFieldsUpDate();
        resetFormFields();
        const selectElement = document.getElementById('contactman-select_id');
        selectElement.selectedIndex = -1;
        flagUpdateOpen = 0;
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
//
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
//
function displayContactManDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('username');

  const selectElement = document.getElementById('contactman-select_id');
  const selectedIndex = selectElement.selectedIndex;
  const name = selectElement.options[selectedIndex].text; // Get the selected name from the select element

  if(name === '')
    return false;

  fetch(`http://localhost:3001/displayContactMan?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`)
    .then(response => response.json())
    .then(data => {
      const userFullName = data.fullName;
      const userPhoneNumber = data.phoneNumber;
      const userRole = data.role;

      document.getElementById('user-name').textContent = userFullName;
      document.getElementById('user-phone').textContent = userPhoneNumber;
      document.getElementById('user-rule').textContent = userRole;

      nameContactMan=userFullName;
      phoneContactMan=userFullName;
      roleContactMan=userRule;
      scrollToModal();

    })
    .catch(error => {
      console.log(error);
      alert("An error occurred. Please try again later.");
    });
    return true;
}
//
function selectShowUpContactMan() {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('username');
  
  // Fetch the contact men data from the server based on the user's organization
  fetch(`http://localhost:3001/contactManSelect?email=${encodeURIComponent(email)}`)
    .then(response => response.json())
    .then(data => {
      const selectElement = document.getElementById('contactman-select_id');
      
      // Clear any existing options
      selectElement.innerHTML = '';
      
      // Add a default empty option
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = '';
      selectElement.appendChild(defaultOption);
      
      // Add options for each contact man
      data.contactMen.forEach(contactMan => {
        const option = document.createElement('option');
        option.value = contactMan.id;
        option.textContent = contactMan.name;
        selectElement.appendChild(option);
      });
    })
    .catch(error => {
      console.log(error);
      // Handle error, e.g., display an error message on the page
      // document.getElementById('error').textContent = 'An error occurred. Please try again later.';
    });
}
/***************************************END**************************************************/