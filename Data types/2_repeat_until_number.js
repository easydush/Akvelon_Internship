function repeatNumber() {
    let inputNumber = prompt('Enter a number', '')
    while (inputNumber) {
        if (isFinite(inputNumber)) {
            return +inputNumber;
        } else {
            inputNumber = prompt('Enter a number', '')
            continue;
        }
    }
    return;
}

repeatNumber();