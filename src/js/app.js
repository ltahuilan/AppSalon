document.addEventListener('DOMContentLoaded', function () {

    app();
});

function app () {
    getDatos();
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

function seleccionaServicio(e) {

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
