document.getElementById('loginForm').addEventListener('submit', (e)=>{
    e.preventDefault();

    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    if(username == "sudha"  && password == "devi1234"){
        localStorage.setItem("loggedIn" , true)
        location.assign('/admin.html');
    }
});

