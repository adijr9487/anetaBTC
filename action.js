const HAMBUGER = document.getElementById('hamburger');
const NAVBAR = document.getElementById('navbar');
const LOGIN_BUTTON = document.querySelectorAll('.login');

//form data
const BACK_DROP = document.querySelector('.backdrop');
const LOGIN_FORM = document.querySelector('.login-form');
const CLOSE_FORM = document.querySelector('.fa-xmark');

const INPUT_FIRST_NAME = document.querySelector('.first-name');
const INPUT_LAST_NAME = document.querySelector('.last-name');
const EMAIL = document.querySelector('.email');
const DOB = document.querySelector('.dob');
const PASSWORD = document.querySelector('.password');
const CONFIRM_PASSWORD = document.querySelector('.confirm-password');
const INPUT_FORM = document.querySelectorAll('input');

const form_validation = {
    [INPUT_FIRST_NAME.name]: { 
        validate: function(value){
            return value.length > 0;
        },
        err_msg: "First Name is required"
    },
    [INPUT_LAST_NAME.name]: {
        validate: function(value){
            return 1;
        },
    },
    [EMAIL.name]: {
        validate: function(value){
            validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return validRegex.test(value);
        },
        err_msg: "Email is not valid"
    },
    [DOB.name]: {
        validate: function(value){
            let today = new Date()
            let dob = new Date(value)
            let age = today-dob
            let threshold = 18*365*24*60*60*1000;
            return age > threshold;
        },
        err_msg: "Age must be greater than 18"
    },
    [PASSWORD.name]: {
        validate: function(value){
            if(value.length > 8 && value.match('[A-Z]') && value.match('[!@#$%^&*]')){
                return true;   
            }
            return false;
        },
        err_msg: "Password must contain 8 characters, 1 uppercase and 1 special character"
    },
    [CONFIRM_PASSWORD.name]: {
        type: CONFIRM_PASSWORD,
        validate: function(value){
            return value == PASSWORD.value;
        },
        err_msg: "Password does not match"
    }
}

function validate(field, value){
    console.log(field)

    let element = '.'+field.name+'-err'

    if (form_validation[field.name].validate(value)){
        document.querySelector(element).innerText = '';
    }else{
        document.querySelector(element).innerText = form_validation[field.name].err_msg;
    }

    return form_validation[field.name].validate(value);
}

function toggleNavbar() {
    console.log(NAVBAR.classList)
    NAVBAR.classList.toggle('active');
    HAMBUGER.classList.toggle('fa-xmark');
}

HAMBUGER.addEventListener('click', toggleNavbar);


function toggleLoginForm() {
    LOGIN_FORM.classList.toggle('activeForm');
}

CLOSE_FORM.addEventListener('click', () => {
    toggleLoginForm();
})

LOGIN_BUTTON.forEach(each_login=>{
    each_login.addEventListener('click', () => {
        toggleLoginForm();
    })
})

BACK_DROP.addEventListener('click', (e) => {
    console.log("Back Drop clicked")
    toggleLoginForm();
})

INPUT_FORM.forEach((each_input) => {
    each_input.addEventListener('blur', (e) => {
        console.log(e.target)
        validate(e.target, e.target.value)
    })
})

// saving data 

LOGIN_FORM.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e, e.target.length)

    let valid = true;
    valid = valid && validate(INPUT_FIRST_NAME, INPUT_FIRST_NAME.value)
    valid = valid && validate(INPUT_LAST_NAME, INPUT_LAST_NAME.value)
    valid = valid && validate(EMAIL, EMAIL.value)
    valid = valid && validate(DOB, DOB.value)
    valid = valid && validate(PASSWORD, PASSWORD.value)
    valid = valid && validate(CONFIRM_PASSWORD, CONFIRM_PASSWORD.value)

    if (valid){
        saveData();
    }else{
        alert('Please fill the form correctly');
    }
})




function saveData(){
    
    const data = {
        firstName: INPUT_FIRST_NAME.value,
        lastName: INPUT_LAST_NAME.value,
        email: EMAIL.value,
        dob: DOB.value,
        password: PASSWORD.value,
        confirmPassword: CONFIRM_PASSWORD.value
    }
    console.log(data)

    const allData = JSON.parse(localStorage.getItem('data')) || [];
    let email_exists = true;
    val = allData.forEach((each_data) => {
        if (each_data.email == data.email){
            email_exists = false;
            return;
        }
    })
    if(email_exists == false){
        alert('Email already exists');
        return;
    }
    
    //pushing new data
    allData.push(data)
    //setting to local storage
    localStorage.setItem('data', JSON.stringify(allData));
    alert('Data saved successfully')
    LOGIN_FORM.reset()
    toggleLoginForm();
}