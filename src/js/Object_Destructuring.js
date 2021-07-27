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
