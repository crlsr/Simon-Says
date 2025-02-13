document.addEventListener("DOMContentLoaded", () => {
    const botones = ["red", "yellow", "blue", "green"]; //Lista de botones
    let instrucciones = []; //Pila de instrucciones pasadas
    let secuenciaCliente = []; //Pila de instrucciones cliente
    let puntaje = 0 //Puntaje cliente
    let cliente = ""; //Nombre del Cliente

    const botonEmpezar = document.getElementById("start");
    const botonesDiv = document.querySelectorAll(".color");

    botonEmpezar.addEventListener("click", startGame);

    /*
    Funciones del Juego:
    - startGame: Empieza juego dejando todo de default
    - nextLevel: Asigna nuevo patron a partir del anterior
    - changeClient: Cuando se presiona el boton de cambiar nombre este se encarga de modificar el nombre
    - playSequence: Ejecutar secuencia a mostrar 
    - checkSequence: Verifica la secuencia del cliente con la establecida, de ser iguales el cliente obtiene 5 puntos, de no serlo se termina el juego 
    */

    //
    function startGame() { //Agregar lo de nombre
        instrucciones = []
        secuenciaCliente = [];
        puntaje = 0;
        cliente = prompt("Insgresa tu nombre");
        nextLevel();
    }

    function nextLevel() {
        secuenciaCliente = [];
        puntaje = puntaje + 5;
        const randomColor = botones[Math.floor(Math.random() * botones.length)];
        instrucciones.push(randomColor);
        playSequence()
    }

    function playSequence() {
        let delay = 500;
        instrucciones.forEach((color, index) => {
            setTimeout(() => {
                playSound(color);
                activateButton(color);
            }, delay * (index + 1));
        });
    }

    function checkSequence() {
        const currentIndex  = secuenciaCliente.length - 1;
        if (secuenciaCliente[currentIndex] !== instrucciones[currentIndex]){
            alert("Perdiste! Juego terminado. Llegaste hasta " + puntaje + " puntos");       
            startGame();
        } else if(secuenciaCliente.length === instrucciones.length){
            setTimeout(nextLevel, 1000);
        }
    }

        /*
    Funciones de audio y extras:
    - activateButton: Activa la animacion del boton agregandole momentamente la clase "active"
    - playSound: Ejecuta un audio que dice el nombre del color a seleccionar
    */ 

    function activateButton(color) {
        const boton = document.getElementById(color);
        boton.classList.add("active");
        setTimeout(() => {
            boton.classList.remove("active");
        }, 300);
    }

    function playSound(color){
        const audio = new Audio(`sounds/${color}.mp3`);
        audio.play();
    }

    botonesDiv.forEach(div => {
        div.addEventListener("click", (event) => {
            const color = event.target.id;
            secuenciaCliente.push(color);
            playSound(color);
            activateButton(color);
            checkSequence();
        });
    });
})

