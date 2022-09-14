/* Recupera LocalStorage, si no hay nada devuelve el array vacio */
let ticketComprado = JSON.parse(localStorage.getItem('productosAgregadosJSON')) || [];

/* Muestra los recitales a los accedera */
function renderCarrito() {
  let htmlSelect = '';
  for (let i = 0; i < ticketComprado.length; i++) {
    htmlSelect += `<div class="card my-2">
              <div class="row g-0">
                  <div class="col-md-4">
                      <img src="${ticketComprado[i].img}" class="img-fluid rounded-start" alt="foto recital">
                  </div>
                  <div class="col-md-8">
                      <div class="card-body">
                          <h5 class="card-title text-center">${ticketComprado[i].nombre}</h5>
                          <div class="linea"></div>
                          <p class="card-text">${ticketComprado[i].info}</p>
                          <div class="lugar row w-100 m-auto  d-flex justify-content-center col text-center">
                              <div class="ubicacion  mb-2 m-4 ">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                                      <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                                      <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                  </svg>
                                  <p class="card-text">${ticketComprado[i].lugar}</p>
                              </div>
                              <div class="col text-center">
                                  <button type="button" class="btn btn-warning btn-lg m-4" onclick="eliminarCart(${i}); saveToLocalStorage();">Eliminar</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>`;
  }
  document.getElementById('cardJs').innerHTML = htmlSelect;
}
renderCarrito();

/* Guarda carrito en LocalStorage */
let saveToLocalStorage = () => {
  let storageJSON = JSON.stringify(ticketComprado);
  localStorage.setItem('productosAgregadosJSON', storageJSON);
};

/* function setFiltroCat(cat) {
  if (cat == 'rock' || cat == 'cumbia') {
    entradas = [...copiaEntradas];
    entradas = entradas.filter((item) => item.categoria == cat);
  } else {
    entradas = [...copiaEntradas];
  }
  renderRecitalesTodos();
}
 */

/* Muestra todos los recitales */
function renderRecitalesTodos() {
  fetch('../api.json')
    .then((res) => res.json())
    .then((entradas) => {
      let htmlTodos = '';
      for (let i = 0; i < entradas.length; i++) {
        htmlTodos += `<div class="card my-2">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${entradas[i].img}" class="img-fluid rounded-start" alt="foto recital">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title text-center">${entradas[i].nombre}</h5>
                                <div class="linea"></div>
                                <p class="card-text">${entradas[i].info}</p>
                                <div class="lugar row w-100 m-auto  d-flex justify-content-center col text-center">
                                    <div class="ubicacion  mb-2 m-4 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                        </svg>
                                        <p class="card-text">${entradas[i].lugar}</p>
                                    </div>
                                    <div class="col text-center">
                                        <button type="button" class="btn btn-warning btn-lg m-4" onclick="agregarAlCarrito(${entradas[i].id}); saveToLocalStorage();">Agregar al Carrito</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>`;
      }

      document.getElementById('cardJsTodos').innerHTML = htmlTodos;
    })
    .catch((e) => {
      console.log(e);
    });
}
renderRecitalesTodos();

/* agrega ticket comprados al carrito */
function agregarAlCarrito(id) {
  fetch('../api.json')
    .then((res) => res.json())
    .then((entradas) => {
      const selectedTicket = entradas.find((entrada) => entrada.id == id);
      ticketComprado.push(selectedTicket);
      renderCarrito();
      saveToLocalStorage();
      /* Libreria Sweet Alert */
      Swal.fire('Producto agregado!', 'Puedes seguir comprando...', 'success');
    })
    .catch((e) => {
      console.log(e);
    });
}

/* Elimina los ticket comprados */
function eliminarCart(id) {
  /* libreria Sweet Alert */
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: 'Desea quitar el evento de la lista?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'eliminar evento!',
      cancelButtonText: 'cancelar!',
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        /* Elimina los ticket comprados */
        fetch('../api.json')
          .then((res) => res.json())
          .then((entradas) => {
            ticketComprado.splice(id, 1);
            renderCarrito();
            saveToLocalStorage();
          })
          .catch((e) => {
            console.log(e);
          });
        swalWithBootstrapButtons.fire('Eliminado!', 'Su evento se eliminó de la lista.', 'success');
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire('Cancelado', 'No se eliminó de la lista', 'error');
      }
    });
}
