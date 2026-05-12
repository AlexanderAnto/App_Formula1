document.getElementById("login-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "12345") {
    window.location.href = "html/selectorAdmin.html";
  } else if (username === "cliente" && password === "12345" ) {
    window.location.href = "html/selectorCliente.html";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
});

document.getElementById("add-button").addEventListener("click", async function (e) {
  e.preventDefault();
   window.location.href = "html/newUSer.html";
});