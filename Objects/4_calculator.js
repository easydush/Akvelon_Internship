let calculator = {
    read() {
        this.a = +prompt('first arg');
        this.b = +prompt('second arg');
    },
    sum() {
        return this.a + this.b;
    },
    mul() {
        return this.a * this.b;
    },
};

calculator.read();
alert(calculator.sum());
alert(calculator.mul());