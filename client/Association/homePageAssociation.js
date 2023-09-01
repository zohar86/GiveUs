//salect
const basicSelect = document.getElementById('userselect_id');
//const actionSelect = document.getElementById('useraction');
const informationSelect = document.getElementById('informationmenu-select_id');
const searchDonationSelect = document.getElementById('searchdonation-select_id');

//////////////////////////////////////////////////////////////////////////////////
//button
const deleteAccountYesButton = document.getElementById('delete-yes');
const deleteAccountNoButton = document.getElementById('delete-no');
const logoutBtn = document.getElementById("logout");
const chooseBasicBtn = document.getElementById("chooseselect");
const searchDonationBtn = document.getElementById("searchdonation");
const resetDonationBtn = document.getElementById("resetdonation");
const chooseInformationBtn = document.getElementById("chooseinformationmenu_id");//information


const exitAllCollectedDonation= document.getElementById('exite-btn-1_id');
const exitAllContactMan = document.getElementById('exite-btn-2_id');
const exitAllOrganization = document.getElementById('exite-btn-3_id');
const exitAllOrganizationContactMan = document.getElementById('exite-btn-4_id');
//////////////////////////////////////////////////////////////////////////////////
//fields
//const inputCitySearch= document.getElementById('inputCity').value;

////////////////////////////////////////////////////////////////////////////////////
//modal
const deleteUserModal= document.getElementById('deleteusermodal_id');
const searchDonationModal= document.getElementById('resultmodal_id');
const changeUserSettingsModal= document.getElementById('changesettingsusermodal_id');
const showCollectedModal= document.getElementById('showcollectedmodal_id');
const showAllContactManModal= document.getElementById('showallcontactmanmodal_id');
const showAllOrganizationModal= document.getElementById('showdetailsorganizationmodal_id');
const showAllContactManOrgModal= document.getElementById('showcontactmanorganiztionmodal_id');

////////////////////////////////////////////////////////////////////////////////////
//modal button
const showItemsBtn= document.getElementById('showitems_id');
const pickupDonationBtn= document.getElementById('chooseDonation_id');
const showContactManBtn= document.getElementById('showcontactman_id');
const showContactManOrgBtn= document.getElementById('showcontactmanorg-btn_id');
const refreshDonationTableBtn= document.getElementById('refreshdonationtable_id');
const cancelPickupDonationBtn= document.getElementById('cancelchooseDonation_id');
const saveSettingBtn= document.getElementById('save-yes');
const closeSettingBtn = document.getElementById('exit-no');

//////////////////////////////////////////////////////////////////////////////////
// Add event listener to the "Yes" button in the confirmation modal
deleteAccountYesButton.addEventListener('click', () => handleDeleteAccountModalChoice('yes'));
deleteAccountNoButton.addEventListener('click', () => handleDeleteAccountModalChoice('no'));

///////////////////////////////////////////////////////////////////////////////////////////
//var:
let popupWindows = [];
let popupWindow;
let tempEmail = [];
let tempStatus = [];
let associationArray = [];
let contactManArray = [];
let tempContactMan = [];
let currentAssociation;
let tempOrgEmail = [];
let tempOrgName = [];
let tempNumber = [];
let tempName;
let tempPhone;
let tempType;
let tempCity = '';
let flagRefresh = 0;
let flagDeleteOpen = 0;
let flagSettingsOpen = 0;


/////////////////////////////////////////////////////////////////////////////////////////////
//
function resetInputFields() {
  document.getElementById("inputCity").value = "";
}
//
function closePopupWindow() {
  if (popupWindow && !popupWindow.closed) {
    popupWindow.close();
  }
}
//
function scrollToModal() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}
//
function closeModals(){
  closeSearchDonationModal();
  closeShowCollectedModal();
  closeShowAllContactManModal();
  closeShowAllOrganizationModal();
  closeAllContactManOrgModal();
}

////////////////////////////////////////////////////////////////////////////////////////////
//
logoutBtn.addEventListener("click", function() {
    event.preventDefault();

    if(flagDeleteOpen === 1 || flagSettingsOpen === 1){
      return;
    }
    closePopupWindow();
    window.location.href = "../General/homePage.html";
});
//
searchDonationBtn.addEventListener("click", function() {
  event.preventDefault();

  if(flagDeleteOpen === 1 || flagSettingsOpen === 1){
    return;
  }
  let city = document.getElementById('inputCity').value.trim();
  let selectCity = document.getElementById('searchdonation-select_id');
  const selectedIndex = selectCity.selectedIndex;

  console.log("city: ", city);
  console.log("selectedindex: ", selectedIndex);

  if ((selectedIndex === -1 || selectedIndex === 0) && city === '') {
    alert("Please enter a location to search.");
    closeSearchDonationModal();
  } else if ((selectedIndex === -1 || selectedIndex === 0) && city !== '') {
    console.log("no select!");
    closeModals();
    searchDonationInDatabase(city);
  } else {
    console.log("select!");
    console.log("selectindex: ", selectedIndex.value);
    closeModals();
    city = selectCity.options[selectedIndex].text;
    if(city === "Show all donations"){
      city = "allCities";
      searchDonationInDatabase(city);
    }
    else if(city === "Donations for me"){
      city= "myDonations"
      searchDonationInDatabase(city);
    }
    else{
      searchDonationInDatabase(city);
    }
    console.log("city: ", city);
  }
  tempCity=city;
});
//
resetDonationBtn.addEventListener("click", function() {
  event.preventDefault();

  if(flagDeleteOpen === 1){
    return;
  }
  closePopupWindow();
  closeSearchDonationModal();
  resetInputFields();
  tempCity = '';
  flagRefresh = 0;

  // Reset the select element
  const selectElement = document.getElementById('searchdonation-select_id');
  selectElement.selectedIndex = -1;
});

