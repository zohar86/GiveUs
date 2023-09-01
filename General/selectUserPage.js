
//form
const form = document.querySelector('.form-wrap');
//select
const select = document.getElementById('userselect_id');
//button
const chooseUserBtn= document.getElementById('chooseuser');



chooseUserBtn.addEventListener('click', function(event) {
  event.preventDefault(); // prevent default form submission behavior

  const selectedValue = select.value;

  // set redirect URL based on selected value
  switch (selectedValue) {
    case 'large organization':
     window.location.href = "../LargeOrg/registerLargeOrg.html";
      break;
    case 'small organization':
     window.location.href =  "../SmallOrg/registerSmallOrg.html";
      break;
    case 'association':
     window.location.href = "../Association/registerAssociation.html";
      break;
    case 'private needy':
     window.location.href = "../Needy/registerNeedy.html";
      break;
    default:
      console.error('Invalid selection');
      return;
  }
});
