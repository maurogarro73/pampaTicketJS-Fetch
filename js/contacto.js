const formulario = document.getElementById('formulario');
const input = document.querySelectorAll('#formulario input');
/* const textArea = document.querySelectorAll('#formulario textarea'); */

const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  mensaje: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
};

let campos = { email: false, nombre: false, telefono: false };

const validarFormulario = (e) => {
  switch (e.target.name) {
    case 'email':
      validarCampo(expresiones.email, e.target, 'Email');
      break;
    case 'nombre':
      validarCampo(expresiones.nombre, e.target, 'Nombre');
      break;
    case 'telefono':
      validarCampo(expresiones.telefono, e.target, 'Telefono');
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document.getElementById(`grupo${campo}`).classList.remove('formularioIncorrecto');
    document.getElementById(`grupo${campo}`).classList.add('formularioCorrecto');
    document.querySelector(`#grupo${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
    campos[campo] = true;
  } else {
    document.getElementById(`grupo${campo}`).classList.add('formularioIncorrecto');
    document.querySelector(`#grupo${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
    campos[campo] = false;
  }
};

input.forEach((input) => {
  input.addEventListener('keyup', validarFormulario);
  input.addEventListener('blur', validarFormulario);
});

/* textArea.forEach((textArea) => {
  textArea.addEventListener('keyup', validarFormulario);
  textArea.addEventListener('blur', validarFormulario);
}); */

formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  if (campos.email && campos.nombre && campos.telefono) {
    formulario.reset();
    /* Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500,
    }); */
  } else {
    console.log(campos.email);
  }
});
