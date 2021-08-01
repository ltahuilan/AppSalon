//varibales globales
let pagina = 1;

document.addEventListener('DOMContentLoaded', function () {

    startApp();
});


function startApp () {
    getDatos();

    //Resalta el DIV actual según el tab al que se presiona
    mostrarSeccion();

    //Oculta o muestra una seccion según e tab al que se presiona
    cambiarSeccion();

};

function mostrarSeccion() {

    /**agrega .mostrar-seccion al DIV establecido por default de acurdo a variable global */
    const seccion = document.querySelector(`#paso-${pagina}`);
    seccion.classList.add('mostrar-seccion');

    /**agrega .activo al boton del tab actual */
    const tab = document.querySelector(`[data-pagina="${pagina}"]`);
    tab.classList.add('activo');
}

function cambiarSeccion () {
    const enlaces = document.querySelectorAll('.tabs button');

    enlaces.forEach( enlace => {
        enlace.addEventListener('click', event => {
            const pagina = parseInt(event.target.dataset.pagina);

            /**elimina mostrar-seccion del DIV previo agregado en la funcion mostrarSeccion()*/
            document.querySelector('.mostrar-seccion').classList.remove('mostrar-seccion');

            /**agrega .mostrar-seccion al DIV en funcion del boton a que se hizo click */
            const seccion = document.querySelector(`#paso-${pagina}`);
            seccion.classList.add('mostrar-seccion');

            /**elimina .activo del tab previo */
            document.querySelector('.activo').classList.remove('activo');

            /**agrega .activo al tab seleccionado */
            document.querySelector(`[data-pagina="${pagina}"]`).classList.add('activo');
            
        })
    })
};


async function getDatos () {

    try {

        const file = '../../servicios.json';
        const resultado = await fetch(file);
        const datos = await resultado.json();

        const {servicios} = datos; //Object Destructurion

        //construyendo el HTML
        servicios.forEach( function (servicio) {

            //Destructuring
            const { id, nombre, precio } = servicio  // const id = servicio.id 

            //DOM Scripting
            //crando HTML nombre servicio
            const nombreServicio = document.createElement('P');
            nombreServicio.textContent = nombre;
            nombreServicio.classList.add('nombre-servicio');

            //creando HTML precio servicio
            const precioServicio = document.createElement('p');
            precioServicio.textContent = `$ ${precio}.00`;
            precioServicio.classList.add('precio-servicio');

            //creando HTML contenedor servicio
            const contenedorServicio = document.createElement('DIV');
            contenedorServicio.classList.add('servicio');
            contenedorServicio.dataset.idServicio = id; //atributo personalizado para seleccionar enelemntos
            
            //inyectando parrafos en condenedor DIV
            contenedorServicio.appendChild(nombreServicio);
            contenedorServicio.appendChild(precioServicio);

            //seleccionar servicio (evento)
            contenedorServicio.onclick = seleccionaServicio;

            //inyectando en el HTML
            document.querySelector('#servicios').appendChild(contenedorServicio);

            // console.log(contenedorServicio);
            
        });
        
    } catch (error) {
        console.log(error)
    }

};

function seleccionaServicio(e) {    /**funcion llamada desde getDatos() */

    let elemento;
    /**forzar que el elemento seleccionado sea un DIV */

    /**devuelven el nombre de la entiqueta:  "nodeName", "tagname".
     * estan dentro de localNameexplicitOriginalTarget */

    if (e.target.nodeName == 'P') {
        elemento = e.target.parentElement;
    }else {
        elemento = e.target;
    }

    /**agregar / quitar la clase 'seleccionado'
     * NOTA:
     * se peude hacer utilizando el metodo '.toggle':
     * 
     * elemento.classList.toggle('seleccionado');
     */

    if (elemento.classList.contains('seleccionado')) {
        elemento.classList.remove('seleccionado');
    }else {
        elemento.classList.add('seleccionado');
    }

    console.log(elemento.dataset.idServicio);
};

//# sourceMappingURL=bundle.js.map
