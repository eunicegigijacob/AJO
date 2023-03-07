const signinBtn = document.getElementById('signinBtn');
const signupBtn = document.getElementById('signupBtn');
const aboutUs = document.getElementById('aboutUs');

signinBtn.addEventListener('click', () => {
  location.assign('Pages/signin.html');
  console.log('signin');
});

signupBtn.addEventListener('click', () => {
  location.assign('Pages/signup.html');
  console.log('signup');
});

// function signin(){
//    location.assign("/signin.html")
// }
