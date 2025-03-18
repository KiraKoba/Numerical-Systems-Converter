document.addEventListener("DOMContentLoaded", function () {
    const numberButtons = document.querySelectorAll(".number-type"); // Getting bin, dec, hex, and oct buttons
    const keys = document.querySelectorAll(".key"); // Key reference
    const valuesResult = document.getElementById('values'); // Input reference
    const acButton = document.getElementById('all_clear'); // AC reference
    let selectedBase = 'dec'; // Default base is decimal

    // Function to enable-disable selected key based on selected type
    function updateKeyStates(selectedType, selectedButton) {
        valuesResult.value = "0"; // Clear input
        // Clear the conversion fields when the base is changed
        document.getElementById("binary").value = "0";
        document.getElementById("decimal").value = "0";
        document.getElementById("hexadecimal").value = "0";
        document.getElementById("octal").value = "0";

        selectedBase = selectedType; // Update the selected base type

        numberButtons.forEach(button => {
            button.classList.remove("selected"); // Clear all button's classes
        });
        selectedButton.classList.add("selected"); // Add selected to active base type

        keys.forEach(key => {
            const validType = key.getAttribute('data-valid').split(',');
            if (validType.includes(selectedType)) {
                key.classList.remove("disabled"); // Enable key
            } else {
                key.classList.add("disabled"); // Disable key
            }
        });
    }

    function updateInputValue(value) {
        const currentValue = valuesResult.value;
        valuesResult.value = currentValue === "0" ? value : currentValue + value;
    }

    function clearInput() {
        valuesResult.value = "0";
        // Clear the conversion result fields as well
        document.getElementById("binary").value = "0";
        document.getElementById("decimal").value = "0";
        document.getElementById("hexadecimal").value = "0";
        document.getElementById("octal").value = "0";
    }

    // Function to convert the input value to different bases based on the selected base
    function updateConversions() {
        const inputValue = valuesResult.value;

        let decimalValue;

        // Convert input based on selected base
        if (selectedBase === 'bin') {
            decimalValue = parseInt(inputValue, 2); // Parse as binary
        } else if (selectedBase === 'dec') {
            decimalValue = parseInt(inputValue, 10); // Parse as decimal
        } else if (selectedBase === 'hex') {
            decimalValue = parseInt(inputValue, 16); // Parse as hexadecimal
        } else if (selectedBase === 'oct') {
            decimalValue = parseInt(inputValue, 8); // Parse as octal
        }

        if (!isNaN(decimalValue)) {
            // Conversion logic
            document.getElementById("binary").value = decimalValue.toString(2); // Convert to binary
            document.getElementById("decimal").value = decimalValue.toString(10); // Convert to decimal
            document.getElementById("hexadecimal").value = decimalValue.toString(16).toUpperCase(); // Convert to hexadecimal
            document.getElementById("octal").value = decimalValue.toString(8); // Convert to octal
        } else {
            // Handle invalid input (if it's not a valid number)
            document.getElementById("binary").value = "Invalid Input";
            document.getElementById("decimal").value = "Invalid Input";
            document.getElementById("hexadecimal").value = "Invalid Input";
            document.getElementById("octal").value = "Invalid Input";
        }
    }

    // Adding events to number buttons
    numberButtons.forEach(button => {
        button.addEventListener("click", () => {
            const buttonId = button.id;
            let selectedType;

            if (buttonId === 'binary_result') {
                selectedType = 'bin';
            } else if (buttonId === 'decimal_result') {
                selectedType = 'dec';
            } else if (buttonId === 'hexadecimal_result') {
                selectedType = 'hex';
            } else if (buttonId === 'octal_result') {
                selectedType = 'oct';
            }
            updateKeyStates(selectedType, button);
            updateConversions(); // Update the conversions when the type is changed
        });
    });

    // Adding events to key buttons (for input)
    keys.forEach(key => {
        key.addEventListener('click', () => {
            if (!key.classList.contains("disabled")) {
                const keyValue = key.textContent;
                updateInputValue(keyValue);
                updateConversions(); // Update conversions after key press
            }
        });
    });

    // AC button click event
    acButton.addEventListener('click', clearInput);

    // Initial state with decimal selected
    updateKeyStates('dec', document.getElementById('decimal_result'));
});

