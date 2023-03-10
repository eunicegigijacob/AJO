const form = document.getElementById('signup-form');
const emailError = document.getElementById('email-error');
const phoneError = document.getElementById('phone-error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const datas = {
    firstname: document.getElementById('firstname').value,
    lastname: document.getElementById('lastname').value,
    phoneNumber: document.getElementById('phone-no').value,
    invitecode: document.getElementById('invitecode').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };

  const testURL = 'http://localhost:4000/api/v1/auth/signup';
  const mainURL = 'https://ajo.onrender.com/api/v1/auth/signup';

  const response = await fetch(mainURL, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(datas),
  });
  const resolved = await response.json();

  if (resolved.errors) {
    if (Object.keys(resolved.errors).includes('email')) {
      emailError.style.color = 'red';
      emailError.innerText = resolved.errors.email;
    }

    if (Object.keys(resolved.errors).includes('phoneNumber')) {
      phoneError.style.color = 'red';
      phoneError.innerText = resolved.errors.phoneNumber;
    }
    console.log(Object.values(resolved.errors));
  } else {
    window.location = '../Pages/signin.html';
  }
});
