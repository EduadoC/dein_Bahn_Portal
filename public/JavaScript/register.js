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
registerBtn.addEventListener('click', ValidateInput);

function ShowRegisterPage() {
    location.href ='/register';
}

function ShowSignUpPage() {
    location.href = "/login";
}

//MAKE SURE RIGHT DATA IS INPUTED

//make sure all field are filled
function ValidateInput() {
    const inputsList = [
        document.getElementById('nachnameInput').value,//0
        document.getElementById('vornameInput').value,//1
        document.getElementById('schullerID').value,//2
        document.getElementById('password').value,//3
        document.getElementById('rePassword').value//4
    ]

    const errorHolder = document.getElementById('error');


    //check if all inputs have been field and if Schuller id is log enough and password are the same and long enough
    if(inputsList[0].length < 1 || inputsList[1].length < 1 || inputsList[2].length < 1 || inputsList[3].length < 1 || inputsList[4].length < 1) {
        registerBtn.setAttribute('type', 'button');
        errorHolder.innerHTML = "All Fields must be field";
        return;
    }else if (inputsList[2].length < 8 ) {
        registerBtn.setAttribute('type', 'button');
        errorHolder.innerHTML = "SchullerID must be 8 character or longer";
        return;
    }else if(inputsList[3] != inputsList[4] || inputsList[3].length <= 6) {
        registerBtn.setAttribute('type', 'button');
        errorHolder.innerHTML = "Password must match, and longer than 6 charachters"
        return;
    }else {
        registerBtn.setAttribute('type', 'submit');
    }

};
