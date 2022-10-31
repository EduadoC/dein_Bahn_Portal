const registerBtn = document.getElementById("signUpLogo");
const signUpBtn = document.getElementById("signInLogo");

registerBtn.addEventListener('click', ShowRegisterPage);
signUpBtn.addEventListener('click', ShowSignUpPage);

    function ShowRegisterPage() {
        location.href = "/register";
    }

    function ShowSignUpPage() {
        //Remember to add here the SignUp Page
        location.href = "/login";
    }