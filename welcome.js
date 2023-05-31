function Name() {
    let name = document.getElementById('name').value;
    if(name === '') {
        alert('Введите имя!!!!');
    } else {
        localStorage.setItem('username', name);
    }
}
