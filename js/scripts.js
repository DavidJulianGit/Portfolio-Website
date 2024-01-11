//IIFE - validating contact form
(function (){
    let form = document.getElementById("contact-form");
    
    let firstName = document.querySelector("#firstname");
    let lastName = document.querySelector("#lastname");
    let phone = document.querySelector("#phonenumber");
    let email = document.querySelector("#email");
    let message = document.querySelector("#message");

  

    function validatePhone() {

        let value = phone.value;

        if(value)
        {
            //regex for checking phonenumber
            const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            let isValid = value.search(regex) > -1;
            
            // if value exists but is not valid according to regex -> show error message
            if(value && !isValid) 
            {
                showErrorMessage(phone, "No spaces, characters allowed: 0-9,+,(,)");
            }
            else{
                showErrorMessage(phone, null); 
            }

            return value && isValid;
        }
       
        return true;
    }

    function validateEmail() {
        let value = email.value;
      
        if (!value) {
          showErrorMessage(email, 'Email is a required field.');
          return false;
        }
      
        if (value.indexOf('@') === -1) {
          showErrorMessage(email, 'You must enter a valid email address.');
          return false;
        }
      
        if (value.indexOf('.') === -1) {
          showErrorMessage(email, 'You must enter a valid email address.');
          return false;
        }
      
      
        showErrorMessage(email, null);
        return true;
    }

    function validateForm() {
        let isValidEmail = validateEmail();
        let isValidPhone = validatePhone();
        return isValidEmail && isValidPhone;
    }

    function showErrorMessage(input, message) {
        
        console.log(input)
        console.log(message)

        let container = input.parentNode;
        console.log(container)
        // Check and Remove any existing errors
        let error = container.querySelector('.error-message');
        
        if (error) {
          container.removeChild(error);
        }
      
        // Now add the error if the message isn’t empty
        if (message) {
          let error = document.createElement('div');
          error.classList.add('error-message');
          error.innerText = message;
          container.appendChild(error);
        }
      }
    function showSuccessMessage(event)
    {
        let sucessMessage = document.createElement("div");
        sucessMessage.classList.add("success-message");
        sucessMessage.innerText = "Thanks for getting in touch! :)"
        event.target.appendChild(sucessMessage);
        setTimeout(() => {event.target.removeChild(sucessMessage)},3000);
    }
    phone.addEventListener("input",validatePhone);
    email.addEventListener("input",validateEmail);
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Do not submit to the server
        if (validateForm()) {
        showSuccessMessage(e);
        }
    });
})();

