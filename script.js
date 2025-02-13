document.addEventListener("DOMContentLoaded", () => {

    //Datos del programa (Variables)
    const botones = ["red", "yellow", "blue", "green"]; //Lista de botones
    let instrucciones = []; //Pila de instrucciones del programa
    let secuenciaCliente = []; //Pila de instrucciones cliente
    let puntaje = 0 //Puntaje cliente
    let cliente = ""; //Nombre del Cliente
    let estadoJuego = false

    //Componentes
    const botonEmpezar = document.getElementById("start");
    const botonParar = document.getElementById("end");
    const botonCambiarNombre = document.getElementById("change-name");
    const botonesDiv = document.querySelectorAll(".color");
    const scoreLabel = document.getElementById("puntaje")
    const clientLabel = document.getElementById("clientName");

    //Eventos
    botonEmpezar.addEventListener("click", startGame);
    botonCambiarNombre.addEventListener("click", changeClient);
    botonParar.addEventListener("click", stopGame)

    /*
    Funciones del Juego:
    - startGame: Empieza juego dejando todo de default.

    - nextLevel: Asigna nuevo patron a partir del anterior.

    - changeClient: Cuando se presiona el boton de cambiar nombre este se encarga de modificar el nombre.

    - playSequence: Ejecutar secuencia a mostrar. 

    - checkSequence: Verifica la secuencia del cliente con la establecida, de ser iguales el cliente obtiene 5 puntos, de no serlo se termina el juego. 

    -stopGame: cuando se presina el boton parar se termina el juego.

    -updateScore: actualiza la puntuacion graficamente (reflejandolo en el div).
    */

    function startGame() { 
        instrucciones = []
        secuenciaCliente = [];
        puntaje = 0;
        updateScore()
        if(!cliente){ //Si no se ha definido nombre se solicita que se haga
            changeClient();
        }
        estadoJuego = true
        nextLevel();
    }

    function changeClient(){
        cliente = prompt("Ingrese su nombre");
        clientLabel.textContent = cliente;
    }

    function nextLevel() {
        secuenciaCliente = [];
        const randomColor = botones[Math.floor(Math.random() * botones.length)]; //Se elige un color al  de la lista usando los metodos de Math
        instrucciones.push(randomColor);
        playSequence()
    }

    function playSequence() {
        let delay = 500; //definimos delay entre instruccion e instruccion
        instrucciones.forEach((color, index) => { //Definimos un for each para recorrer las instrucciones y reflejar la secuencia
            setTimeout(() => { //El time out crea demora entre vuelta y vuelta del for each
                playSound(color);
                activateButton(color);
            }, delay * (index + 1));
        });
    }

    function checkSequence() {
        const currentIndex  = secuenciaCliente.length - 1;
        if (secuenciaCliente[currentIndex] !== instrucciones[currentIndex]){ //Verificamos si las ultimas instrucciones de cada una es la misma (Mejorar)
            alert("Perdiste " + cliente + "! Juego terminado. Llegaste hasta " + puntaje + " puntos");       
            startGame();
        } else if(secuenciaCliente.length === instrucciones.length){ // verificamso si se instrodujo la cantidad de instruccines
            puntaje = puntaje + 5; //agrega 5 puntos si se gano un nivel
            updateScore();
            setTimeout(nextLevel, 1000);
        }
    }

    function stopGame(){
        estadoJuego = false;
        alert("Juego terminado, gracias por jugar " + cliente + " tu puntuacion ha sido de " + puntaje + " puntos.");
        puntaje = 0;
        updateScore();
    }

    function updateScore(){
        scoreLabel.textContent = puntaje
    }

        /*
    Funciones de audio y extras:
    - activateButton: Activa la animacion del boton agregandole momentamente la clase "active"
    - playSound: Ejecuta un audio que dice el nombre del color a seleccionar
    */ 

    function activateButton(color) {
        const boton = document.getElementById(color);
        boton.classList.add("active"); //agregamos una clase temporal a el boton presionado o d ela secuencia
        setTimeout(() => {
            boton.classList.remove("active"); //quitamos la clase temporal
        }, 300);
    }

    function playSound(color){
        const audio = new Audio(`sounds/${color}.mp3`);
        audio.play();
    }

    //funcion anonima que busca el color presionado y le agrega a la secuencia d ebotones del cliente
    botonesDiv.forEach(div => {
        div.addEventListener("click", (event) => {
            if(!estadoJuego) return; //Condicional que verifica si todavia se esta jugando
            const color = event.target.id; //buscamos el boton presionado
            secuenciaCliente.push(color); //agregamos color presionado
            playSound(color);
            activateButton(color);
            checkSequence();
        });
    });
})

