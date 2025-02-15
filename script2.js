document.addEventListener("DOMContentLoaded", () => {
    const scoreTable = document.getElementById("score-table").getElementsByTagName('tbody')[0];

    // Función para cargar los puntajes desde localStorage y actualizar la tabla
    function loadScores() {
        const scores = JSON.parse(localStorage.getItem("scores")) || {};
        for (const [name, data] of Object.entries(scores)) {
            const newRow = scoreTable.insertRow();
            const nameCell = newRow.insertCell(0);
            const roundCell = newRow.insertCell(1);
            nameCell.textContent = name;
            roundCell.textContent = data.round;
        }
    }

    loadScores(); // Llamar la función al cargar la página
});
