document.addEventListener("DOMContentLoaded", function () {
    const numberButtons = document.querySelectorAll(".number-type"); //Getting bin,dec,hex and oct buttons
    const keys = document.querySelectorAll(".key"); //Key reference
    const valuesResult = document.getElementById('values');//Input reference
    const acButton = document.getElementById('all_clear');//AC reference

    //function to enable-disable selected key base
    function updateKeyStates(selectedType, selectedButton){
        valuesResult.value = "0"; //clear input
        numberButtons.forEach(button => {
            button.classList.remove("selected"); //clear all button's classes
        });
        selectedButton.classList.add("selected"); //add selected to active base type

        keys.forEach(key => {
            const validType = key.getAttribute('data-valid').split(',');
            if (validType.includes(selectedType)) {
                key.classList.remove("disabled"); //enable key
            }else {
                key.classList.add("disabled"); //disable key
            }
        });
    }

    function updateInputValue(value) {
        const currentValue = valuesResult.value;
        valuesResult.value = currentValue === "0" ? value : currentValue + value;
    }

    function clearInput() {
        valuesResult.value = "0";
    }

    numberButtons.forEach(button => {
        button.addEventListener("click", () => {
            const buttonId = button.id;
            let selectedType;

            if (buttonId === 'binary_result'){
                selectedType = 'bin';
            }else if(buttonId === 'decimal_result'){
                selectedType = 'dec';
            }else if(buttonId === 'hexadecimal_result'){
                selectedType = 'hex';
            }else if(buttonId === 'octal_result'){
                selectedType = 'oct';
            }
            updateKeyStates(selectedType, button);
        });
    });

    keys.forEach(key => {
        key.addEventListener('click', () => {
            if (!key.classList.contains("disabled")) {
                const keyValue = key.textContent;
                updateInputValue(keyValue);
            }
        });
    });

    acButton.addEventListener('click',clearInput);

    updateKeyStates('dec', document.getElementById('decimal_result'));
});