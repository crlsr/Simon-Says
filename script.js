document.addEventListener("DOMContentLoaded", () => {
    const botones = ["red", "yellow", "blue", "green"]; //Lista de botones
    let instrucciones = []; //Pila de instrucciones del programa
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
    function startGame() { 
        instrucciones = []
        secuenciaCliente = [];
        puntaje = 0;
        cliente = prompt("Ingresa tu nombre");
        nextLevel();
    }

    function nextLevel() {
        secuenciaCliente = [];
        puntaje = puntaje + 5; //agrega 5 puntos si se gano un nivel
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
            alert("Perdiste! Juego terminado. Llegaste hasta " + puntaje + " puntos");       
            startGame();
        } else if(secuenciaCliente.length === instrucciones.length){ // verificamso si se instrodujo la cantidad de instruccines
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
            const color = event.target.id; //buscamos el boton presionado
            secuenciaCliente.push(color); //agregamos color presionado
            playSound(color);
            activateButton(color);
            checkSequence();
        });
    });
})

