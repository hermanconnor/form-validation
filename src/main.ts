const initApp = () => {
  const form = document.getElementById('form') as HTMLFormElement;
  const username = document.getElementById('username') as HTMLInputElement;
  const email = document.getElementById('email') as HTMLInputElement;
  const password = document.getElementById('password') as HTMLInputElement;
  const confirmPassword = document.getElementById(
    'confirm-password',
  ) as HTMLInputElement;

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

// Show Error
const showError = (input: HTMLInputElement, message: string) => {
  const formControl = input.parentElement!;
  formControl.classList.add('error');
  formControl.classList.remove('success');

  const small = input.nextElementSibling!;
  small.textContent = message;
};

// Show Success
const showSuccess = (input: HTMLInputElement) => {
  const formControl = input.parentElement!;
  formControl.classList.add('success');
  formControl.classList.remove('error');
};

// Check for valid email address
const checkEmail = (input: HTMLInputElement) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
};

// Check Input Length
const checkLength = (input: HTMLInputElement, min: number, max: number) => {
  if (input.value.length < min) {
    showError(
      input,
      `${capitalizeField(input)} must be at least ${min} characters`,
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${capitalizeField(input)} must be less than ${max} characters`,
    );
  } else {
    showSuccess(input);
  }
};

// Check For Required Fields
const checkRequired = (arr: HTMLInputElement[]) => {
  arr.forEach((input) => {
    if (input.value === '') {
      showError(input, `${capitalizeField(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

// Capitalize Error Field Name
const capitalizeField = (input: HTMLInputElement): string => {
  // return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  const label = input.previousElementSibling as HTMLLabelElement;

  return label.textContent!;
};

// Check If Passwords Match
const checkPasswordsMatch = (
  pwd: HTMLInputElement,
  confirmPwd: HTMLInputElement,
) => {
  if (pwd.value !== confirmPwd.value) {
    showError(confirmPwd, 'Passwords do not match');
  }
};
