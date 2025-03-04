function validateForm() : boolean {
    let isValid : boolean = true;

    //Checking Name
    let name = (document.getElementById("userName") as HTMLInputElement).value;
    if(name.length < 3){
        (document.getElementById("nameError") as HTMLElement).innerText = "Name must be atleast 3 characters long.";
        isValid = false;
    }
    else {
        (document.getElementById("nameError") as HTMLElement).innerText = "";
    }


    //Checking Email
    let email = (document.getElementById("email")as HTMLInputElement).value;
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailPattern.test(email)) {
        (document.getElementById("emailError") as HTMLElement).innerText = "Enter a valid email.";
        isValid = false;
    }
    else {
        (document.getElementById("emailError") as HTMLElement).innerText = "";
    }

    //Password Validation
    let password = (document.getElementById("password") as HTMLInputElement).value;
    if(password.length < 6){
        (document.getElementById("passwordError") as HTMLElement).innerText = "Password must be at least 6 characters";
        isValid = false;
    }
    else {
        (document.getElementById("passwordError") as HTMLElement).innerText = "";
    }

    //Confirm Password Validation
    let confirmPassword  = (document.getElementById("confirmPassword") as HTMLInputElement).value;
    if(confirmPassword !== password){
        (document.getElementById("confirmPasswordError") as HTMLElement).innerText = "Passwords do not match";
        isValid = false;
    }
    else {
        (document.getElementById("confirmPasswordError") as HTMLElement).innerText = "";
    }

    //Validating Phone Number
    let phone = (document.getElementById("phone") as HTMLInputElement).value;
    let phonePattern  = /^[0-9]{10}$/;
    if(!phonePattern.test(phone)) {
        (document.getElementById("phoneError") as HTMLElement).innerText = "Enter a valid phone number";
        isValid = false;
    }
    else {
        (document.getElementById("phoneError") as HTMLElement).innerText = "";
    }

    //Age Validation
    let ageInput = (document.getElementById("age") as HTMLInputElement);
    let age: number = parseInt(ageInput.value, 10)
    if (age < 18 || age > 100) {
        (document.getElementById("ageError") as HTMLElement).innerText = "Age must be between 18 and 100.";
        isValid = false;
    } else {
        (document.getElementById("ageError") as  HTMLElement).innerText = "";
    }

    //Terms & Conditions Validation
    let terms = (document.getElementById("terms") as HTMLInputElement).checked;
    if (!terms) {
        (document.getElementById("termsError") as HTMLElement).innerText = "You must accept the terms.";
        isValid = false;
    } else {
        (document.getElementById("termsError") as HTMLElement).innerText = "";
    }


    return isValid;
}