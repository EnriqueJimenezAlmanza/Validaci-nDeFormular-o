//Variables
const btnEnviar = document.querySelector('#enviar')
const email = document.querySelector('#email')
const asunto = document.querySelector('#asunto')
const mensaje = document.querySelector('#mensaje')
const formulario = document.querySelector('#enviar-mail')
const btnReset = document.querySelector('#resetBtn')


const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners()


function eventListeners() {
    //Cuando cargue el documento html
    document.addEventListener('DOMContentLoaded', iniciarApp)

    //CAMPOS DEL FOMULARIO
    email.addEventListener('blur', validarFurmulario)
    asunto.addEventListener('blur', validarFurmulario)
    mensaje.addEventListener('blur', validarFurmulario)

    //Enviar formulario
    formulario.addEventListener('submit', enviarEmail)
        //reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario)
}





///Funciones

function iniciarApp() {
    btnEnviar.disabled = true
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

//valida el formulario
function validarFurmulario(e) {

    if (e.target.value.length > 0) {
        e.target.classList.remove('border', 'border-red-500')
        e.target.classList.add('border', 'border-green-500')
    } else {
        e.target.classList.remove('border', 'border-green-500')
        e.target.classList.add('border', 'border-red-500')
        mostrarError('Todos los campos son obligatorios')
    }

    if (e.target.type === 'email') {

        if (er.test(e.target.value) && e.target.value.length > 0) {
            e.target.classList.remove('border', 'border-red-500')
            e.target.classList.add('border', 'border-green-500')
        } else {
            e.target.classList.remove('border', 'border-green-500')
            e.target.classList.add('border', 'border-red-500')
            mostrarError('Email no valido')
        }
    }

    if (asunto.value !== '' && mensaje.value !== '' && er.test(email.value)) {
        btnEnviar.disabled = false
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    } else {
        btnEnviar.disabled = true
        btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
    }
}

function mostrarError(mensaje) {

    const mensajeError = document.createElement('P');
    mensajeError.textContent = mensaje
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');


    if (errores.length === 0) {
        formulario.appendChild(mensajeError)
    } else {
        mensajeError.remove()
    }

    setInterval(() => {
        mensajeError.remove()
    }, 3000);
}

function enviarEmail(e) {
    e.preventDefault()
        // Mostrar el spiner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    setTimeout(() => {
        spinner.style.display = 'none'

        const parrafo = document.createElement('P');
        parrafo.textContent = 'El mensaje se envio correctamente'
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')
        formulario.insertBefore(parrafo, spinner)

        setTimeout(() => {
            parrafo.remove() //eliminar el mensaje de exito
            resetearFormulario()
        }, 300);
    }, 3000);
}

function resetearFormulario(e) {
    e.preventDefault()

    formulario.reset()
    iniciarApp()
}