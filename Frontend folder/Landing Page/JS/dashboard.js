const body = document.querySelector('body'),
  modeToggle = body.querySelector('.mode-toggle');

modeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
});

window.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch(
    'https://ajo.onrender.com/api/v1/dashboard/home',
    {
      credentials: 'include',
    }
  );

  const result = await response.json();

  if (Object.keys(result).includes('name')) {
    document.getElementById('name holder').innerText = `Hi ${result.name}`;
    document.getElementById(
      'wallet-bal'
    ).innerText = `$${result.walletBalance}`;
  } else {
    window.location = '../Pages/signin.html';
  }
});

console.log('...', document.cookie);
