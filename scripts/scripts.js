
let formulario = document.querySelector('#formulario');
let listarCita = document.getElementById('listarCita');
let buscar = document.getElementById('btnBuscar');
let busqueda = document.getElementById('busqueda');
let citas = [];

// me
const 
ingreso = document.querySelector('#datos-ingreso'),
contIngreso = document.querySelector('#contenedor-ingreso'),
contRegistro = document.querySelector('#contenedor-registro'),
ingresar = document.querySelector('#ingreso'),
btnGuardarRegistro = document.querySelector('#btnGuardarRegistro'),
opcionesBorrar = document.querySelector('#opcionesBorrar'),
agendar = document.querySelector('#contenedor-agendar'),
login = document.querySelector('#login'),
cF = document.querySelector('#contenedor-formulario')

let usuarios = [];


const capturaDatos = () => {
    let nombre = document.getElementById('nombre').value;
    let fecha = document.getElementById('fecha').value;
    let hora = document.getElementById('hora').value;
    let sintomas = document.getElementById('sintomas').value;

    let registro = {
        nombre,
        fecha,
        hora,
        sintomas
    }

    citas.unshift(registro);
    localStorage.setItem('Citas',JSON.stringify(citas));
    getLocalStorage();
    borrarCampos();
  
}

formulario.addEventListener('submit', e => {
    e.preventDefault();
    capturaDatos();
})


const getLocalStorage = () =>{
    listarCita.innerHTML = '';
    let citasLocalStorage = JSON.parse(localStorage.getItem('Citas'));
    //console.log(citasLocalStorage);
    citasLocalStorage.map(cita => {
        const {nombre,fecha,hora,sintomas} = cita;
        listarCita.innerHTML += `
                            <td>${nombre}</td>
                            <td>${fecha}</td>
                            <td>${hora}</td>
                            <td>${sintomas}</td>
        `   
     })

    //  Se agregan los botones para borrar
   if(citas != 0){
    opcionesBorrar.innerHTML = ''
    opcionesBorrar.innerHTML = `
    <td>
        <button type="submit" class="btn btn-danger" id="btnUltimaCita">
            Borrar ultima cita
        </button>
    </td>
    <td>
        <button type="submit" class="btn btn-danger" id="btnTodasLasCitas">
            Borrar todo
        </button>
    </td>
    
    `
    const
    btnUltimaCita = document.querySelector('#btnUltimaCita'),
    btnTodasLasCitas = document.querySelector('#btnTodasLasCitas')

    btnUltimaCita.addEventListener('click', ()=>{
        citas.shift()
        localStorage.setItem('Citas',JSON.stringify(citas));
        getLocalStorage()
    })

    btnTodasLasCitas.addEventListener('click', ()=>{
        citas = []
        localStorage.setItem('Citas',JSON.stringify(citas));
        getLocalStorage()
    })
   }

}


document.addEventListener('DOMContentLoaded',()=>{
    // Si se recarga la pagína y hay datos en localStorage, guardo en el array citas el acomulado del localStorage
    if(localStorage.getItem('Citas')){
        citas = JSON.parse(localStorage.getItem('Citas'))
        getLocalStorage()
    }
    // Lo mismo para el registro de usuarios
    if(localStorage.getItem('Registro')){
        usuarios = JSON.parse(localStorage.getItem('Registro'))
    }
});



buscar.addEventListener('click', e => {
    e.preventDefault();
    let input = document.getElementById('inputBuscar').value;
    let data = JSON.parse(localStorage.getItem('Citas'));
    let filtro = data.filter(cita => cita.nombre.toLowerCase()  === input.toLowerCase())
    busqueda.innerHTML = '';  
    // console.log(filtro)  
   
     filtro.length === 0 
        ? busqueda.innerHTML += `<div style="color:white;">El nombre ${input} no existe</div>`
        :
            (
            filtro.map(cita => { 
                const {nombre,fecha,hora,sintomas} = cita;
                busqueda.innerHTML += `
                                    <div style="color:white;">${nombre}</div>
                                    <div style="color:white;">${fecha}</div>
                                    <div style="color:white;">${hora}</div>
                                    <div style="color:white;">${sintomas}
                                    <button id="btnBorrarBusqueda">Borrar</Button></div><br>             
                `   
                })

            )
        
            let btnBorrarBusqueda = document.querySelector('#btnBorrarBusqueda')
            btnBorrarBusqueda.addEventListener('click', ()=>{
                    alert('cita borrada')
                    busqueda.innerHTML = ''

                    citas.shift()
                    localStorage.setItem('Citas',JSON.stringify(citas));
                    getLocalStorage()

                    })

})


// Lógica Luis :D


const borrarCampos = ()=>{
    document.getElementById('nombre').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('hora').value = '';
    document.getElementById('sintomas').value = '';
}

const borrarBusqueda = document.querySelector('#borrar-data')
    if(borrarBusqueda){
        borrarBusqueda.addEventListener('click', ()=>{
            busqueda.innerHTML = ''
        })
    }



ingreso.addEventListener('click', ()=>{
    contIngreso.classList.toggle('display-none')
    contRegistro.classList.toggle('display-none')
})

btnGuardarRegistro.addEventListener('click', (e)=>{
    e.preventDefault()
    let registro = {
        pNombre: document.querySelector('#pNombre').value,
        sNombre: document.querySelector('#sNombre').value,
        email: document.querySelector('#email').value,
        clave: document.querySelector('#contraseña').value,
        direccion: document.querySelector('#direccion').value,
        telefono: document.querySelector('#telefono').value
    }

    usuarios.unshift(registro);
    localStorage.setItem('Registro',JSON.stringify(usuarios));
    // console.log(JSON.parse(localStorage.getItem('Registro')))

    if((registro.pNombre && registro.sNombre && registro.email && registro.clave && registro.direccion && registro.telefono) !== ""){
        alert('Registro Exitoso')
        setTimeout(() => {
            contIngreso.classList.toggle('display-none')
            contRegistro.classList.toggle('display-none')
        }, 1000);
    }else{
        alert('Registro Fallido')
    }

})

    ingresar.addEventListener('click', (e)=>{
        e.preventDefault()
        const 
        usuarioDeIngreso = document.querySelector('#usuario-de-ingreso').value,
        claveDeIngreso = document.querySelector('#contraseña-de-ingreso').value
        
        if(usuarios.length === 0){
            alert('Primero debes registrarte')
        } 

        let 
        busquedaP = 0
        busquedaN = 0;

        for(data of usuarios){
            if(data.email === usuarioDeIngreso && data.clave === claveDeIngreso){
                login.classList.toggle('display-none')
                cF.classList.toggle('display-none')
                agendar.classList.toggle('display-none')
                busquedaP++
            }else{
                busquedaN++
            }
        }
        if(busquedaN > busquedaP){
          if(data.email !== usuarioDeIngreso || data.clave !== claveDeIngreso){
                alert('Usuario invalido')
            }
        }
    })


