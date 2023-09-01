//button
const showBtn = document.getElementById('choosecontact_id');
const resetBtn = document.getElementById("reset_id");
const backBtn = document.getElementById("backhome_id");
const deleteContactManBtn = document.getElementById("deletecontactman_id");  

////////////////////////////////////////////////////////////////////////////////////////
//form
const formDisplayDetails = document.getElementById('form-details');
const formDeleteContactMan = document.getElementById('form-deletecontactman');

///////////////////////////////////////////////////////////////////////////////////////////////
//select
const pickUpContactMan = document.getElementById('contactmanselect_id');

///////////////////////////////////////////////////////////////////////////////////////////////
//modal
const deleteContactManModal = document.getElementById('deletcontactmanmodal_id');
const returnModal = document.getElementById('returnmodal_id');

////////////////////////////////////////////////////////////////////////////////////
//button modal
const deleteYesButton = document.getElementById('delete-yes');
const deleteNoButton = document.getElementById('delete-no');
//
const returnYesButton = document.getElementById('return-yes');
const returnNoButton = document.getElementById('return-no');

//////////////////////////////////////////////////////////////////////////////////////
//
deleteYesButton.addEventListener('click', () => handleDeleteContactManModalChoice('yes'));
deleteNoButton.addEventListener('click', () => handleDeleteContactManModalChoice('no'));
//
returnYesButton.addEventListener('click', () => handleReturnModalChoice('yes'));
returnNoButton.addEventListener('click', () => handleReturnModalChoice('no'));

////////////////////////////////////////////////////////////////////////////////////////
//var
let flag =0 ;
let flagDeleteOpen = 0;
let flagShowContactMan = 0;

///////////////////////////////////////////////////////////////////////////////////
//
function resetFormFields() {
  //document.getElementById('.form-details').reset();
  document.getElementById('user-name').textContent = "";
  document.getElementById('user-phone').textContent = "";
  document.getElementById('user-rule').textContent = "";    
  const selectElement = document.getElementById('contactmanselect_id');
  selectElement.selectedIndex = -1;
}
//////////////////////////////////////////////////////////////////////////////////////////
//button action
backBtn.addEventListener("click", function() {
  event.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');
  closeDeleteContactManModal();
  flagDeleteOpen = 0;
  window.location.href = 'homePageAssociation.html?username=' + encodeURIComponent(username);
  
});
//
showBtn.addEventListener("click", function() {
  event.preventDefault();
  if(flagDeleteOpen === 1){
    //alert("Close the deletion window");
    return;
  }
  displayContactManDetails();
  flag = 1;
  
});
//
resetBtn.addEventListener("click", function() {
  event.preventDefault();

  if(flagDeleteOpen === 1){
    //alert("Close the deletion window");
    return;
  }
  resetFormFields();
  flag = 0;
});
//
deleteContactManBtn.addEventListener("click", function() {
  event.preventDefault();
  if(flagShowContactMan === 0){
    return;
  }
  if (flagDeleteOpen === 0) {
    const selectElement = document.getElementById('contactmanselect_id');
    const selectedIndex = selectElement.selectedIndex;
    
    if (selectedIndex === -1) {
      alert("Please select a contact man before deleting.");
      return; // Stop execution if no contact man is selected
    }
    
    const contactManName = selectElement.options[selectedIndex].text;
    
    document.getElementById('contactManName').textContent = contactManName;
    openDeleteContactManModal();
    flagDeleteOpen = 1;
  } else {
    alert("Close the deletion window");
  }
});


///////////////////////////////////////////////////////////////////////////////////
//
function openDeleteContactManModal() {
  if (deleteContactManModal) {
    deleteContactManModal.style.display = 'block';
  }
}
function closeDeleteContactManModal() {
  if (deleteContactManModal) {
    deleteContactManModal.style.display = 'none';
  }
}
//
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

/////////////////////////////////////////////////////////////////////////////////////
//
function handleDeleteContactManModalChoice(choice) {

  if (choice === 'yes') {
    // User clicked "Yes"
    event.preventDefault();
    closeDeleteContactManModal();
    deleteContactMan();
    resetFormFields();
    
  } else {
    // User clicked "No"
    event.preventDefault();
    closeDeleteContactManModal();
    flagDeleteOpen = 0;
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
    flagDeleteOpen = 0;
    flagShowContactMan = 0;
    closeReturnModal();
    resetFormFields();
  }
}

///////////////////////////////////////////////////////////////////////////////////////
function selectShowUpContactMan() {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('username');
  
  // Fetch the contact men data from the server based on the user's organization
  fetch(`http://localhost:3001/contactManSelect?email=${encodeURIComponent(email)}`)
    .then(response => response.json())
    .then(data => {
      const selectElement = document.getElementById('contactmanselect_id');
      
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
// Function to fetch contact man details from the database and display them on the screen
function displayContactManDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('username');

  const selectElement = document.getElementById('contactmanselect_id');
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
      roleContactMan=userRole;

    })
    .catch(error => {
      console.log(error);
      alert("An error occurred. Please try again later.");
    });
    return true;
}
// Function to handle form submission and update contact man details
function deleteContactMan() {

  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('username');

  const selectElement = document.getElementById('contactmanselect_id');
  const selectedIndex = selectElement.selectedIndex;
  const name = selectElement.options[selectedIndex].text; 

  const registrationData = {
    name,
    email
  };
  //Send POST request to server
  fetch('http://localhost:3001/deleteContactMan', {
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
        if (data.delete) {
          flagShowContactMan = 0;
          flagDeleteOpen = 0;
          openReturnModal();
          resetFormFields();
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
  openReturnModal();
}
/*******************************END*********************************************************/