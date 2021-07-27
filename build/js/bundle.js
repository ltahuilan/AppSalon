
//############ ASYNC / AWAIT ###############

document.addEventListener('DOMContentLoaded', function () {

    console.log('############ ASYNC / AWAIT ###############')
    consultaDatos();

});

async function consultaDatos (){
    const file = '../../src/js/empleados.json';

    //fecth utilizando promises
    // fetch(file)
    //     .then( consulta => {
    //         return consulta.json(); //se aplica el metodo json() para tratar los datos consultados
    //     })
    //     .then( datos => {
    //         console.log(datos);
    //         //Destructuring
    //         const {empleados} = datos;
    //         empleados.forEach( empleado => {

    //             console.log(empleado.id);
    //             console.log(empleado.nombre);
    //             console.log(empleado.puesto);

    //         });

    //     })


    //fetch utilizando async / await

    const consulta = await fetch(file);
    const datos = await consulta.json();

    const {empleados} = datos;

    empleados.forEach( function (empleado){
        console.log(empleado.id);
        console.log(empleado.nombre);
        console.log(empleado.puesto);

    });
}


//########### Object Destructuring ###########

//objeto
const persona = {
    nombre: 'Luis',
    apellido: 'Tahuilán',
    edad: 36,
    gustos: {
        musica: {
            rock: ['Rolling Stones, Led Zeppelin'],
            espanyol: 'José José'
        },
        hoby: 'programacion'
    }
}

//acceso a propiedades de objetos, forma previa
const nombrePersona = persona.nombre;
const apellidoPersona = persona.apellido;
const gustosPersona = persona.gustos;

// console.log(gustosPersona);

//Object Destructuring

const {nombre, apellido, edad, gustos: {musica: {rock, espanyol}, hoby}} = persona;

console.log(`
    Nombre: ${nombre}
    Apellido: ${apellido}
    Edad: ${edad}
    Gustos Musicales: ${rock}, ${espanyol}
    Otros gustos: ${hoby}
`);

//# sourceMappingURL=bundle.js.map