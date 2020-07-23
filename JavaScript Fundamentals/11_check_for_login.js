let login = prompt("login");
if (login) {
    if (login == 'Admin') {
        let password = prompt('password');
        if (password) {
            if (password == 'TheMaster') {
                alert('Welcome!');
            } else {
                alert('Wrong password');
            }
        } else {
            alert('Canceled');
        }
    } else {
        alert('I don’t know you');
    }

} else {
    alert('Canceled');
}