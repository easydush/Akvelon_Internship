function sumInput() {
    let numbers = [];
    let sum = 0;
    let curValue = prompt('enter the value', '');
    while(curValue && isFinite(curValue)){
        numbers.push(curValue);
        sum += +curValue;
        curValue = prompt('enter the value', '');
    }
    return sum;

}
alert(sumInput());