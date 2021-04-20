/* start sign up part */


//inputs feilds
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

//error message when all inputs is empty
var errorMessage = document.querySelector('.errorMessage');

var passwordValidation = document.getElementById('passwordValidation');

//sign up button
var signUpBtn = document.getElementById('signUpBtn');

//user object
var user = {};

//array of users
var listOfUsers = [];

//this is a variable store which field is exist
var whichField;


// stored users
var currentUsers = JSON.parse(localStorage.getItem('usersList'));

if (currentUsers != null)
    listOfUsers = currentUsers
else
    listOfUsers = []


function validateUsername() {

    const usernamePattern = /^[a-zA-Z0-9._]/

    var username = usernameInput.value;


    if (username == '') {
        usernameInput.classList.add('is-invalid');
    } else {
        if (usernamePattern.test(username)) {
            usernameInput.classList.remove('is-invalid')

        } else {
            usernameInput.classList.add('is-invalid')
        }
    }

    return usernamePattern.test(username) && username != ''
}


function validateEmailAddress() {
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var email = emailInput.value;


    if (email == '') {
        emailInput.classList.add('is-invalid');
    } else {
        if (emailPattern.test(email)) {
            emailInput.classList.remove('is-invalid')

        } else {
            emailInput.classList.add('is-invalid')

        }
    }

    return emailPattern.test(email) && email != ''

}

function validatePassword() {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    var password = passwordInput.value;



    if (password == '') {
        passwordInput.classList.add('is-invalid');
    } else {
        if (passwordPattern.test(password)) {
            passwordValidation.style.display = 'none'
            passwordInput.classList.remove('is-invalid')

        } else {
            passwordValidation.style.display = 'block'
            passwordInput.classList.add('is-invalid')

        }
    }
    return passwordPattern.test(password) && password != ''

}

function checkUserSignUp() {
    var state = false;

    listOfUsers.forEach((elem) => {
        if (emailInput.value == elem.email) {
            state = true;
            whichField = 'email'
        } else if (usernameInput.value == elem.username) {
            state = true;
            whichField = 'username'
        }

    })

    return state
}

function showErrorMessage(state, message) {
    if (state) {
        errorMessage.style.display = 'block'
        errorMessage.innerHTML = message
    } else {
        errorMessage.style.display = 'none'
        errorMessage.innerHTML = ``
    }
}

function validateUserData() {
    if (!validateUsername() | !validateEmailAddress() | !validatePassword()) {
        errorMessage.classList.replace('d-none', 'd-block');
    } else {
        if (checkUserSignUp()) {
            if (whichField != '') {
                if (whichField == 'email')
                    showErrorMessage(true , 'This email is already exist')
                else if (whichField == 'username')
                showErrorMessage(true , 'This username is already exist')

            }
        } else {
            showErrorMessage(false, '')
            uploadUserData()
        }
    }


}

function uploadUserData() {
    user = {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    };

    listOfUsers.push(user);

    console.log(listOfUsers);

    localStorage.setItem('usersList', JSON.stringify(listOfUsers));

    clearInputsFeilds()

    location.href = 'index.html'
}

function clearInputsFeilds() {
    usernameInput.value = ''
    emailInput.value = ''
    passwordInput.value = ''
}





/* end sign up part */



/* start login part */


function isEmpty() {
    if (emailInput.value == '' || passwordInput.value == '')
        return true;
    else
        return false;

}

function checkUser() {

    var exist = false;

    if (isEmpty()) {
        showErrorMessage(true, `All inputs are required`)
    }
    else {
        if (currentUsers != null) {
            showErrorMessage(false, '')
            currentUsers.forEach((elem) => {
                if (emailInput.value == elem.email && passwordInput.value == elem.password) {
                    exist = true;
                    localStorage.setItem('currentuser', JSON.stringify(elem));
                }
            })
        }
    }

    if (exist) {
        emailInput.value = ''; passwordInput.value = '';
        location.href = 'home.html';
    } else {
        showErrorMessage(true, `user doesn't exist please sign up first !!`)
    }

}




/*end login part */



