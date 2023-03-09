const datas = {
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  form: document.querySelector('form'),
  emailError: document.getElementById('email-errors'),
  passwordError: document.getElementById('password-errors'),
};

datas.form.addEventListener('submit', (e) => {
  e.preventDefault();
  let { email, password } = datas;
  let inputs = {
    email: email.value,
    password: password.value,
  };
  console.log(inputs);
  senData('https://ajo.onrender.com/api/v1/auth/login', inputs);
  email.value = password.value = '';
});

const senData = async (url, inputs) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(inputs),
  });
  const data = response.status;
  if (data === 200) {
    // const dashboardResponse = await fetch(
    //   'https://ajo.onrender.com/api/v1/dashboard/home'
    // );
    // console.log(await dashboardResponse.json());
    // window.location.href = '../Pages/dashboard.html';
    console.log('success');
  }
  const resolved = await response.json();

  // console.log(Object.keys(resolved.errors));
  if (resolved.errors) {
    if (Object.keys(resolved.errors).includes('email')) {
      const { emailError } = datas;
      emailError.style.color = 'red';
      emailError.innerText = resolved.errors.email;
    }

    if (Object.keys(resolved.errors).includes('password')) {
      const { passwordError } = datas;
      passwordError.style.color = 'red';
      passwordError.innerText = resolved.errors.password;
    }
    console.log(Object.values(resolved.errors), resolved.errors);
  }
};
