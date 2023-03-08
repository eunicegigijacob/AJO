const datas = {
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  form: document.querySelector('form'),
};
console.log(datas);
datas.form.addEventListener('submit', (e) => {
  e.preventDefault();
  let { email, password } = datas;
  let inputs = {
    email: email.value,
    password: password.value,
  };
  senData('https://ajo.onrender.com/api/v1/auth/login', inputs);
  email.value = password.value = '';
});

const senData = async (url, inputs) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(inputs),
  });
  const data = response.status;
  if (data === 200) {
    window.location.href = '../Pages/dashboard.html';
  }
};
