// Get form elements
const form = document.getElementById('form-resetpassword_id');
// const passwordInput = document.getElementById('password_id');
// const repeatPasswordInput = document.getElementById('repeat-password_id');

const savePasswordBtn = document.getElementById('savepassword_id');
const exitPasswordBtn = document.getElementById('exitpassword_id');

// Add event listeners
//form.addEventListener('submit', handleFormSubmit);

const togglePasswordCheckbox = document.getElementById("toggle-password-checkbox");
const passwordFields = document.querySelectorAll("input[type='password']");

togglePasswordCheckbox.addEventListener("change", function() {
    const isChecked = this.checked;
    passwordFields.forEach((field) => {
        field.type = isChecked ? "text" : "password";
    });
});

//
savePasswordBtn.addEventListener('click', function() {
 
    event.preventDefault(); 
    if (validateForm()) {
        // Form is valid, proceed with saving the password or performing other actions
        savePassword();
    };
  
});
//
exitPasswordBtn.addEventListener('click', function() {
 
    event.preventDefault(); 
    console.log('Exit password reset');
    window.close();
});

//Function to validate form inputs
function validateForm() {

  const passwordInput = document.getElementById('password_id').value;
  const repeatPasswordInput = document.getElementById('repeat-password_id').value;

  //const passwordInput = passwordInput.value.trim();
  //const repeatPasswordInput = repeatPasswordInput.value.trim();

  if (passwordInput === '' || repeatPasswordInput === '') {
    alert('Please fill in all fields');
    return false;
  }

  if (passwordInput !== repeatPasswordInput) {
    alert('Password do not match');
    return false;
  }

  return true;
}
//
function savePassword() {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const email = urlParams.get('email');
  const token = urlParams.get('token');
  const password = document.getElementById('password_id').value;
  const repeatPasswordInput = document.getElementById('repeat-password_id').value;

  // Send a request to the server to change the password
  fetch(`http://localhost:3001/resetPassword/${email}/${token}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  })
    .then((data) => {
      //console.log(data);
      password.value= '';
      repeatPasswordInput.value = '';
      alert('Password changed successfully');
      window.location.href = "../General/homePage.html";
    })
    .catch((error) => {
    //  console.error(error);
      alert("cant change password");
    });
}