//
showItemsBtn.addEventListener("click", function(event) {
      event.preventDefault();

      if(flagDeleteOpen === 1){
        return;
      }

      const selectedDonation = document.querySelector('input[name="donationRadio"]:checked');
      if (selectedDonation) {
        const donationNumber = selectedDonation.value;
        console.log("donation number: " + donationNumber);
        const tableBody = document.getElementById('tableDonationshow_body');
        const rows = tableBody.getElementsByTagName('tr');
        let selectedIndex = -1;
        for (let i = 0; i < rows.length; i++) {
          if (rows[i].querySelector('input[name="donationRadio"]:checked')) {
            selectedIndex = i;
            break;
          }
        }
        displaySurplusFoodPopup(donationNumber, selectedIndex);
      } else {
        console.log('No donation selected.');
        alert("No donation selected.");
      }
});
//
showContactManBtn.addEventListener("click", function(event) {
  event.preventDefault();

  if(flagDeleteOpen === 1){
    return;
  }

  const selectedDonation = document.querySelector('input[name="donationRadio"]:checked');
  if (selectedDonation) {
    const donationNumber = selectedDonation.value;
    console.log("donation number: " + donationNumber);
    const tableBody = document.getElementById('tableDonationshow_body');
    const rows = tableBody.getElementsByTagName('tr');
    let selectedIndex = -1;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].querySelector('input[name="donationRadio"]:checked')) {
        selectedIndex = i;
        break;
      }
    }
    displayContactMan(donationNumber, selectedIndex);
  } else {
    console.log('No donation selected.');
    alert("No donation selected.");
  }
});
//
pickupDonationBtn.addEventListener("click", function(event) {
    event.preventDefault();

    if(flagDeleteOpen === 1){
      return;
    }

    const selectedDonation = document.querySelector('input[name="donationRadio"]:checked');
      if (selectedDonation) {
        const donationNumber = selectedDonation.value;
        console.log("donation number: " + donationNumber);
        const tableBody = document.getElementById('tableDonationshow_body');
        const rows = tableBody.getElementsByTagName('tr');
        let selectedIndex = -1;
        for (let i = 0; i < rows.length; i++) {
          if (rows[i].querySelector('input[name="donationRadio"]:checked')) {
            selectedIndex = i;
            break;
          }
        }
        pickupDonationCollect(donationNumber, selectedIndex);
      } else {
        console.log('No donation selected.');
        alert("No donation selected.");
      }

});
//
cancelPickupDonationBtn.addEventListener("click", function(event) {
  event.preventDefault();

  if(flagDeleteOpen === 1){
    return;
  }

  const selectedDonation = document.querySelector('input[name="donationRadio"]:checked');
    if (selectedDonation) {
      const donationNumber = selectedDonation.value;
      console.log("donation number: " + donationNumber);
      const tableBody = document.getElementById('tableDonationshow_body');
      const rows = tableBody.getElementsByTagName('tr');
      let selectedIndex = -1;
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].querySelector('input[name="donationRadio"]:checked')) {
          selectedIndex = i;
          break;
        }
      }
      cancelPickupDonationCollect(donationNumber, selectedIndex);
    } else {
      console.log('No donation selected.');
      alert("No donation selected.");
    }

});
// 
refreshDonationTableBtn.addEventListener("click", function(event) {
  event.preventDefault();

  if(flagDeleteOpen === 1){
    return;
  }

  if(tempCity !== ''){
    searchDonationInDatabase(tempCity);
  }

});
saveSettingBtn.addEventListener('click', async () => {
  event.preventDefault();

  receiveEmailCheckbox = document.getElementById('email-notifications');
  receivePhoneCheckbox = document.getElementById('phone-notifications');
  notAgreeCheckbox = document.getElementById('no-notifications');

  if (notAgreeCheckbox.checked) {
    const emailAgree = 'NO';
    const phoneAgree = 'NO';
    sendToTheDatabaseTheSettings(emailAgree, phoneAgree);
    return;
  } else if(receiveEmailCheckbox.checked && receivePhoneCheckbox.checked){
    const emailAgree = 'YES';
    const phoneAgree = 'YES';
    sendToTheDatabaseTheSettings(emailAgree, phoneAgree);
  }
  else if(receiveEmailCheckbox.checked){
    const emailAgree = 'YES';
    const phoneAgree = 'NO';
    sendToTheDatabaseTheSettings(emailAgree, phoneAgree);
  }
  else if(receivePhoneCheckbox.checked){
    const emailAgree = 'NO';
    const phoneAgree = 'YES';
    sendToTheDatabaseTheSettings(emailAgree, phoneAgree);
  }
});
//
closeSettingBtn.addEventListener('click', async () => {
  event.preventDefault();
  flagSettingsOpen = 0;
  closeSettingsUserModal();
});
//
showContactManOrgBtn.addEventListener("click", function() {
  event.preventDefault();

  const selectOrg = document.querySelector('input[name="contactManOrgRadio"]:checked');
  if (selectOrg) {
    const orgNumber = selectOrg.value;
    // Update the donation count in the HTML
    const nameOrg = tempOrgName[orgNumber];
    console.log("num org: ", orgNumber);
    console.log("name org: ", nameOrg);
    console.log("name org: ", tempOrgName[orgNumber]);
    const orgCountElement = document.getElementById('organizationname_id');
    orgCountElement.textContent = `organization- ${nameOrg}`;
    closePopupWindow();
    displayContactMenOrg(orgNumber);
    //openShowAllContactManOrgModal();
  } else {
      console.log('No organization selected.');
      alert("Please select a organization to view the data");
  }
});
//
exitAllCollectedDonation.addEventListener('click', async () => {
  event.preventDefault();
  closeShowCollectedModal();
});
//
exitAllContactMan.addEventListener('click', async () => {
  event.preventDefault();
  closeShowAllContactManModal();
});
//
exitAllOrganization.addEventListener('click', async () => {
  event.preventDefault();
  closeShowAllOrganizationModal();
  closeAllContactManOrgModal();
});
//
exitAllOrganizationContactMan.addEventListener('click', async () => {
  event.preventDefault();
  closeAllContactManOrgModal();
});
// 
chooseBasicBtn.addEventListener("click", function() {
    event.preventDefault();

    if(flagDeleteOpen === 1 || flagSettingsOpen === 1){
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    const basicInput= basicSelect.value;

    switch (basicInput) {
        case "editprofile":
            window.location.href = "editUserAssociation.html?username=" + encodeURIComponent(username);
            break;
        case "settinguser":
            closeModals();
            flagSettingsOpen = 1;
            openSettingsUserModal();
            break;
        case "addcontactman":
            window.location.href = "addContactManAssociation.html?username=" + encodeURIComponent(username);
            break;
        case "editcontactman":
            window.location.href = "updateContactManAssociation.html?username=" + encodeURIComponent(username);
            break;
        case "deletacontactman":
            window.location.href = "deleteContactManAssociation.html?username=" + encodeURIComponent(username);
            break;
        case "deletAccount":
            closeModals();
            flagDeleteOpen = 1;
            openDeleteAccountModal();
            break;
        default:
            break;
    }
});
//
chooseInformationBtn.addEventListener("click", function() {
  event.preventDefault();
 
  //const urlParams = new URLSearchParams(window.location.search);
  //const username = urlParams.get('username');

  if(flagDeleteOpen === 1 || flagSettingsOpen === 1){
    return;
  }
  const informationInput= informationSelect.value;

  switch (informationInput) {
   
      case "showalldonationcollect":
          closeModals();
          openShowCollectedModal();
          showAllCollectedDonation();
          //flagModalOpen = 1;
          break;
      case "showallcontactman":
          closeModals();
          openShowAllContactManModal();
          displayContactMen();
          //flagModalOpen = 1;
          break;
      case "showallorganiztion":
          closeModals();
          //console.log("hi");
          openShowAllOrganizationModal();
          displayAllOrganization();
          //flagModalOpen = 1;
          break;
      default:
          break;
  }
});


/////////////////////////////////////////////////////////////////////////////
// Function to open the  modal
function openDeleteAccountModal() {
    if (deleteUserModal) {
        deleteUserModal.style.display = 'block';
    }
}
// Function to close the  modal
function closeDeleteAccountModal() {
    if (deleteUserModal) {
        deleteUserModal.style.display = 'none';
    }
}
//
function openSearchDonationModal() {
    if (searchDonationModal) {
        searchDonationModal.style.display = 'block';
    }
}
// Function to close the  modal
function closeSearchDonationModal() {
    if (searchDonationModal) {
        searchDonationModal.style.display = 'none';
    }
}
function openSettingsUserModal() {
  if (changeUserSettingsModal) {
      changeUserSettingsModal.style.display = 'block';
  }
}
// Function to close the thanks modal
function closeSettingsUserModal() {
  if (changeUserSettingsModal) {
      changeUserSettingsModal.style.display = 'none';
  }
}
function openShowCollectedModal() {
  if (showCollectedModal) {
    showCollectedModal.style.display = 'block';
  }
}
//Function to close the setting modal
function closeShowCollectedModal() {
  if (showCollectedModal) {
    showCollectedModal.style.display = 'none';
  } 
}
//
function openShowAllContactManModal() {
  if (showAllContactManModal) {
      showAllContactManModal.style.display = 'block';
  }
}
//Function to close the setting modal
function closeShowAllContactManModal() {
  if (showAllContactManModal) {
      showAllContactManModal.style.display = 'none';
  } 
}
//
function openShowAllOrganizationModal() {
  if (showAllOrganizationModal) {
      showAllOrganizationModal.style.display = 'block';
  }
}
//Function to close the setting modal
function closeShowAllOrganizationModal() {
  if (showAllOrganizationModal) {
      showAllOrganizationModal.style.display = 'none';
  } 
}
//
function openShowAllContactManOrgModal() {
  if (showAllContactManOrgModal) {
      showAllContactManOrgModal.style.display = 'block';
  }
}
//Function to close the setting modal
function closeAllContactManOrgModal() {
  if (showAllContactManOrgModal) {
      showAllContactManOrgModal.style.display = 'none';
  } 
}
//////////////////////////////////////////////////////////////////////////////////////////
//
function handleDeleteAccountModalChoice(choice) {

    if (choice === 'yes') {
      // User clicked "Yes"
      event.preventDefault();
      deleteAccountFromDatabase();
      closeDeleteAccountModal();
    } else {
      // User clicked "No"
      event.preventDefault();
      // Close the confirmation modal
      flagDeleteOpen = 0;
      closeDeleteAccountModal();
    }
}

//////////////////////////////////////////////////////////////////////////////////////////
//
function displayUser() {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('username');
   
    // Send a GET request to the server to fetch user details based on the email
    fetch(`http://localhost:3001/displayUser?email=${encodeURIComponent(email)}`)
      .then(response => response.json())
      .then(data => {
        // Handle the user details data and display it on the page
        const userFullName = data.name;
        const userEmail = data.email;
        const userPhoneNumber = data.phoneNumber;
        const userAddress = data.address;
        const userCity = data.city;
        const userType = data.type;
  
        currentAssociation = userFullName;
        tempName = userFullName;
        tempPhone = userPhoneNumber;
        tempType = userType;

        document.getElementById('user-name').textContent = userFullName;
        document.getElementById('user-email').textContent = userEmail;
        document.getElementById('user-phone').textContent = userPhoneNumber;
        document.getElementById('user-address').textContent = userAddress +" "+ userCity;
        document.getElementById('user-type').textContent = userType;
      })
      .catch(error => {
        console.log(error);
        // Handle error, e.g., display an error message on the page
        //document.getElementById('error').textContent = 'An error occurred. Please try again later.';
      });
}
//
function deleteAccountFromDatabase(){
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('username');
  
    fetch(`http://localhost:3001/deleteUser?email=${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
    })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          closeDeleteAccountModal();
          closePopupWindow();
          window.location.href = "../General/homePage.html";
        })
        .catch(error => {
          console.log(error); // Error message
          // Handle error, e.g., display an error message
          alert("An error occurred. Please try again later.");
        });
}
//
function pickupDonationCollect(num, index) {

  if (tempStatus[index] === "Not Available") {
    alert("The donation is not available");
    return;
  }

  const email = tempEmail[index];
  const association = currentAssociation;
  
  const status = "Not Available";

  const registrationData = {
    num,
    email,
    association,
    status
  };
  // Send a POST request to update the donation collect
  fetch('http://localhost:3001/updateDonationCollect', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationData)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.message); // Log the response message from the server
      alert(data.message);
      searchDonationInDatabase(tempCity);
    })
    .catch(error => {
      console.log("Error updating donation collect:", error);
      alert("Error updating donation collect. Please try again.");
    });
}
//
function cancelPickupDonationCollect(num, index) {

  if (associationArray[index] !== currentAssociation) {
    alert("The donation is not available");
    return;
  }

  const email = tempEmail[index];
  const association = null;
  const status = "Available";
  const rejected = "YES";
  const dateRejected = new Date();

  let dateTime = new Date();
  const month = dateTime.getMonth() + 1; // Adding 1 to get the correct month index
  const day = dateTime.getDate();
  const year = dateTime.getFullYear();
  const hour = dateTime.getHours();
  const minute = dateTime.getMinutes();
  
  const dateRejectedString = `${day}/${month}/${year}, ${hour}:${minute.toString().padStart(2, '0')}` //${period}`;
  
  const registrationData = {
    num,
    email,
    association,
    rejected,
    dateRejected,
    dateRejectedString,
    status
  };
  // Send a POST request to update the donation collect
  fetch('http://localhost:3001/updateDonationNotCollect', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationData)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.message); // Log the response message from the server
      alert(data.message);
      searchDonationInDatabase(tempCity);
    })
    .catch(error => {
      console.log("Error updating donation collect:", error);
      alert("Error updating donation collect. Please try again.");
    });
}
//
function displaySurplusFoodPopup(num, index) {

    // const urlParams = new URLSearchParams(window.location.search);
    // const email = urlParams.get('username');
    popupWindows.forEach(window => {
      if (!window.closed) {
        window.close();
      }
    });
    popupWindows = [];
    
    const email = tempEmail[index];
    const type = "Large Organization"
    // Generate the content for the popup
    let popupContent = '<div class="popup-window">';
    //popupContent += '<h3>Surplus Food Items</h3>';
    popupContent += `<h3>Surplus Food Items - Donation ${index + 1}</h3>`;
    popupContent += '<hr>';
  
    // Make an HTTP request to fetch the donation items from the server
    fetch(`http://localhost:3001/getDonationItemsByEmailAndNumberAndType?email=${encodeURIComponent(email)}&type=${encodeURIComponent(type)}&num=${encodeURIComponent(num)}`)
      .then(response => response.json())
      .then(data => {
        // Check if donation items data exists and is an array
        if (Array.isArray(data.food)) {
          data.food.forEach((item, index) => {
            popupContent += `<p><strong>Item ${index + 1}</strong></p>`;
            popupContent += `<p>Food Type: ${item.foodType}</p>`;
            popupContent += `<p>Quantity: ${item.quantity} ${item.unit}</p>`;
            popupContent += `<hr>`;
          });
        } else {
          popupContent += '<p>No surplus food items available for this donation.</p>';
        }
  
        popupContent += '</div>';
  
        // Open a new window with the popup content
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const popupWidth = 400;
        const popupHeight = 600;
        const leftPosition = (screenWidth - popupWidth) / 8;
        const topPosition = (screenHeight - popupHeight) / 3;
  
        const cssStyle = '<link rel="stylesheet" type="text/css" href="popup.css"/>';
  
        popupWindow = window.open('', 'Surplus Food Items', `width=${popupWidth},height=${popupHeight},left=${leftPosition},top=${topPosition},scrollbars=yes`);
        popupWindow.document.write(`<html><head><title>Surplus Food Items</title>${cssStyle}</head><body>${popupContent}</body></html>`);
        popupWindows.push(popupWindow);

        tempPopup = popupWindow;
      })
      .catch(error => {
        console.log('Error fetching donation items:', error);
      });
}
//
function displayContactMan(num, index_arr) {
  const email = tempEmail[index_arr];

  let nameOfContact = tempContactMan[index_arr];  
  console.log("temp: " + nameOfContact);
  console.log("email: " + email);
  let popupContent = '<div class="popup-window">';
  popupContent += `<h3>Contact Man Details - Donation ${index_arr + 1}</h3>`;
  popupContent += '<hr>';

  // Send a GET request to the server to fetch user details based on the email
  fetch(`http://localhost:3001/getContactMan?email=${encodeURIComponent(email)}&nameOfContact=${encodeURIComponent(nameOfContact)}`)
  .then(response => response.json())
    .then(data => {
      // Handle the user details data and display it on the page
      if (Array.isArray(data.contactMan)) {
        data.contactMan.forEach((contact, index) => {
          popupContent += `<p><strong>Contact Man ${index + 1}</strong></p>`;
          popupContent += `<p>Name: ${contact.name}</p>`;
          popupContent += `<p>Phone: ${contact.phone}</p>`;
          popupContent += `<p>Rule: ${contact.rule}</p>`;
          popupContent += `<hr>`;
        });
      } else {
        popupContent += '<p>No contacts available.</p>';
      }

      popupContent += '</div>';

      // Open a new window with the popup content
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const popupWidth = 400;
      const popupHeight = 600;
      const leftPosition = (screenWidth - popupWidth) / 8;
      const topPosition = (screenHeight - popupHeight) / 3;

      const cssStyle = '<link rel="stylesheet" type="text/css" href="popup.css"/>';

      const popupWindow = window.open('', 'Contact Man', `width=${popupWidth},height=${popupHeight},left=${leftPosition},top=${topPosition},scrollbars=yes`);
      popupWindow.document.write(`<html><head><title>Contact Man</title>${cssStyle}</head><body>${popupContent}</body></html>`);
      popupWindows.push(popupWindow);
    })
    .catch(error => {
      console.log('Error fetching contact man:', error);
    });
}
//
function sendToTheDatabaseTheSettings(emailAgree, phoneAgree){

  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('username');

  const name = tempName;
  const phone = tempPhone;
  const type = tempType;

  //const date = now.Date();

  const registrationData = {
    name,
    email,
    phone,
    type,
    emailAgree,
    phoneAgree
  };
  //const queryParams = new URLSearchParams(registrationData).toString();

  // Send a GET request to the server to update user settings
  fetch('http://localhost:3001/updateNotification', {
      method: 'POST',
      //mode: 'cors', // Add this line
      //mode: 'no-cors',
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
          receiveEmailCheckbox.checked = false;
          receivePhoneCheckbox.checked = false;
          notAgreeCheckbox.checked = false;
          closeSettingsUserModal();
          flagSettingsOpen = 0;
          alert(data.message); // Display the message from the server
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
function searchDonationInDatabase(city) {
  const type = "Large Organization";

  let i = 0;
  let lineNum = 1;
  let j = 1;
  association= currentAssociation;
 
  fetch(`http://localhost:3001/getDonationDetailsByCityAndType?city=${encodeURIComponent(city)}&type=${encodeURIComponent(type)}&association=${encodeURIComponent(association)}`)
    .then(response => response.json())
    .then(data => {
      const table = document.getElementById('tableDonationshow_id');
      const tableBody = document.getElementById('tableDonationshow_body');

      // Clear existing table body content
      tableBody.innerHTML = '';

      if (Array.isArray(data.donations)) {
        data.donations.forEach(donationDetails => {
          const row = tableBody.insertRow();
          const radioCell = row.insertCell();
          const NumCell = row.insertCell(); // Add line number cell
          const nameCell = row.insertCell();
          const locationCell = row.insertCell();
          const dateCell = row.insertCell();
          const associationCell = row.insertCell();
          const phoneCell = row.insertCell(); // Add phone cell
          const statusCell = row.insertCell();
          const itemsCell = row.insertCell();
          const timeLifeCell =row.insertCell();

          

          const radioInput = document.createElement('input');
          radioInput.type = 'radio';
          radioInput.name = 'donationRadio';
          radioInput.value = donationDetails.num;
          radioCell.appendChild(radioInput);

          //nameCell.textContent = donationDetails.num;
          NumCell.textContent = lineNum++; // Assign line number
          nameCell.textContent = donationDetails.name;
          dateCell.textContent = donationDetails.date;
          locationCell.textContent = donationDetails.location;
          associationCell.textContent = donationDetails.association;
          statusCell.textContent = donationDetails.status;
          phoneCell.textContent = donationDetails.phone; // Assign phone value
          itemsCell.textContent = donationDetails.numItems;
          //timeLifeCell.textContent = 0;

          tempEmail[i] = donationDetails.email;
          tempStatus[i] = donationDetails.status;
          associationArray[i] = donationDetails.association;
          tempContactMan[i] = donationDetails.nameOfContact;
          tempNumber[donationDetails.num] = j++;
          // Apply style for matching association
          if (donationDetails.association === currentAssociation) {
            row.classList.add('current-association');
          }
          i++;
          openSearchDonationModal();
          
          scrollToModal();

          const createdAt = new Date(donationDetails.createdAt);
          const lifetimeHours = 24; // Assuming 24-hour lifetime

          function updateTimer() {
            const now = new Date();
            const elapsedMilliseconds = now - createdAt;
            const remainingMilliseconds = lifetimeHours * 60 * 60 * 1000 - elapsedMilliseconds;

            if (remainingMilliseconds <= 0) {
              timeLifeCell.innerHTML = 'Expired.<br>Call to organization.';
              timeLifeCell.classList.add('expired'); // Add CSS class for styling
              radioInput.disabled = true; // Disable the radio button

            } else {
              const remainingSeconds = Math.floor(remainingMilliseconds / 1000);
              const hours = Math.floor(remainingSeconds / 3600);
              const minutes = Math.floor((remainingSeconds % 3600) / 60);
              const seconds = remainingSeconds % 60;
              timeLifeCell.textContent = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
              setTimeout(updateTimer, 1000);
            }
          }

          updateTimer();
        });
      } else {
        console.log('No donation data available.');
      }
    })
    .catch(error => {
      console.log(error);
    });
}
//all donation wad collcted
function showAllCollectedDonation() {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('username');

  let lineNum = 1;
  //let i = 1;
  console.log("current: ", currentAssociation);
  // Fetch the donation data from the server based on the user's email
  fetch(`http://localhost:3001/getAllDeleteDonationByAssociation?association=${encodeURIComponent(currentAssociation)}`)
    .then(response => response.json())
    .then(data => {
      //const table = document.getElementById('tableDonationshow_id');
      const tableBody = document.getElementById('tablecollectedshow_body');

      // Clear existing table body content
      tableBody.innerHTML = '';

      // Check if donations data exists and is an array
      if (Array.isArray(data.donations)) {
        // Create table rows and populate with data
        data.donations.forEach(donationDetails => {
          const row = tableBody.insertRow();
          //const radioCell = row.insertCell();
          const numCell = row.insertCell();
          const dateCreateCell = row.insertCell();
          const dateDeleteCell = row.insertCell();
          const locationCell = row.insertCell();
          const associationCell = row.insertCell();
          //const statusCell = row.insertCell();
          const itemsCell = row.insertCell();
          const reasonCell = row.insertCell();

          /* const radioInput = document.createElement('input');
          radioInput.type = 'radio';
          radioInput.name = 'donationRadio';
          radioInput.value = donationDetails.num;
          radioCell.appendChild(radioInput); */

          //numCell.textContent = donationDetails.num;
          numCell.textContent = lineNum++;
          dateCreateCell.textContent = donationDetails.dateMade;
          dateDeleteCell.textContent = donationDetails.dateDelete;
          locationCell.textContent = donationDetails.location;
          associationCell.textContent = donationDetails.association;
          //statusCell.textContent = donationDetails.status;
          itemsCell.textContent = donationDetails.numItems;
          reasonCell.textContent = donationDetails.delivered;
          //openShowCollectedModal();
          scrollToModal();
        });
      } else {
        console.log('No donation data available.');
        closeShowCollectedModal();
      }
    })
    .catch(error => {
      console.log(error);
    });
}
//
function displayContactMen() {

  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('username');

  console.log("email: ", email);
  let lineNum = 1;
  // Fetch the contact men data from the server
  fetch(`http://localhost:3001/getAllContactMan?email=${encodeURIComponent(email)}`)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('tablecontactmanshow_body');

      //console.log("data: ", data);
      // Clear existing table body content
      tableBody.innerHTML = '';
      if (Array.isArray(data.contactMen)) {
        // Create table rows and populate with data
        data.contactMen.forEach(contactManDetails => {
          const row = tableBody.insertRow();
          //const radioCell = row.insertCell();
          const numCell = row.insertCell();
          const nameCell = row.insertCell();
          const phoneCell = row.insertCell();
          const ruleCell = row.insertCell();
         
          // const radioInput = document.createElement('input');
          // radioInput.type = 'radio';
          // radioInput.name = 'donationRadio';
          // radioInput.value = donationDetails.num;
          // radioCell.appendChild(radioInput);

          numCell.textContent = lineNum++;
          nameCell.textContent = contactManDetails.name;
          phoneCell.textContent = contactManDetails.phone;
          ruleCell.textContent = contactManDetails.role;
       
          scrollToModal();
        });
      } else {
        console.log('No contact man available.');
        closeShowAllContactManModal();
      }
    })
    .catch(error => {
      console.log(error);
    });
}
//
function displayAllOrganization() {
  
  type = "Large Organization"
  let index = 0;
  let lineNum = 1;
  let i = 0

  // Fetch the contact men data from the server
  fetch(`http://localhost:3001/getUsersByType?type=${encodeURIComponent(type)}`)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('tableorganozationshow_body');

      // Clear existing table body content
      tableBody.innerHTML = '';
      if (Array.isArray(data.users)) {
        // Create table rows and populate with data
        data.users.forEach(userOrganization=> {
          const row = tableBody.insertRow();
          const radioCell = row.insertCell();
          const lineNumCell = row.insertCell();
          const nameCell = row.insertCell();
          const emailCell = row.insertCell();
          const phoneCell = row.insertCell();
          const addressCell = row.insertCell();
          
          const radioInput = document.createElement('input');
          radioInput.type = 'radio';
          radioInput.name = 'organizationRadio';
          radioInput.value = index++;
          radioCell.appendChild(radioInput);

          lineNumCell.textContent = lineNum++; // Assign line number
          nameCell.textContent = userOrganization.name;
          emailCell.textContent = userOrganization.email;
          phoneCell.textContent = userOrganization.phone;
          addressCell.textContent = userOrganization.address +" "+ userOrganization.city;
       
          tempOrgEmail[i] = userOrganization.email;
          tempOrgName[i] = userOrganization.name;
          i++;
          openShowAllOrganizationModal();
          scrollToModal();
        });
      } else {
        console.log('No organization available.');
        closeShowAllOrganizationModal()
      }
    })
    .catch(error => {
      console.log(error);
    });
}
//
function displayContactMenOrganization(index) {

  let linenum = 1;
  const email = tempAssociationEmail[index];
  
  // Fetch the contact men data from the server
  fetch(`http://localhost:3001/getAllContactMan?email=${encodeURIComponent(email)}`)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('tableorganizationscontactmanshow_body');

      // Clear existing table body content
      tableBody.innerHTML = '';
      if (Array.isArray(data.contactMen)) {
        // Create table rows and populate with data
        data.contactMen.forEach(contactManDetails => {
          const row = tableBody.insertRow();
          //const radioCell = row.insertCell();
          const numCell = row.insertCell();
          const nameCell = row.insertCell();
          const phoneCell = row.insertCell();
          const ruleCell = row.insertCell();
         
          // const radioInput = document.createElement('input');
          // radioInput.type = 'radio';
          // radioInput.name = 'donationRadio';
          // radioInput.value = donationDetails.num;
          // radioCell.appendChild(radioInput);

          numCell.textContent = linenum++;
          nameCell.textContent = contactManDetails.name;
          phoneCell.textContent = contactManDetails.phone;
          ruleCell.textContent = contactManDetails.role;
       
          scrollToModal();
        });
      } else {
        console.log('No contact man available.');
      }
    })
    .catch(error => {
      console.log(error);
    });
}
//donation was collcted
/* function showAllDeleteDonation() {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('username');

  let lineNum = 1;
  const association = currentAssociation;
  // Fetch the donation data from the server based on the user's email
  fetch(`http://localhost:3001/getAllDeleteDonation?association=${encodeURIComponent(association)}`)
    .then(response => response.json())
    .then(data => {
      //const table = document.getElementById('tableDonationshow_id');
      const tableBody = document.getElementById('tableDeleteDonationshow_body');

      // Clear existing table body content
      tableBody.innerHTML = '';

      // Check if donations data exists and is an array
      if (Array.isArray(data.donations)) {
        // Create table rows and populate with data
        data.donations.forEach(donationDetails => {
          const row = tableBody.insertRow();
          //const radioCell = row.insertCell();
          const numCell = row.insertCell();
          const dateCreateCell = row.insertCell();
          const dateDeleteCell = row.insertCell();
          const locationCell = row.insertCell();
          const associationCell = row.insertCell();
          const statusCell = row.insertCell();
          const itemsCell = row.insertCell();
          const reasonCell = row.insertCell();

          const radioInput = document.createElement('input');
          radioInput.type = 'radio';
          radioInput.name = 'donationRadio';
          radioInput.value = donationDetails.num;
          radioCell.appendChild(radioInput); 

          //numCell.textContent = donationDetails.num;
          numCell.textContent = lineNum++;
          dateCreateCell.textContent = donationDetails.dateMade;
          dateDeleteCell.textContent = donationDetails.dateDelete;
          locationCell.textContent = donationDetails.location;
          associationCell.textContent = donationDetails.association;
          statusCell.textContent = donationDetails.status;
          itemsCell.textContent = donationDetails.numItems;
          reasonCell.textContent = donationDetails.delivered;
       
          //openShowAllContactManAssociationModal();
          scrollToModal();
        });
      } else {
        console.log('No donation data available.');
      }
    })
    .catch(error => {
      console.log(error);
    });
} */
//
function displayContactMen() {

  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('username');

  console.log("email: ", email);
  let numline = 1;
  // Fetch the contact men data from the server
  fetch(`http://localhost:3001/getAllContactMan?email=${encodeURIComponent(email)}`)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('tablecontactmanshow_body');

      //console.log("data: ", data);
      // Clear existing table body content
      tableBody.innerHTML = '';
      if (Array.isArray(data.contactMen)) {
        // Create table rows and populate with data
        data.contactMen.forEach(contactManDetails => {
          const row = tableBody.insertRow();
          //const radioCell = row.insertCell();
          const numCell = row.insertCell();
          const nameCell = row.insertCell();
          const phoneCell = row.insertCell();
          const ruleCell = row.insertCell();
         
          // const radioInput = document.createElement('input');
          // radioInput.type = 'radio';
          // radioInput.name = 'donationRadio';
          // radioInput.value = donationDetails.num;
          // radioCell.appendChild(radioInput);

          numCell.textContent = numline++;
          nameCell.textContent = contactManDetails.name;
          phoneCell.textContent = contactManDetails.phone;
          ruleCell.textContent = contactManDetails.rule;
       
          openShowAllContactManModal();
          scrollToModal();
        });
      } else {
        console.log('No contact man available.');
        closeShowAllContactManModal();
      }
    })
    .catch(error => {
      console.log(error);
    });
}
//
function displayAllOrganization() {
  
  type = "Large Organization"
  let index = 0;
  let lineNum = 1;
  let i = 0

  // Fetch the contact men data from the server
  fetch(`http://localhost:3001/getUsersByType?type=${encodeURIComponent(type)}`)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('tableorganozationshow_body');

      // Clear existing table body content
      tableBody.innerHTML = '';
      if (Array.isArray(data.users)) {
        // Create table rows and populate with data
        data.users.forEach(userOrg => {
          const row = tableBody.insertRow();
          const radioCell = row.insertCell();
          const lineNumCell = row.insertCell();
          const nameCell = row.insertCell();
          const emailCell = row.insertCell();
          const phoneCell = row.insertCell();
          const addressCell = row.insertCell();
          
          const radioInput = document.createElement('input');
          radioInput.type = 'radio';
          radioInput.name = 'contactManOrgRadio';
          radioInput.value = index++;
          radioCell.appendChild(radioInput);

          lineNumCell.textContent = lineNum++; // Assign line number
          nameCell.textContent = userOrg.name;
          emailCell.textContent = userOrg.email;
          phoneCell.textContent = userOrg.phone;
          addressCell.textContent = userOrg.address +" "+ userOrg.city;
       
          tempOrgEmail[i] = userOrg.email;
          tempOrgName[i] = userOrg.name;
          i++;
          
          scrollToModal();
        });
      } else {
        console.log('No association available.');
      }
    })
    .catch(error => {
      console.log(error);
    });
}
//
function displayContactMenOrg(index) {

  let linenum = 1;
  const email = tempOrgEmail[index];
  
  // Fetch the contact men data from the server
  fetch(`http://localhost:3001/getAllContactMan?email=${encodeURIComponent(email)}`)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('tableorganizationcontactmanshow_body');

      // Clear existing table body content
      tableBody.innerHTML = '';
      if (Array.isArray(data.contactMen)) {
        // Create table rows and populate with data
        data.contactMen.forEach(contactManDetails => {
          const row = tableBody.insertRow();
          //const radioCell = row.insertCell();
          const numCell = row.insertCell();
          const nameCell = row.insertCell();
          const phoneCell = row.insertCell();
          const ruleCell = row.insertCell();
         
          // const radioInput = document.createElement('input');
          // radioInput.type = 'radio';
          // radioInput.name = 'donationRadio';
          // radioInput.value = donationDetails.num;
          // radioCell.appendChild(radioInput);

          numCell.textContent = linenum++;
          nameCell.textContent = contactManDetails.name;
          phoneCell.textContent = contactManDetails.phone;
          ruleCell.textContent = contactManDetails.rule;
          openShowAllContactManOrgModal();
          scrollToModal();
        });
      } else {
        console.log('No contact man available.');
        closeAllContactManOrgModal();
      }
    })
    .catch(error => {
      console.log(error);
    });
}
//
function displayAllCity() {
  const type = "Large Organization";

  // Fetch the contact men data from the server based on the user's organization
  fetch(`http://localhost:3001/getAllCityByType?type=${encodeURIComponent(type)}`)
    .then(response => response.json())
    .then(data => {
      const selectElement = document.getElementById('searchdonation-select_id');

      // Clear any existing options
      selectElement.innerHTML = '';

      // Add default options
      const defaultOptions = [
        { value: '', text: '' },
        { value: 'allCities', text: 'Show all donations' },
        { value: 'myDonations', text: 'Donations for me' }
      ];

      defaultOptions.forEach(option => {
        const defaultOption = document.createElement('option');
        defaultOption.value = option.value;
        defaultOption.textContent = option.text;
        selectElement.appendChild(defaultOption);
      });

      // Add options for each city
      data.cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        selectElement.appendChild(option);
      });
    })
    .catch(error => {
      console.log(error);
      // Handle error, e.g., display an error message on the page
      // document.getElementById('error').textContent = 'An error occurred. Please try again later.';
    });
}


/***********************************************END**************************************************/
























//var chooseActionBtn = document.getElementById("chooseaction-btn");
    
/*chooseActionBtn.addEventListener("click", function() {
    event.preventDefault();
   
    const actionInput= actionSelect.value;

    switch (actionInput) {
        case "adddonation":
            window.location.href = "addgNewDonationLargeOrg.html";
            break;
        case "updatedonation":
            window.location.href = "updateDonationLargeOrg.html";
            break;
        case "deletedonation":
            window.location.href = "deleteDonationLargeOrg.html";
            break;

        case "":
            window.location.href = ".html";
            break;
        case "deletAccount":
            window.location.href = ".html";
            break; 

        default:
            break;
    }
});*/

