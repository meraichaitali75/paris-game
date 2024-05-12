function validateForm() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let emailError = document.getElementById("emailError");
  let passwordError = document.getElementById("passwordError");
  let successMessage = document.getElementById("successMessage");

  let valid = true;

  emailError.innerHTML = "";
  passwordError.innerHTML = "";

  if (email === "") {
    emailError.innerHTML = "Email is required";
    valid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    emailError.innerHTML = "Invalid email address";
    valid = false;
  }

  if (password === "") {
    alert(dsfsd);
    passwordError.innerHTML = "Password is required";
    valid = false;
  } else if (password.length < 6) {
    passwordError.innerHTML = "Password must contain at least one number and one uppercase and lowercase letter, and at least 6 characters";
    valid = false;
  }

  if (valid) {
    successMessage.style.display = "block";
    setTimeout(function () {
      successMessage.style.display = "none";
      document.getElementById("registrationForm").reset();
    }, 2000);
  }

  return false;
}
