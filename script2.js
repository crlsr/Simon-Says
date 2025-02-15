document.addEventListener("DOMContentLoaded", () => {
    //Crear una funcion que con local storage agarre los datos guardados en el primer script de cliente y score y meteros en la tabla
    function loadScores() {
        scores = []
        for(var i = 0; i < localStorage.length; i++){
            scores.push(localStorage.getItem(i));
        }
        const scoreTable = document.getElementById("score-table").getElementsByTagName('tbody')[0];
        while(scores.length > 0){
            max = scores[0]
            var numb = 0;
            for(var i = 0; i < scores.length; i ++ ){
                if(max[1] < scores[i][1]){
                    max = scores[i];
                    numb = i;
                }
            }
            scores = scores.splice(numb,1);
            const newRow = scoreTable.insertRow();
            const nameCell = newRow.insertCell(max[0]);
            const scoreCell = newRow.insertCell(max[1]);
            nameCell.textContent = max[0];
            scoreCell.textContent = max[1];
        }
    }
    
})

loadScores()