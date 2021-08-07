//varibales globales
let pagina = 1;

const cita = {
    nombre: '',
    fecha: '',
    hora: '',
    servicios : []
}

document.addEventListener('DOMContentLoaded', function () {

    startApp();
});


function startApp () {
    getDatos();

    //Resalta el DIV actual según el tab al que se presiona
    mostrarSeccion();

    //Oculta o muestra una seccion según e tab al que se presiona
    cambiarSeccion();

    //pagina anterior
    paginaAnterior();

    //pagina siguiente
    paginaSiguiente();


    botonesPaginador();

    //validar servicios
    validarFormulario();

    //Asignar nombre cita al objeto
    nombreCita();

};

/**Muestra la seccion actual basado en pagina establecida como inicial */
function mostrarSeccion () {

    /**evalua ssi algun DIV contiene la clase .mostrar-seccion,
     * si devuelve true elimiina la clase*/
    const seccionPrevia = document.querySelector('.mostrar-seccion');
    if (seccionPrevia) {
        seccionPrevia.classList.remove('mostrar-seccion');
    }

    /**agrega la clase .mostrar-seccion de acuerdo a variable global */
    const seccionActual = document.querySelector(`#paso-${pagina}`);
    seccionActual.classList.add('mostrar-seccion');


    /**evalua si algún link hijo de 'tab' contiene la clase .activo
     * si devuelve 'true' elimina la clase
     */
    const tabPrevio = document.querySelector('.tabs .activo');
    if (tabPrevio) {
        tabPrevio.classList.remove('activo');
    }

    /**agrega .activo al boton del tab actual */
    const tabActual = document.querySelector(`[data-pagina="${pagina}"]`);
    tabActual.classList.add('activo');
}

function cambiarSeccion () {
    const enlaces = document.querySelectorAll('.tabs button');

    enlaces.forEach( enlace => {
        enlace.addEventListener('click', event => {
            event.preventDefault();
            pagina = parseInt(event.target.dataset.pagina);

            mostrarSeccion();
            botonesPaginador();
            
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
     * estan dentro de localNameExplicitOriginalTarget */

    if (e.target.nodeName == 'P') {
        elemento = e.target.parentElement; //devuelve DIV el ancestro de 'P'
    }else {
        elemento = e.target; //devuelve DIV
    }

    /**agregar / quitar la clase 'seleccionado'
     * NOTA: se peude hacer utilizando el metodo '.toggle': elemento.classList.toggle('seleccionado');
     */

    if (elemento.classList.contains('seleccionado')) {
        elemento.classList.remove('seleccionado');

        //eliminando servicio
        const id = parseInt(elemento.dataset.idServicio);

        //se pasa el id como argumento
        eliminaServicio(id);
    }else {
        elemento.classList.add('seleccionado');
        
        //creando objeto de servicio
        const servicioObj = {
            id: parseInt(elemento.dataset.idServicio),
            nombre: elemento.firstElementChild.textContent,
            fecha: elemento.firstElementChild.nextElementSibling.textContent,
            hora: ''
        }
        // console.log(servicioObj);
        agregaServicio(servicioObj);
    }
}

//Agrega servicio
function agregaServicio (servicioObj) {

    //destructuring
    const {servicios} = cita;

    /**crea una copia del del arreglo de servicios utilizando el operador tres puntos (...)
     * agrega al arreglo el nuevo objeto serviciosObj pasado como parámetro desde seleccionaServicio()
     */
    cita.servicios = [...servicios, servicioObj];

    /**SIN OPERADOR PUNTO 
     * 1) crea copia de arreglo servicios
     * 2) agrega objeto al arreglo con metodo push()
     * 3) se asigna el arreglo modificado al arreglo global
    */
    // const serviciosCpy = servicios;
    // serviciosCpy.push(servicioObj);
    // cita.servicios = serviciosCpy;

    // console.log(`Agregando servicio...`);
    // console.log(cita.servicios);
}


function eliminaServicio (id) {

    //destructuring
    const {servicios} = cita;

    /**Almacena en cita.servicios todos los servicios que sean diferentes del servicio con
     * el id pasado como argumento desde seleccionaServicio()
     */
    cita.servicios = servicios.filter(function (servicio) {
        return servicio.id !== id;
    });

    // console.log(cita.servicios);
}


function nombreCita() {
    const nombre = document.querySelector('#nombre');
    nombre.addEventListener('input', event => {
        
        const nombreTexto = event.target.value.trim(); //metodo trim elimina espaciosn al inico y final
        
        //comprobando contenido del input
        if (nombreTexto == '' || nombreTexto.length < 3 ) {
            mostrarAlerta ('El nombre esta vacío o no es correcto', 'error');
        }else {

            //comprobar si existe un alerta activa
            const alerta = document.querySelector('.alerta');
            if (alerta) {
                alerta.remove();
            }

            cita.nombre = nombreTexto;
        }
        // console.log(cita);
    });

};

function fechaCita () {

};


function horaCita () {

};

function paginaAnterior () {
    const anterior = document.querySelector('#anterior');
    anterior.addEventListener('click', () => {
        pagina --;
        console.log(pagina);
        botonesPaginador();
    })
}

function paginaSiguiente () {
    const siguiente = document.querySelector('#siguiente');
    siguiente.addEventListener('click', () => {
        pagina++;
        console.log(pagina);
        botonesPaginador();
    })

}

/**Evalua el id de la seccion mostrada en pantalla
 * agrega/elimina la clase .oculto para ocultar o mostrar
 * la sección
*/

function botonesPaginador() {
    const btnAnterior = document.querySelector('#anterior');
    const btnSiguiente = document.querySelector('#siguiente');

    if (pagina === 1) {
        btnAnterior.classList.add('oculto');
        btnSiguiente.classList.remove('oculto');
    }else if (pagina === 3) {
        btnSiguiente.classList.add('oculto');
        btnAnterior.classList.remove('oculto');
    }else {
        btnSiguiente.classList.remove('oculto');
        btnAnterior.classList.remove('oculto');
    }

    /**llama a la fuinción mostrarSeccion */
    mostrarSeccion();
}


function validarFormulario() {

    //destructuring
    const {nombre, fecha, hora, servicios} = cita;
    
    //Selector de sección resumen
    const resumen = document.querySelector('.resumen');
    
    //validación de objeto
    if (Object.values(cita).includes('')) {

        const citaVacia = document.createElement('P');
        citaVacia.textContent = 'Faltan datos en la cita, verificar Nombre, Fecha, Hora, Servicios';
        citaVacia.classList.add('invalidar-cita');
        resumen.appendChild(citaVacia);

    }else {
        console.log(Object.values(cita));
    }
}


function mostrarAlerta (mensaje, error) {

    //verificar si existe una alerta activa
    const alertaPrevia = document.querySelector('.alerta');
    if (alertaPrevia) {
        alertaPrevia.remove();
    }

    const alerta = document.createElement('P');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');


    if (error == 'error') {
        alerta.classList.add('error');
    }
    
    //inyectar en HTML
    const formulario = document.querySelector('.formulario');
    formulario.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 3500);
}
//# sourceMappingURL=bundle.js.map
