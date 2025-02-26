function validateForm() {
    let isValid = true;

    //Checking Name
    let name = document.getElementById("userName").value;
    if(name.length < 3){
      document.getElementById("nameError").innerText = "Name must be at least 3 characters long.";
      isValid = false;
    }
    else {
        document.getElementById("nameError").innerText = "";
    }

    //Checking Email
    let email = document.getElementById("email").value;
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailPattern.test(email)) {
        document.getElementById("emailError").innerText = "Enter a valid email.";
        isValid = false;
    }
    else {
        document.getElementById("emailError").innerText = "";
    }

    //Password Validation
    let password = document.getElementById("password").value;
    if(password.length < 6){
        document.getElementById("passwordError").innerText = "Password must be at least 6 characters";
        isValid = false;
    }
    else {
        document.getElementById("passwordError").innerText = "";
    }

    //Confirm Password Validation
    let confirmPassword = document.getElementById("confirmPassword").value;
    if(confirmPassword !== password){
        document.getElementById("confirmPasswordError").innerText = "Passwords do not match";
        isValid = false;
    }
    else {
        document.getElementById("confirmPasswordError").innerText = "";
    }

    //Validating Phone Number
    let phone = document.getElementById("phone").value;
    let phonePattern = /^[0-9]{10}$/;
    if(!phonePattern.test(phone)) {
        document.getElementById("phoneError").innerText = "Enter a valid phone number";
        isValid = false;
    }
    else {
        document.getElementById("phoneError").innerText = "";
    }

    // Age Validation
    let age = document.getElementById("age").value;
    if (age < 18 || age > 100) {
        document.getElementById("ageError").innerText = "Age must be between 18 and 100.";
        isValid = false;
    } else {
        document.getElementById("ageError").innerText = "";
    }

    // Terms & Conditions Validation
    let terms = document.getElementById("terms").checked;
    if (!terms) {
        document.getElementById("termsError").innerText = "You must accept the terms.";
        isValid = false;
    } else {
        document.getElementById("termsError").innerText = "";
    }

    return isValid;
}

 