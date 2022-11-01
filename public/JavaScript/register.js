//Call List of Field
const name1 = document.getElementById('nachnameInput');
const name2 = document.getElementById('vornameInput');
const schullerID = document.getElementById('schullerID');
const password = document.getElementById('password');
const rePassword = document.getElementById('rePassword');
//End Call List of Field

const registerPageBtn = document.getElementById("signUpLogo");
const signUpPageBtn = document.getElementById("signInLogo");
const registerBtn = document.getElementById('anmeldenBtn');


registerPageBtn.addEventListener('click', ShowRegisterPage);
signUpPageBtn.addEventListener('click', ShowSignUpPage);
//registerBtn.addEventListener('click', CheckAllFillds);

function ShowRegisterPage() {
    location.href ='/register';
}

function ShowSignUpPage() {
    location.href = "/login";
}

//MAKE SURE RIGHT DATA IS INPUTED

//make sure all field are filled
/*function CheckAllFillds() {
    const listOfFields = [name1, name2, schullerID, password, rePassword];
    var submitOK = true;

    if(name1.value.length < 1)
    {
        submitOK = false;
    }
    if(name2.value.length < 1)
    {
        submitOK = false;
    }
    if(schullerID.value.length < 1)
    {
        submitOK = false;
    }
    if(password.value.length < 1)
    {
        submitOK = false;
    }
    if(rePassword.value.length < 1)
    {
        submitOK = false;
    }

    if(submitOK) {
        console.log(submitOK);
        location.href = "/login"};
};*/
