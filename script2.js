document.addEventListener("DOMContentLoaded", () => {
    const scoreTable = document.getElementById("score-table").getElementsByTagName('tbody')[0];

    // Función para cargar los puntajes desde localStorage, ordenarlos y actualizar la tabla
    function loadScores() {
        const scores = JSON.parse(localStorage.getItem("scores")) || {};

        // Convertir el objeto a un array y ordenar por ronda de mayor a menor
        const sortedScores = Object.entries(scores).sort((a, b) => b[1].round - a[1].round);


        // Insertar los datos ordenados en la tabla
        sortedScores.forEach(([name, data]) => {
            const newRow = scoreTable.insertRow();
            const nameCell = newRow.insertCell(0);
            const roundCell = newRow.insertCell(1);
            nameCell.textContent = name;
            roundCell.textContent = data.round;
        });
    }

    loadScores(); // Llamar la función al cargar la página para que cargue todos los datos guardados localmente
});
