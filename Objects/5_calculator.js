let calculator = new Calculator;

function Calculator() {
    this.read = function () {
        this.a = +prompt('first arg');
        this.b = +prompt('second arg');
    }
    this.sum = function () {
        return this.a + this.b;
    }
    this.mul = function () {
        return this.a * this.b;
    }
};

calculator.read();
alert(calculator.sum());
alert(calculator.mul());