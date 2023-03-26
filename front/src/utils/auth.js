import axios from 'axios'

export function getCookie(name) {
    const regex = new RegExp(`(?:(?:^|.*;\\s*)${name}\\s*\\=\\s*([^;]*).*$)|^.*$`);
    const cookie = document.cookie.replace(regex, "$1");
    return cookie;
}

export function isLog() {
    var cookie
    if (cookie = getCookie("accesToken")) {
        axios.post('http://127.0.0.1:3000/user/verifToken', {
            accesToken: cookie,
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error);
        });
    } else {
        window.location.href = "/";
    }
}
