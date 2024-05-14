//variaveis const de referencia
const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarBtIcone = document.querySelector(".app__card-primary-butto-icon");
const tempoNaTela = document.querySelector('#timer')

const startPauseBt = document.querySelector('#start-pause');//faz a referencia ao botao pause usando o id

const audioPlay = new Audio('sons/play.wav')
const audioPausa = new Audio('sons/pause.mp3')
const audioTempoFinalizado = new Audio('sons/beep.mp3')
const musica = new Audio('sons/luna-rise-part-one.mp3')// pega o arquivo de audio

//variaveis para o temporizador
let tempoDecorridoEmSegundos = 1500 ; 
let intervaloId = null;

musica.loop = true;
//verifica se a musica esta pausada se estiver e so da o play para tocar 
musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    }else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
    
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

//cria uma função para diminui as linhas de codigo com nome alterar contexto
function alterarContexto(contexto){
    mostarTempo() // chama a função do tempo
    // for para desativar os boroes
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    })


    html.setAttribute('data-contexto', contexto)
    banner. setAttribute('src', `imagens/${contexto}.png`)

    //o metodo innerHtml e muito bom para texto
    switch(contexto){
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`

            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;

        case "descanso-longo":
                titulo.innerHTML = `
                Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong> `

        default:
            break;
    }
}
//função de contagem tem uma função anonima que verifica se e menor ou igual a 0 se verdadeiro para e zera
const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play();
        
        alert('tempo finalizado');
        zerar();
        return
    }
    tempoDecorridoEmSegundos -= 1;
    //console.log('Temporizador' + tempoDecorridoEmSegundos);
    mostarTempo();
}
// e aqui chama a função
startPauseBt.addEventListener('click', iniciarOuPausar);

//cria a função de inicia e pausar
 function iniciarOuPausar() {
    if(intervaloId){
        audioPausa.play()
        zerar()
        return
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar";
 }

 //funcao zera para parar a contagem e voltar o intervaloId = null
 function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar";
    iniciarOuPausarBtIcone.setAttribute('src',`imagens/play_arrow.png`)
    intervaloId = null;

 }
 function mostarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    // aqui formata o tempo
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`
 }
 mostarTempo()