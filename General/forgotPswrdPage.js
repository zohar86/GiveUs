//buttons
const sendEmailBtn =  document.getElementById('submitmail_id');
const okBtn = document.getElementById('okmessage_id');
const backHomePageBtn = document.getElementById('backmomepage_id');

//modal
const messageModal = document.getElementById('messagemodal_id');

//fields
const emailField = document.getElementById("email_id");

/*********************************************************************************************/
okBtn.addEventListener('click', () => handleReturnModalChoice('ok'));


/********************************************************************************************/
// Check if email is valid
function isValidEmail() {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailField.value);
}

function resetInputFields() {
    document.getElementById("form-forgot_id").reset();
    console.log("reset!");
}

/******************************************************************************************/
//
backHomePageBtn.addEventListener('click', function() {
  event.preventDefault(); 
  window.location.href = '../General/homePage.html';
});
/******************************************************************************************/
//
sendEmailBtn.addEventListener('click', function() {
  event.preventDefault(); 

  if(isValidEmail()){
      sendLinkToEmail();
      //resetInputFields();
  }
  else{
      alert("Invalid email");
  }
});

/*****************************************************************************************/
//
function openMessageModal() {
    if (messageModal) {
        messageModal.style.display = 'block';
    }
}
// Function to close the thanks modal
function closeMessageModal() {
    if (messageModal) {
        messageModal.style.display = 'none';
    }
}
/****************************************************************************************/
//
function handleReturnModalChoice(choice) {

    if (choice === 'ok') {
      // User clicked "Yes"
      event.preventDefault(); 
      closeMessageModal();
      window.location.href = '../General/homePage.html';
  
    }
}

/**************************************************************************************/
//
function sendLinkToEmail() {
  const email = document.getElementById('email_id').value;

  console.log("email: " + email);

  // First request to get user details
  fetch(`http://localhost:3001/getUsers?email=${encodeURIComponent(email)}`)
    .then(response => response.json())
    .then(data => {

      const name = data.name;
      const phone = data.phone;
      const address = data.address;
      const city = data.city;
      const password = data.password;
      const type = data.type;

      const registrationData = {
        name,
        email,
        phone,
        address,
        city,
        password,
        type
    };
  
      // Second request to send email
      fetch('http://localhost:3001/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      })
        .then(response => response.json())
        .then(data => {
          console.log("data: ", data.message); // Success message or error response from the server
          openMessageModal();
        })
        .catch(error => {
          console.log('Error:', error);
        });
    })
    .catch(error => {
      console.log('Error:', error);
    });
}
