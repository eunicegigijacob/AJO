const signinBtn = document.getElementById('signinBtn');
const signupBtn = document.getElementById('signupBtn');
const aboutUs = document.getElementById('aboutUs');

signinBtn.addEventListener('click', () => {
  location.assign('Pages/signin.html');
});

signupBtn.addEventListener('click', () => {
  location.assign('Pages/signup.html');
});
