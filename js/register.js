let elForm = document.querySelector("#form")
let token = []

elForm.addEventListener("submit" , function (evt) {
    evt.preventDefault()

    let elLogin = document.querySelector("#login").value
    let elPassword = document.querySelector("#password").value

    if (elLogin.length != 0 && elPassword.length != 0) {
        token.push(elLogin , elPassword)
        localStorage.setItem("token" , JSON.stringify(token))
        window.location.href = "./index.html"
    }
})