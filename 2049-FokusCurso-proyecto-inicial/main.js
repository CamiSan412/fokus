const html = document.querySelector('html') 
const botonCorto = document.querySelector('.app__card-button--corto')
const botonEnfoque = document.querySelector('.app__card-button--enfoque')
const botonLargo = document.querySelector('.app__card-button--largo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botones = document.querySelectorAll('.app__card-button')
const inputEnfoqueMusica = document.querySelector('#alternar-musica')
const botonIniciarPausar = document.querySelector('#start-pause')
const tiempoEnPantalla = document.querySelector('#timer')
const textoInicialPausar = document.querySelector('#start-pause span')
const iconoIniciarPausar = document.querySelector(".app__card-primary-butto-icon")


const musica = new Audio('./sonidos/luna-rise-part-one.mp3')
const audioCero = new Audio('./sonidos/beep.mp3')
const audioInicia = new Audio('./sonidos/play.wav')
const audioPausa = new Audio('./sonidos/pause.mp3')


let tiempoTranscurridoEnSegundos = 1500
let idIntervalo = null


musica.loop = true
inputEnfoqueMusica.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 300
    cambiarContexto('descanso-corto')
    botonCorto.classList.add('active')

})

botonEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 1500
    cambiarContexto('enfoque')
    botonEnfoque.classList.add('active')
})

botonLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 900
    cambiarContexto('descanso-largo')
    botonLargo.classList.add('active')
})

function cambiarContexto(contexto){
    mostrarTiempo()

    botones.forEach(function(contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagenes/${contexto}.png`)

    switch(contexto){

        

        case 'enfoque':
            titulo.innerHTML = `Optimiza tu productividad <br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
           
            break;
        case 'descanso-corto':
            titulo.innerHTML = `¿Que tal romar un respiro? <br>
            <strong class="app__title-strong">¡Haz una pausa corta!</strong>`
            break;

        case 'descanso-largo':
            titulo.innerHTML = `Hora de volver a la superficie <br>
            <strong class="app__title-strong">¡Haz una pausa larga!</strong>`
            break;
        default:
            break;
    }
}

const cuentaRegresiva = () => {
    if(tiempoTranscurridoEnSegundos <= 0){
        audioCero.play() 
        reiniciar()        
        return
    }
    tiempoTranscurridoEnSegundos -= 1
    mostrarTiempo()
}

botonIniciarPausar.addEventListener('click', iniciarPausar)

function iniciarPausar(){    
    if(idIntervalo){        
        audioPausa.play() 
        reiniciar()
        return
    }      
    audioInicia.play() 
    idIntervalo = setInterval(cuentaRegresiva, 1000)
    textoInicialPausar.textContent = "Pausar";
    iconoIniciarPausar.setAttribute('src', `./imagenes/pause.png`);
}



function reiniciar(){
    clearInterval(idIntervalo)
    textoInicialPausar.textContent = 'Comenzar'
    iconoIniciarPausar.setAttribute('src', `./imagenes/play_arrow.png`);
    idIntervalo = null
    
}


function mostrarTiempo(){
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000)
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX', {minute:'2-digit', second:'2-digit' })
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}
mostrarTiempo()


/* 
botonCorto.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-corto')
    banner.setAttribute('src', './imagenes/descanso-corto.png')
})

botonEnfoque.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'enfoque')
    banner.setAttribute('src', './imagenes/enfoque.png')
})

botonLargo.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-largo')
    banner.setAttribute('src', './imagenes/descanso-largo.png')
}) */





