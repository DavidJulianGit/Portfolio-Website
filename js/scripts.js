//IIFE - validating contact form
(function () {
	// Grabbing the form and input elements by their IDs.
	let form = document.getElementById('contact-form');
	let firstName = document.querySelector('#firstname');
	let lastName = document.querySelector('#lastname');
	let phone = document.querySelector('#phonenumber');
	let email = document.querySelector('#email');
	let message = document.querySelector('#message');

	// Function to validate phone number using regex.
	function validatePhone() {
		let value = phone.value;

		if (value) {
			//regex for checking phonenumber
			const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
			let isValid = value.search(regex) > -1;

			// if value exists but is not valid according to regex -> show error message
			if (value && !isValid) {
				showErrorMessage(phone, 'Characters allowed: 0-9, + , ( , )');
			} else {
				showErrorMessage(phone, null);
			}

			return value && isValid;
		}

		return true;
	}

	// Function to validate email address.
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

	// Function to validate the entire form.
	function validateForm() {
		let isValidEmail = validateEmail();
		let isValidPhone = validatePhone();
		return isValidEmail && isValidPhone;
	}

	// Function to show error messages for invalid inputs.
	function showErrorMessage(input, message) {
		console.log(input);
		console.log(message);

		let container = input.parentNode;
		console.log(container);

		// Check and remove any existing errors
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

	// Function to show a success message after form submission.
	function showSuccessMessage(event) {
		let sucessMessage = document.createElement('div');
		sucessMessage.classList.add('success-message');
		sucessMessage.innerText = 'Thanks for getting in touch! :)';
		event.target.appendChild(sucessMessage);
		setTimeout(() => {
			event.target.removeChild(sucessMessage);
		}, 3000);
	}

	// Eventlisteners
	phone.addEventListener('input', validatePhone);
	email.addEventListener('input', validateEmail);
	form.addEventListener('submit', e => {
		e.preventDefault();
		if (validateForm()) {
			showSuccessMessage(e);
		}
	});
})();
