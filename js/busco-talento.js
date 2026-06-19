// Ejemplo para traer info de la DB (json-server) y mostrarla en consola.
// El "fetch", busca en la url y tra el resultado.
// "then" define lo que va a una vez tenga el resultado
// en este caso, el primero lo convierte de JSON a un objeto de JavaScript y el segundo lo muestra en la consola.

// fetch("https://my-json-server.typicode.com/Antonio-Kassab/talentocba/talento")
// .then(response => response.json())
// .then(data => console.log(data))
document.addEventListener('DOMContentLoaded', function() {
  fetch("https://my-json-server.typicode.com/Antonio-Kassab/talentocba/talento")
  .then(response => {return response.json();})
  .then(data => {
    // Aca va todo lo que quieras hacer con la data, por ejemplo mostrarla en la consola:
    console.log(data)
})
});