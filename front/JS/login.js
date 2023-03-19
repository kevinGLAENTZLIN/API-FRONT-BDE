window.onload = ()=>  {

    let ubox = document.getElementById("usern")
    let pbox = document.getElementById("pass")

    let form= document.getElementById("formw")
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        axios.post('http://127.0.0.1:3000/user/login', {
            name: ubox.value,
            password: pbox.value
        }).then((response) => {
            document.cookie = "accesToken=" + response.data.accesToken;
            window.location.href = "../html/dashboard.html";
        }).catch((error) => {
            console.log(error);
        });
    })
  };
