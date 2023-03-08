function signin(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if(email== "admin@gmail.com" && password=="admin123"){
        window.location.assign("../Landing Page/HTML/index.html");
        alert("Login Successful");
    }
    else{
        alert("Invalid Information");
        return;
    }
}

const form = document.getElementById('formlogin');
if(form){
  form.addEventListener("submit",(e)=>{
   
    e.preventDefault();
  login()
 
  })
  }
  function login(){
  const username =   document.getElementById('username').value
    const password = document.getElementById('password').value
   
axios.post('http://127.0.0.1:8080/Auth',{
    username: username,
    password: password
}).then(res=>{
  console.log(res)
if(res.data[0].message == "invalid")
{
  Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Invalid username or password',
})
}else{
  console.log(res.data[0].message)
  localStorage.setItem("token",res.data[0].message)
  window.location = '/dashboard'
}
}).catch(err=>{
  console.log(err)
})
}