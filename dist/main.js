"use strict";
const initApp = () => {
    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        checkRequired([username, email, password, confirmPassword]);
        checkLength(username, 3, 15);
        checkLength(password, 6, 25);
        checkEmail(email);
        checkPasswordsMatch(password, confirmPassword);
    });
};
document.addEventListener('DOMContentLoaded', initApp);
const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.classList.add('error');
    formControl.classList.remove('success');
    const small = input.nextElementSibling;
    small.textContent = message;
};
const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.classList.add('success');
    formControl.classList.remove('error');
};
const checkEmail = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    }
    else {
        showError(input, 'Email is not valid');
    }
};
const checkLength = (input, min, max) => {
    if (input.value.length < min) {
        showError(input, `${capitalizeField(input)} must be at least ${min} characters`);
    }
    else if (input.value.length > max) {
        showError(input, `${capitalizeField(input)} must be less than ${max} characters`);
    }
    else {
        showSuccess(input);
    }
};
const checkRequired = (arr) => {
    arr.forEach((input) => {
        if (input.value === '') {
            showError(input, `${capitalizeField(input)} is required`);
        }
        else {
            showSuccess(input);
        }
    });
};
const capitalizeField = (input) => {
    const label = input.previousElementSibling;
    return label.textContent;
};
const checkPasswordsMatch = (pwd, confirmPwd) => {
    if (pwd.value !== confirmPwd.value) {
        showError(confirmPwd, 'Passwords do not match');
    }
};
