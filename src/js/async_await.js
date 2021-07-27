//############ ASYNC / AWAIT ###############

document.addEventListener('DOMContentLoaded', function () {

    console.log('############ ASYNC / AWAIT ###############')
    consultaDatos();

});

async function consultaDatos (){
    
    const file = '../../src/js/empleados.json';

    //***** fecth utilizando promises *****
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


    //***** fetch utilizando async / await ******

    const consulta = await fetch(file);
    const datos = await consulta.json();

    const {empleados} = datos;

    empleados.forEach( function (empleado){
        console.log(empleado.id);
        console.log(empleado.nombre);
        console.log(empleado.puesto);

    });
}

