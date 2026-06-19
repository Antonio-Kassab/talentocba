// Actualizar vista previa del formulario en tiempo real

document.addEventListener('DOMContentLoaded', function() {
  // Referencias a los campos del formulario
  const inputNombre = document.getElementById('actor-nombre');
  const inputEdad = document.getElementById('actor-edad');
  const inputEmail = document.getElementById('actor-email');
  const inputFoto = document.getElementById('actor-foto');
  const checkboxesHabilidades = document.querySelectorAll('input[name="habilidades"]');

  // Referencias a los elementos de la tarjeta modelo
  const tarjetaTextoNombre = document.getElementById('tarjeta-nombre-preview');
  const tarjetaTextoEdad = document.querySelector('.tarjeta-modelo .tarjeta-detalle:nth-child(3) .tarjeta-texto'); // Pasar a getElementById
  const tarjetaTextoEmail = document.querySelector('.tarjeta-modelo .tarjeta-detalle:nth-child(4) .tarjeta-texto'); // Pasar a getElementById
  const tarjetaAvatar = document.querySelector('.tarjeta-avatar'); // Pasar a getElementById
  const tarjetaHabilidades = document.getElementById('tarjeta-habilidades-preview');

  // Función para actualizar la tarjeta
  function actualizarTarjeta() { // Desarmar en funciones que actualicen cada sección (nombre, edad, email, foto, habilidades)
    // Actualizar nombre
    if (inputNombre.value) {
      tarjetaTextoNombre.textContent = inputNombre.value;
    } else {
      tarjetaTextoNombre.textContent = 'Valentina Pérez';
    }

    // Actualizar edad
    if (inputEdad.value) {
      tarjetaTextoEdad.textContent = inputEdad.value;
    } else {
      tarjetaTextoEdad.textContent = '29';
    }

    // Actualizar email
    if (inputEmail.value) {
      tarjetaTextoEmail.textContent = inputEmail.value;
    } else {
      tarjetaTextoEmail.textContent = 'tucorreo@ejemplo.com';
    }

    // Actualizar foto
    if (inputFoto.value) {
      tarjetaAvatar.style.backgroundImage = `url('${inputFoto.value}')`;
      tarjetaAvatar.style.backgroundSize = 'cover';
      tarjetaAvatar.style.backgroundPosition = 'center';
      tarjetaAvatar.textContent = '';
    } else {
      tarjetaAvatar.style.backgroundImage = 'none';
      tarjetaAvatar.textContent = 'Foto';
    }

    const nombreDeLasHabilidades = {
      "teatro-fisico": "Teatro físico",
      "canto": "Canto",
      "danza": "Danza",
      "actuacion-camara": "Actuación frente a cámara",
      "acentos": "Manejo de acentos"
    }

    // Actualizar habilidades
    const habilidadesSeleccionadas = Array.from(checkboxesHabilidades)
      .filter(checkbox => checkbox.checked)
      .map(prueba => nombreDeLasHabilidades[prueba.value] || prueba.value);

    tarjetaHabilidades.innerHTML = '';
    
    if (habilidadesSeleccionadas.length) {
      habilidadesSeleccionadas.forEach(habilidad => {
        const li = document.createElement('li');
        li.textContent = habilidad;
        tarjetaHabilidades.appendChild(li);
      });
    } else {
        const li = document.createElement('li');
        li.textContent = 'Ninguna';
        tarjetaHabilidades.appendChild(li);
    }
  }

  // Event listeners para cada campo
  if (inputNombre) inputNombre.addEventListener('input', actualizarTarjeta);
  if (inputEdad) inputEdad.addEventListener('input', actualizarTarjeta);
  if (inputEmail) inputEmail.addEventListener('input', actualizarTarjeta);
  if (inputFoto) inputFoto.addEventListener('input', actualizarTarjeta);

  // Event listeners para checkboxes
  checkboxesHabilidades.forEach(checkbox => {
    checkbox.addEventListener('change', actualizarTarjeta);
  });

  // Llamar función inicial
  actualizarTarjeta();
});
